import { connectToDatabase, Produto } from '@/lib/mongodb';

// Interface para o tipo Produto retornado para o frontend
export interface IProduto {
  _id: string;
  nome: string;
  valor: number;
  descricao: string;
  imagem: string;
  categoria: string;
  destaque?: boolean;
  cod: string;
}

// Interface para retorno do MongoDB
interface MongoDBProduto {
  _id: any;
  nome: string;
  preco: number;
  descricao: string;
  categoria: string;
  imagem: string;
  destaque: boolean;
  cod: string;
  ativado: boolean;
}

export class ProdutoService {
  // Método para buscar todos os produtos
  static async buscarTodosProdutos(filtros: { destaque?: boolean } = {}): Promise<IProduto[]> {
    try {
      await connectToDatabase();

      if (!Produto) {
        throw new Error('Modelo Produto não disponível');
      }

      let query: Record<string, any> = {};

      // Adicionar filtro de destaque, se fornecido
      if (filtros.destaque !== undefined) {
        query = { ...query, destaque: filtros.destaque };
      }

      // Adicionar filtro para produtos ativos apenas
      query = { ...query, ativado: true };

      const produtosDoBanco: any[] = await (Produto as any).find(query).lean();

      // Mapear os campos do banco para os campos usados no frontend
      const produtosMapeados: IProduto[] = [];

      for (const produto of produtosDoBanco) {
        produtosMapeados.push({
          _id: String(produto._id),
          nome: produto.nome,
          valor: produto.preco, // Mapeando preco -> valor
          descricao: produto.descricao,
          imagem: produto.imagem,
          categoria: produto.categoria,
          destaque: produto.destaque,
          cod: produto.cod,
        });
      }

      return produtosMapeados;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  }

  // Método para buscar produtos por categoria
  static async buscarProdutosPorCategoria(
    categoria: string,
    filtros: { destaque?: boolean } = {}
  ): Promise<IProduto[]> {
    try {
      await connectToDatabase();

      if (!Produto) {
        throw new Error('Modelo Produto não disponível');
      }

      // Tratar casos especiais de categorias
      let queryFiltro: Record<string, any> = { categoria };

      // Para "piscina", buscar de forma insensível a maiúsculas/minúsculas
      if (categoria.toLowerCase() === 'piscina' || categoria.toLowerCase() === 'piscinas') {
        queryFiltro = {
          categoria: {
            $regex: new RegExp('^piscina$', 'i'), // Busca exatamente "piscina" ignorando case
          },
        };
      }

      // Adicionar filtro de destaque, se fornecido
      if (filtros.destaque !== undefined) {
        queryFiltro = { ...queryFiltro, destaque: filtros.destaque };
      }

      // Adicionar filtro para produtos ativos apenas
      queryFiltro = { ...queryFiltro, ativado: true };

      const produtosDoBanco: any[] = await (Produto as any).find(queryFiltro).lean();

      // Mapear os campos do banco para os campos usados no frontend
      const produtosMapeados: IProduto[] = [];

      for (const produto of produtosDoBanco) {
        produtosMapeados.push({
          _id: String(produto._id),
          nome: produto.nome,
          valor: produto.preco, // Mapeando preco -> valor
          descricao: produto.descricao,
          imagem: produto.imagem,
          categoria: produto.categoria,
          destaque: produto.destaque,
          cod: produto.cod,
        });
      }

      return produtosMapeados;
    } catch (error) {
      console.error(`Erro ao buscar produtos da categoria ${categoria}:`, error);
      throw error;
    }
  }

  // Método para buscar um produto por ID
  static async buscarProdutoPorId(id: string): Promise<IProduto | null> {
    try {
      await connectToDatabase();

      if (!Produto) {
        throw new Error('Modelo Produto não disponível');
      }

      const produto: any = await (Produto as any).findById(id).lean();

      if (!produto) return null;

      // Mapear os campos do banco para os campos usados no frontend
      return {
        _id: String(produto._id),
        nome: produto.nome,
        valor: produto.preco, // Mapeando preco -> valor
        descricao: produto.descricao,
        imagem: produto.imagem,
        categoria: produto.categoria,
        destaque: produto.destaque,
        cod: produto.cod,
      };
    } catch (error) {
      console.error(`Erro ao buscar produto de ID ${id}:`, error);
      throw error;
    }
  }

  // Método para buscar múltiplos produtos por códigos
  static async buscarProdutosPorCodigos(cods: string[]): Promise<IProduto[]> {
    try {
      await connectToDatabase();

      if (!Produto) {
        throw new Error('Modelo Produto não disponível');
      }

      const produtos: any[] = await (Produto as any).find({ cod: { $in: cods } }).lean();

      return produtos.map(produto => ({
        _id: String(produto._id),
        nome: produto.nome,
        valor: produto.preco,
        descricao: produto.descricao,
        imagem: produto.imagem,
        categoria: produto.categoria,
        destaque: produto.destaque,
        cod: produto.cod,
      }));
    } catch (error) {
      console.error('Erro ao buscar produtos por códigos:', error);
      throw error;
    }
  }
}
