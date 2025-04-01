import { NextResponse } from 'next/server';
import { ProdutoService } from '@/services/ProdutoService';

export async function GET() {
  try {
    // Busca todos os produtos usando o serviço
    const produtos = await ProdutoService.buscarTodosProdutos();
    
    return NextResponse.json({ success: true, data: produtos });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { success: false, error: 'Falha ao carregar os produtos' },
      { status: 500 }
    );
  }
} 