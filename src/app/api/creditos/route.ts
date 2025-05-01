import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';

// Esquema para a coleção de créditos fidelidade
const CreditoSchema = new mongoose.Schema({
  data: Date,
  nome: String,
  valor: Number,
  credito: Number,
  statusCred: String,
});

// Criar ou obter o modelo
let CreditoModel;
try {
  CreditoModel = mongoose.model('comprasFidelidade');
} catch (e) {
  CreditoModel = mongoose.model('comprasFidelidade', CreditoSchema, 'comprasFidelidade');
}

export async function GET(request: NextRequest) {
  try {
    // Conectar ao banco de dados
    await connectToDatabase();

    // Obter parâmetros de consulta da URL
    const { searchParams } = new URL(request.url);
    const nome = searchParams.get('nome');

    if (!nome) {
      return NextResponse.json({ error: 'O parâmetro nome é obrigatório' }, { status: 400 });
    }

    // Buscar todos os créditos do usuário
    const creditos = await CreditoModel.find({ nome }).sort({ data: -1 }).lean();

    // Processar status e calcular créditos disponíveis
    const agora = new Date();
    const creditosProcessados = creditos.map(credito => {
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

    // Calcular o total de créditos disponíveis
    const creditosDisponiveis = creditosProcessados
      .filter(c => c.status === 'Disponível')
      .reduce((total, c) => total + c.credito, 0);

    return NextResponse.json({
      creditos: creditosProcessados,
      totalDisponivel: creditosDisponiveis,
    });
  } catch (error) {
    console.error('Erro ao buscar créditos:', error);
    return NextResponse.json(
      { error: 'Falha ao buscar créditos do banco de dados' },
      { status: 500 }
    );
  }
}
