import connectToDatabase from './mongodb';
import mongoose from 'mongoose';
import { CartProduct } from '@/context/CartContext';

// Verificação se estamos no ambiente do servidor
const isServer = typeof window === 'undefined';

// Interface para a compra a ser salva no banco de dados
export interface CompraCliente {
  nome: string;
  contato: string;
  endereco: string;
  pagamento: string;
  valorTroco?: string;
  produtos: CartProduct[];
  dataCompra: Date;
  valorTotal: number;
  clienteId?: string;
}

// Interface para o registro de crédito de fidelidade
export interface CompraFidelidade {
  data: Date;
  nome: string;
  valor: number;
  credito: number;
  statusCred: string;
  clienteId: string;
}

// Salvar compra no banco de dados
export async function salvarCompra(
  compra: CompraCliente
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    if (!isServer) {
      throw new Error('Esta função só pode ser executada no servidor');
    }

    await connectToDatabase();

    // Criando um modelo para a coleção "comprasClientes"
    const ComprasClientesSchema = new mongoose.Schema({}, { strict: false });
    const ComprasClientes =
      mongoose.models.ComprasClientes ||
      mongoose.model('ComprasClientes', ComprasClientesSchema, 'comprasClientes');

    // Inserindo o documento na coleção
    const result = await (ComprasClientes as any).create(compra);

    return { success: true, id: result._id.toString() };
  } catch (error) {
    console.error('Erro ao salvar compra:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}

// Salvar registro de fidelidade
export async function salvarCompraFidelidade(
  compraFidelidade: CompraFidelidade
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    if (!isServer) {
      throw new Error('Esta função só pode ser executada no servidor');
    }

    await connectToDatabase();

    // Criando um modelo para a coleção "comprasFidelidade"
    const ComprasFidelidadeSchema = new mongoose.Schema({}, { strict: false });
    const ComprasFidelidade =
      mongoose.models.ComprasFidelidade ||
      mongoose.model('ComprasFidelidade', ComprasFidelidadeSchema, 'comprasFidelidade');

    // Inserindo o documento na coleção
    const result = await (ComprasFidelidade as any).create(compraFidelidade);

    return { success: true, id: result._id.toString() };
  } catch (error) {
    console.error('Erro ao salvar registro de fidelidade:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}

// Enviar mensagem via WhatsApp
export async function enviarMensagemWhatsApp(mensagem: {
  contato: string;
  mensagem: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('https://web-production-42b00.up.railway.app/whatsapp/mensagem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mensagem),
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar mensagem: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, ...data };
  } catch (error) {
    console.error('Erro ao enviar mensagem WhatsApp:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}

// Função para formatar a lista de produtos para a mensagem do WhatsApp
export function formatarProdutosParaMensagem(produtos: CartProduct[]): string {
  return produtos
    .map(produto => {
      const codigo = produto.cod !== undefined ? produto.cod : 'Código não disponível';
      return `Código: ${codigo}\n${produto.nome}\nQuantidade: ${produto.quantidade}\nValor: ${produto.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n`;
    })
    .join('\n');
}

// Nova função para formatar itens do orçamento para WhatsApp
export function formatarItensParaOrcamentoWhatsApp(produtos: CartProduct[]): string {
  return produtos
    .map(item => {
      const codigo = item.cod !== undefined ? item.cod : 'N/D';
      return `${item.nome}\n` + `Código: ${codigo}\n` + `Quantidade: ${item.quantidade}`;
    })
    .join('\n\n'); // Adiciona uma linha extra entre os itens para melhor legibilidade
}
