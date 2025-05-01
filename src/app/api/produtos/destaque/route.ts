import { NextResponse } from 'next/server';
import connectToDatabase, { Produto } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectToDatabase();

    // Buscar todos os produtos com destaque=true e ativado=true
    const produtosDestaque = await (Produto as any).find({
      destaque: true,
      ativado: true,
    });

    return NextResponse.json(produtosDestaque);
  } catch (error) {
    console.error('Erro ao buscar produtos em destaque:', error);
    return NextResponse.json({ error: 'Erro ao buscar produtos em destaque' }, { status: 500 });
  }
}
