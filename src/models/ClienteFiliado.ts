import mongoose, { Schema } from 'mongoose';

const clienteFiliadoSchema = new Schema({
  nome: { type: String, required: true },
  cpfcnpj: { type: String, required: true },
  endereco: { type: String, required: true },
  contato: { type: String, required: true },
  beneficios: { type: [String], required: true },
  tipoCliente: { type: String, required: true, default: 'filiado' },
  matriz: { type: String, required: true },
  beneficioMatriz: { type: [String], required: true },
  dataCadastro: { type: Date, default: Date.now },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  tempo: { type: Number, required: true },
});

// Verifica se o modelo já existe para evitar sobrescrever e especifica o nome exato da coleção
const ClienteFiliado =
  mongoose.models.ClienteFiliado ||
  mongoose.model('ClienteFiliado', clienteFiliadoSchema, 'clienteFiliado');

export default ClienteFiliado;
