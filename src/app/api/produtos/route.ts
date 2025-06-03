import { NextResponse } from 'next/server';
import { ProdutoService } from '@/services/ProdutoService';
import { connectToDatabase, Produto } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    // Acessar os parâmetros da URL
    const { searchParams } = new URL(request.url);

    // Filtros para a busca
    const filtros: { destaque?: boolean } = {};

    // Verificar se o parâmetro de destaque foi fornecido
    if (searchParams.has('destaque')) {
      const destaqueParam = searchParams.get('destaque');
      filtros.destaque = destaqueParam === 'true';
    }

    // Verificar se há parâmetro de categoria
    if (searchParams.has('categoria')) {
      const categoria = searchParams.get('categoria')!;
      // Busca produtos pela categoria com filtros adicionais
      const produtos = await ProdutoService.buscarProdutosPorCategoria(categoria, filtros);
      return NextResponse.json({ success: true, data: produtos });
    }

    // Se não houver categoria, busca todos os produtos com os filtros
    const produtos = await ProdutoService.buscarTodosProdutos(filtros);

    return NextResponse.json({ success: true, data: produtos });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { success: false, error: 'Falha ao carregar os produtos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { cods } = await request.json();

    if (!cods || !Array.isArray(cods)) {
      return NextResponse.json({ error: 'Códigos dos produtos não fornecidos' }, { status: 400 });
    }

    await connectToDatabase();

    const produtos = await Produto.find({ cod: { $in: cods } }).lean();

    return NextResponse.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
}
