import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://renatodevmaximiano:maxjr1972@clusterrenato.asdih.mongodb.net/Banco_de_Produtos?retryWrites=true&w=majority&appName=ClusterRenato';

// Função para conectar ao MongoDB
export async function connectToDatabase() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return mongoose.connection;
    }

    return await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw error;
  }
}

// Esquema para o modelo de Produto
const ProdutoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  valor: { type: Number, required: true },
  descricao: { type: String, required: true },
  imagem: { type: String, required: true },
  categoria: { type: String, required: true }
});

// Criando o modelo Produto (se não existir ainda)
export const Produto = mongoose.models.Produto || mongoose.model('Produto', ProdutoSchema, 'Produtos'); 