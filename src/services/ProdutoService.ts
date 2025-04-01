import { connectToDatabase, Produto } from '@/lib/mongodb';

// Interface para o tipo Produto
export interface IProduto {
  _id?: string;
  nome: string;
  valor: number;
  descricao: string;
  imagem: string;
  categoria: string;
}

export class ProdutoService {
  // Método para buscar todos os produtos
  static async buscarTodosProdutos(): Promise<any[]> {
    try {
      await connectToDatabase();
      const produtos = await Produto.find({}).lean();
      return produtos;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  }

  // Método para buscar produtos por categoria
  static async buscarProdutosPorCategoria(categoria: string): Promise<any[]> {
    try {
      await connectToDatabase();
      
      // Tratar casos especiais de categorias
      let queryFiltro: any = { categoria };
      
      // Para "piscina", buscar de forma insensível a maiúsculas/minúsculas
      if (categoria.toLowerCase() === "piscina" || categoria.toLowerCase() === "piscinas") {
        queryFiltro = { 
          categoria: { 
            $regex: new RegExp("^piscina$", "i") // Busca exatamente "piscina" ignorando case
          } 
        };
      }
      
      const produtos = await Produto.find(queryFiltro).lean();
      return produtos;
    } catch (error) {
      console.error(`Erro ao buscar produtos da categoria ${categoria}:`, error);
      throw error;
    }
  }

  // Método para buscar um produto por ID
  static async buscarProdutoPorId(id: string): Promise<any | null> {
    try {
      await connectToDatabase();
      const produto = await Produto.findById(id).lean();
      return produto;
    } catch (error) {
      console.error(`Erro ao buscar produto de ID ${id}:`, error);
      throw error;
    }
  }
} 