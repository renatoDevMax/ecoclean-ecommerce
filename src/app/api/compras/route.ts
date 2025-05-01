import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';

// Esquema para a coleção de compras
const CompraSchema = new mongoose.Schema({
  nome: String,
  contato: String,
  endereco: String,
  pagamento: String,
  produtos: Array,
  dataCompra: Date,
  valorTotal: Number,
  clienteId: String,
});

// Criar ou obter o modelo
let Compra;
try {
  Compra = mongoose.model('comprasClientes');
} catch (e) {
  Compra = mongoose.model('comprasClientes', CompraSchema, 'comprasClientes');
}

export async function GET(request: NextRequest) {
  try {
    // Conectar ao banco de dados
    await connectToDatabase();

    // Obter parâmetros de consulta da URL
    const { searchParams } = new URL(request.url);
    const nome = searchParams.get('nome');

    // Construir o filtro de consulta
    const query: any = {};
    if (nome) {
      query.nome = nome;
    }

    // Buscar compras com o filtro
    const compras = await Compra.find(query).sort({ dataCompra: -1 }).lean();

    // Retornar as compras encontradas
    return NextResponse.json(compras);
  } catch (error) {
    console.error('Erro ao buscar compras:', error);
    return NextResponse.json(
      { error: 'Falha ao buscar compras do banco de dados' },
      { status: 500 }
    );
  }
}
