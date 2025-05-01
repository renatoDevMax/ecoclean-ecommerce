import mongoose, { Schema } from 'mongoose';

const clienteFiliadoSchema = new Schema({
  nome: { type: String, required: true },
  cpfcnpj: { type: String, required: true },
  endereco: { type: String, required: true },
  contato: { type: String, required: true },
  beneficios: { type: [String], default: [] },
  tipoCliente: { type: String, required: true },
  dataCadastro: { type: Date, default: Date.now },
  matriz: { type: String, required: true },
  beneficioMatriz: { type: [String], default: [] },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
});

// Verifica se o modelo já existe para evitar sobrescrever e especifica o nome exato da coleção
const ClienteFiliado =
  mongoose.models.ClienteFiliado ||
  mongoose.model('ClienteFiliado', clienteFiliadoSchema, 'clienteFiliado');

export default ClienteFiliado;
