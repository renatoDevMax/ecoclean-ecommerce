import { NextRequest, NextResponse } from 'next/server';
import {
  salvarCompra,
  salvarCompraFidelidade,
  enviarMensagemWhatsApp,
  formatarProdutosParaMensagem,
  CompraCliente,
  CompraFidelidade,
} from '@/lib/api';

export async function POST(request: NextRequest) {
  try {
    const compra = await request.json();

    // 1. Salvar a compra na coleção comprasClientes
    const resultadoCompra = await salvarCompra(compra);

    if (!resultadoCompra.success) {
      throw new Error(resultadoCompra.error || 'Falha ao salvar compra');
    }

    // 2. Se o cliente está autenticado, salvar crédito de fidelidade
    if (compra.clienteId) {
      // Criar o objeto de compra fidelidade
      const compraFidelidade = {
        data: new Date(),
        nome: compra.nome,
        valor: compra.usouCredito
          ? compra.subtotalProdutos - compra.creditoResgatado // Se usou crédito, o valor é subtotal - crédito
          : compra.valorTotal - compra.taxaEntrega, // Se não usou, o valor é total sem taxa
        credito: compra.creditoCalculado,
        statusCred: 'aberto',
        clienteId: compra.clienteId,
      };

      const resultadoFidelidade = await salvarCompraFidelidade(compraFidelidade);

      if (!resultadoFidelidade.success) {
        console.error('Erro ao salvar crédito de fidelidade:', resultadoFidelidade.error);
        // Continuamos mesmo com erro, já que a compra principal foi salva
      }
    }

    // 3. Enviar mensagem de WhatsApp
    const produtosFormatados = formatarProdutosParaMensagem(compra.produtos);

    // Formatar valor para exibição
    const formatarValor = (valor: number) => {
      return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    };

    // Preparar o resumo do pedido baseado no uso ou não de crédito
    let resumoPedido = '';

    if (compra.usouCredito) {
      // Formato detalhado com informações de crédito usado
      resumoPedido = `
Total dos produtos: ${formatarValor(compra.subtotalProdutos)}
Crédito Resgatado: ${formatarValor(compra.creditoResgatado)}
${compra.taxaEntrega > 0 ? `Taxa de entrega: ${formatarValor(compra.taxaEntrega)}\n` : ''}
Total da compra: ${formatarValor(compra.valorTotal)}`;
    } else {
      // Formato padrão sem crédito
      resumoPedido = `
${compra.taxaEntrega > 0 ? `Subtotal: ${formatarValor(compra.subtotalProdutos)}\nTaxa de entrega: ${formatarValor(compra.taxaEntrega)}\n` : ''}
Total: ${formatarValor(compra.valorTotal)}`;
    }

    // Preparar informação adicional de troco, se necessário
    const trocoInfo =
      compra.pagamento === 'Dinheiro' && compra.valorTroco
        ? `\nTroco para: ${compra.valorTroco}`
        : '';

    const mensagem = `🛒 *NOVO PEDIDO RECEBIDO!* 🛒

*DADOS DO CLIENTE:*
Nome: ${compra.nome}
Contato: ${compra.contato}
Endereço: ${compra.endereco}

*PRODUTOS:*
${produtosFormatados}

*RESUMO DO PEDIDO:*${resumoPedido}${trocoInfo}

*FORMA DE PAGAMENTO:*
${compra.pagamento}

🔄 *STATUS:* Pedido Recebido`;

    // Enviar a mensagem formatada
    const contatoDestino = '4187280741';

    const resultadoMensagem = await enviarMensagemWhatsApp({
      contato: contatoDestino,
      mensagem: mensagem,
    });

    if (!resultadoMensagem.success) {
      console.error('Erro ao enviar mensagem WhatsApp:', resultadoMensagem.error);
      // Continuamos mesmo com erro na mensagem, já que a compra principal foi salva
    }

    return NextResponse.json({
      success: true,
      message: 'Pedido processado com sucesso',
      compraId: resultadoCompra.id,
    });
  } catch (error) {
    console.error('Erro ao processar pedido:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao processar pedido',
      },
      { status: 500 }
    );
  }
}
