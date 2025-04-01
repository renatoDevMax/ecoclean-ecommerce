import { NextResponse } from 'next/server';
import { ProdutoService } from '@/services/ProdutoService';

// Interface para os parâmetros da rota
interface RouteParams {
  params: {
    categoria: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { categoria } = params;
    
    // Decodifica a categoria da URL
    const categoriaDecodificada = decodeURIComponent(categoria);
    
    // Busca produtos pela categoria
    const produtos = await ProdutoService.buscarProdutosPorCategoria(categoriaDecodificada);
    
    return NextResponse.json({ success: true, data: produtos });
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error);
    return NextResponse.json(
      { success: false, error: 'Falha ao carregar os produtos da categoria' },
      { status: 500 }
    );
  }
} 