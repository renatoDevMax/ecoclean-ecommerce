import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';

// Definir a interface para o documento de compra fidelidade
interface ICompraFidelidade {
  nome: string;
  data: Date;
  credito: number;
  statusCred: string;
  valor: number;
}

// Esquema para a coleção de créditos fidelidade
const CompraFidelidadeSchema = new mongoose.Schema<ICompraFidelidade>({
  nome: String,
  data: Date,
  credito: Number,
  statusCred: String,
  valor: Number,
});

// Criar ou obter o modelo
let CompraFidelidadeModel: mongoose.Model<ICompraFidelidade>;
try {
  CompraFidelidadeModel = mongoose.model<ICompraFidelidade>('comprasFidelidade');
} catch (e) {
  CompraFidelidadeModel = mongoose.model<ICompraFidelidade>(
    'comprasFidelidade',
    CompraFidelidadeSchema,
    'comprasFidelidade'
  );
}

export async function POST(request: NextRequest) {
  try {
    // Conectar ao banco de dados
    await connectToDatabase();

    // Obter os dados da requisição
    const { nome, valorResgatado } = await request.json();

    if (!nome || valorResgatado <= 0) {
      return NextResponse.json(
        { success: false, message: 'Nome e valor de resgate são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar os créditos disponíveis do usuário
    const creditos = await CompraFidelidadeModel.find({
      nome: nome,
      statusCred: 'aberto',
    }).lean();

    // Data atual
    const agora = new Date();

    // Filtrar apenas os créditos válidos (mais de 24h e menos de 30 dias)
    const creditosDisponiveis = creditos.filter((credito: any) => {
      const dataCredito = new Date(credito.data);
      const diferencaHoras = (agora.getTime() - dataCredito.getTime()) / (1000 * 60 * 60);
      const diferencaDias = diferencaHoras / 24;

      return diferencaHoras >= 24 && diferencaDias <= 30;
    });

    // Ordenar por data (mais antigos primeiro)
    creditosDisponiveis.sort((a: any, b: any) => {
      return new Date(a.data).getTime() - new Date(b.data).getTime();
    });

    // Atualizar créditos até alcançar o valor resgatado
    let valorRestante = valorResgatado;
    const creditosAtualizados = [];

    for (const credito of creditosDisponiveis) {
      if (valorRestante <= 0) break;

      // Atualizar o status para "resgatado"
      await CompraFidelidadeModel.updateOne(
        { _id: credito._id },
        { $set: { statusCred: 'resgatado' } }
      );

      creditosAtualizados.push(credito._id);
      valorRestante -= credito.credito;
    }

    return NextResponse.json({
      success: true,
      message: 'Créditos atualizados com sucesso',
      creditosAtualizados,
    });
  } catch (error) {
    console.error('Erro ao resgatar créditos:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao resgatar créditos' },
      { status: 500 }
    );
  }
}
