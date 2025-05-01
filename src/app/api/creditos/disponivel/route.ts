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

export async function GET(request: NextRequest) {
  try {
    // Conectar ao banco de dados
    await connectToDatabase();

    // Obter o nome do usuário dos parâmetros da requisição
    const { searchParams } = new URL(request.url);
    const nomeUsuario = searchParams.get('nome');

    if (!nomeUsuario) {
      return NextResponse.json({ creditoDisponivel: 0 });
    }

    // Buscar todas as compras do usuário na coleção comprasFidelidade
    const creditos = await (CompraFidelidadeModel as any)
      .find({
        nome: nomeUsuario,
      })
      .lean();

    // Data atual
    const agora = new Date();

    // Processar status e calcular créditos disponíveis seguindo a mesma lógica da página de créditos
    const creditosProcessados = creditos.map((credito: any) => {
      const dataCredito = new Date(credito.data);
      const diferencaHoras = (agora.getTime() - dataCredito.getTime()) / (1000 * 60 * 60);
      const diferencaDias = diferencaHoras / 24;

      let status;
      if (diferencaHoras < 24) {
        status = 'Inativa';
      } else if (diferencaDias > 30) {
        status = 'Expirada';
      } else if (credito.statusCred === 'resgatado') {
        status = 'Resgatada';
      } else {
        status = 'Disponível';
      }

      return {
        ...credito,
        status,
      };
    });

    // Calcular o total de créditos disponíveis (filtrar por status 'Disponível')
    const creditoDisponivel = creditosProcessados
      .filter((c: any) => c.status === 'Disponível')
      .reduce((total: number, c: any) => total + (Number(c.credito) || 0), 0);

    // Retornar o valor total de crédito disponível
    return NextResponse.json({ creditoDisponivel });
  } catch (error) {
    console.error('Erro ao buscar créditos disponíveis:', error);
    return NextResponse.json(
      { error: 'Falha ao buscar créditos disponíveis', creditoDisponivel: 0 },
      { status: 500 }
    );
  }
}
