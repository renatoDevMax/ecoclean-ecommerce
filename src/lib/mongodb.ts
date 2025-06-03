import mongoose from 'mongoose';

const MONGODB_URI =
  'mongodb+srv://renatodevfidelidade:maxjr1972@clusterrenato.asbtntk.mongodb.net/ecoFidelidade?retryWrites=true&w=majority&appName=clusterRenato';

if (!MONGODB_URI) {
  throw new Error('A variável MONGODB_URI não está definida');
}

/**
 * Variável global para controlar conexões
 */
let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw error;
  }
}

export default connectToDatabase;

// Interface do Produto
interface IProduto {
  nome: string;
  preco: number;
  descricao: string;
  categoria: string;
  imagem: string;
  destaque: boolean;
  cod: string;
  ativado: boolean;
}

// Esquema para o modelo de Produto
const ProdutoSchema = new mongoose.Schema<IProduto>(
  {
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    descricao: { type: String, default: '' },
    categoria: { type: String, default: '' },
    imagem: { type: String, required: true },
    destaque: { type: Boolean, default: false },
    cod: { type: String, required: true, unique: true },
    ativado: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Criando o modelo Produto
export const Produto =
  mongoose.models.Produto || mongoose.model('Produto', ProdutoSchema, 'produtos');
