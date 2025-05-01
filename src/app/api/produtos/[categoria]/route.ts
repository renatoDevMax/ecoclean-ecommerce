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

    // Acessar os parâmetros da URL para outros filtros
    const { searchParams } = new URL(request.url);

    // Filtros para a busca
    const filtros: { destaque?: boolean } = {};

    // Verificar se o parâmetro de destaque foi fornecido
    if (searchParams.has('destaque')) {
      const destaqueParam = searchParams.get('destaque');
      filtros.destaque = destaqueParam === 'true';
    }

    // Busca produtos pela categoria com filtros adicionais
    const produtos = await ProdutoService.buscarProdutosPorCategoria(
      categoriaDecodificada,
      filtros
    );

    return NextResponse.json({ success: true, data: produtos });
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error);
    return NextResponse.json(
      { success: false, error: 'Falha ao carregar os produtos da categoria' },
      { status: 500 }
    );
  }
}
