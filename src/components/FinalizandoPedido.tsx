'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart, CartProduct } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import OpcoesPagamento from './OpcoesPagamento';

export default function FinalizandoPedido() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalItems, totalValue } =
    useCart();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  // Estados
  const [passo, setPasso] = useState<'produtos' | 'entrega' | 'pagamento'>('produtos');
  const [activeTab, setActiveTab] = useState<'fidelidade' | 'novo'>(
    isAuthenticated ? 'fidelidade' : 'novo'
  );
  const [alterarEndereco, setAlterarEndereco] = useState(false);

  // Dados do formulário
  const [formData, setFormData] = useState({
    nome: user?.nome || '',
    contato: user?.contato || '',
    cidade: 'Matinhos',
    bairro: '',
    rua: '',
    numero: '',
  });

  // Formatar preço em reais
  const formatarPreco = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Extrair endereço do usuário (se estiver disponível)
  const extrairEndereco = () => {
    if (!user?.endereco) return { rua: '', numero: '', bairro: '' };

    const enderecoCompleto = user.endereco;
    let rua = '',
      numero = '',
      bairro = '';

    // Tentativa simples de extrair as partes do endereço
    // Assumimos um formato como "Rua Nome da Rua, 123, Bairro Tal"
    const partes = enderecoCompleto.split(',');

    if (partes.length >= 1) {
      const ruaComNumero = partes[0].trim();
      const ultimoEspaco = ruaComNumero.lastIndexOf(' ');
      if (ultimoEspaco > 0) {
        rua = ruaComNumero.substring(0, ultimoEspaco).trim();
        numero = ruaComNumero.substring(ultimoEspaco + 1).trim();
      } else {
        rua = ruaComNumero;
      }
    }

    if (partes.length >= 2) {
      bairro = partes[1].trim();
    }

    return { rua, numero, bairro };
  };

  const enderecoExtraido = extrairEndereco();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 15 } },
  };

  const handleProximoPasso = () => {
    setPasso('entrega');
  };

  const handleContinuarParaPagamento = () => {
    setPasso('pagamento');
  };

  const handleVoltarPasso = () => {
    if (passo === 'entrega') {
      setPasso('produtos');
    } else if (passo === 'pagamento') {
      setPasso('entrega');
    }
  };

  const handleFinalizarPedido = () => {
    // Já não precisamos do alert aqui porque o componente OpcoesPagamento
    // exibe a mensagem de sucesso e redireciona automaticamente
    clearCart();
    router.push('/');
  };

  const handleAlterarEndereco = () => {
    setAlterarEndereco(true);
    // Preencher o formulário com os dados extraídos do endereço
    setFormData(prev => ({
      ...prev,
      bairro: enderecoExtraido.bairro,
      rua: enderecoExtraido.rua,
      numero: enderecoExtraido.numero,
    }));
  };

  // Calcular o crédito de fidelidade baseado nos benefícios do usuário
  const calcularCreditoFidelidade = () => {
    // Valor padrão para usuários não logados (potencial de crédito)
    if (!isAuthenticated) {
      return {
        percentual: 10,
        valor: totalValue * 0.1,
        tipo: 'potencial',
      };
    }

    // Verificar se o usuário tem o benefício "Crédito personalizado de X%"
    if (user && user.beneficios && Array.isArray(user.beneficios)) {
      // Procurar por um benefício que comece com "Crédito personalizado de"
      const creditoPersonalizado = user.beneficios.find(beneficio =>
        beneficio.startsWith('Crédito personalizado de')
      );

      if (creditoPersonalizado) {
        // Extrair a porcentagem do texto "Crédito personalizado de X%"
        const percentualMatch = creditoPersonalizado.match(/(\d+)%/);
        if (percentualMatch && percentualMatch[1]) {
          const percentual = parseInt(percentualMatch[1], 10);
          return {
            percentual,
            valor: totalValue * (percentual / 100),
            tipo: 'atual',
          };
        }
      }

      // Verificar se o usuário tem o benefício "Sistema de economia com crédito"
      if (user.beneficios.includes('Sistema de economia com crédito')) {
        return {
          percentual: 5,
          valor: totalValue * 0.05,
          tipo: 'atual',
        };
      }
    }

    // Verificar se é cliente filiado com benefício da matriz
    // Usando tipagem para garantir que o objeto tem a propriedade beneficioMatriz
    if (
      user &&
      user.tipoCliente === 'Filiado' &&
      'beneficioMatriz' in user &&
      Array.isArray(user.beneficioMatriz) &&
      user.beneficioMatriz.includes('Sistema de economia com crédito')
    ) {
      return {
        percentual: 10,
        valor: totalValue * 0.1,
        tipo: 'atual',
      };
    }

    // Cliente logado sem benefícios de crédito
    return {
      percentual: 0,
      valor: 0,
      tipo: 'nenhum',
    };
  };

  const creditoInfo = calcularCreditoFidelidade();

  // Verificar se a taxa de entrega deve ser aplicada (para compras abaixo de R$ 150,00)
  const aplicarTaxaEntrega = totalValue < 150;
  const valorTaxaEntrega = aplicarTaxaEntrega ? 7 : 0;

  // Calcular valor total com taxa de entrega
  const valorTotalComTaxa = totalValue + valorTaxaEntrega;

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto my-12 px-4"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
            <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#173363] mb-4">Seu carrinho está vazio</h2>
          <p className="text-gray-600 mb-8">
            Parece que você ainda não adicionou nenhum produto ao seu carrinho.
          </p>
          <button
            onClick={() => router.push('/produtos')}
            className="px-6 py-3 bg-[#6EC747] hover:bg-[#5BB636] text-white rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02]"
          >
            Ver Produtos
          </button>
        </div>
      </motion.div>
    );
  }

  // Etapas do processo de checkout
  const etapas = [
    { id: 'produtos', titulo: 'Carrinho' },
    { id: 'entrega', titulo: 'Entrega' },
    { id: 'pagamento', titulo: 'Pagamento' },
  ];

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#173363]">Finalizando seu Pedido</h1>
        <p className="text-gray-600 mt-2">
          {passo === 'produtos'
            ? 'Confira os itens do seu carrinho e avance para a próxima etapa.'
            : passo === 'entrega'
              ? 'Defina o local de entrega para continuar com seu pedido.'
              : 'Escolha a forma de pagamento para finalizar seu pedido.'}
        </p>
      </div>

      {/* Indicador de progresso */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {etapas.map((etapa, index) => (
            <React.Fragment key={etapa.id}>
              {/* Etapa */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    etapa.id === passo
                      ? 'bg-[#6EC747] text-white'
                      : etapas.indexOf({ id: passo, titulo: '' } as any) > index
                        ? 'bg-[#6EC747]/20 text-[#6EC747]'
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {etapas.indexOf({ id: passo, titulo: '' } as any) > index ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className={`text-sm mt-1 ${etapa.id === passo ? 'text-[#173363] font-medium' : 'text-gray-500'}`}
                >
                  {etapa.titulo}
                </span>
              </div>

              {/* Linha conectora (exceto para o último item) */}
              {index < etapas.length - 1 && (
                <div
                  className={`h-0.5 w-full max-w-[100px] ${
                    etapas.indexOf({ id: passo, titulo: '' } as any) > index
                      ? 'bg-[#6EC747]'
                      : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {passo === 'produtos' ? (
          <motion.div
            key="produtos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Lista de Produtos */}
            <div className="lg:col-span-8">
              <motion.div
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-[#173363] flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-[#6EC747]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Itens do seu carrinho ({totalItems})
                  </h2>
                </div>

                <div className="divide-y divide-gray-100">
                  {cartItems.map(produto => (
                    <motion.div
                      key={produto.id}
                      variants={item}
                      className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="relative w-20 h-20 rounded-lg bg-gray-50 flex-shrink-0 overflow-hidden border border-gray-200">
                        <Image
                          src={produto.imagem}
                          alt={produto.nome}
                          fill
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-grow">
                        <h3 className="font-medium text-[#173363]">{produto.nome}</h3>
                        <p className="text-sm text-gray-500">{produto.categoria}</p>
                        <div className="text-[#6EC747] font-medium mt-1">
                          {formatarPreco(produto.valor)}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(produto.id, produto.quantidade - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={produto.quantidade}
                            onChange={e =>
                              updateQuantity(produto.id, parseInt(e.target.value) || 1)
                            }
                            className="w-12 h-8 text-center border-x border-gray-300 focus:outline-none"
                          />
                          <button
                            onClick={() => updateQuantity(produto.id, produto.quantidade + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-[#173363] font-medium">
                            {formatarPreco(produto.valor * produto.quantidade)}
                          </div>
                          <button
                            onClick={() => removeFromCart(produto.id)}
                            className="text-sm text-red-500 hover:text-red-700 transition-colors flex items-center"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Remover
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-24"
              >
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-[#173363]">Resumo do Pedido</h2>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatarPreco(totalValue)}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Quantidade de itens</span>
                    <span>{totalItems}</span>
                  </div>

                  {/* Informações de Crédito */}
                  {creditoInfo.tipo !== 'nenhum' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="pt-2 border-t border-gray-100"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span
                          className={`text-sm font-medium flex items-center ${creditoInfo.tipo === 'potencial' ? 'text-orange-600' : 'text-green-600'}`}
                        >
                          <svg
                            className="w-4 h-4 mr-1 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d={
                                creditoInfo.tipo === 'potencial'
                                  ? 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                  : 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                              }
                            />
                          </svg>
                          {creditoInfo.tipo === 'potencial'
                            ? 'Seu crédito poderia ser de:'
                            : 'Crédito da Compra:'}
                        </span>
                        <span
                          className={`font-medium ${creditoInfo.tipo === 'potencial' ? 'text-orange-600' : 'text-green-600'}`}
                        >
                          {formatarPreco(creditoInfo.valor)}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 mt-1">
                        {creditoInfo.tipo === 'potencial'
                          ? `Ganhe ${creditoInfo.percentual}% de crédito em todas as compras participando do programa de fidelidade.`
                          : 'Este crédito estará disponível para uso após 24 horas da confirmação da entrega.'}
                      </p>

                      {creditoInfo.tipo === 'potencial' && (
                        <button
                          onClick={() => router.push('/cadastro')}
                          className="mt-2 text-xs text-[#173363] font-medium hover:text-[#6EC747] transition-colors"
                        >
                          Criar conta e aproveitar
                        </button>
                      )}
                    </motion.div>
                  )}

                  {/* Taxa de Entrega */}
                  <div className="flex justify-between items-center text-gray-600">
                    <span className="flex items-center">
                      Taxa de Entrega
                      {!aplicarTaxaEntrega && (
                        <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                          Grátis
                        </span>
                      )}
                    </span>
                    <span>{formatarPreco(valorTaxaEntrega)}</span>
                  </div>
                  {aplicarTaxaEntrega && (
                    <p className="text-xs text-gray-500 -mt-2">
                      Compras acima de R$ 150,00 têm entrega gratuita
                    </p>
                  )}

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between font-semibold text-lg">
                      <span className="text-[#173363]">Total</span>
                      <span>{formatarPreco(valorTotalComTaxa)}</span>
                    </div>
                    {passo === 'produtos' && (
                      <p className="text-xs text-gray-500 mt-1">
                        Entrega calculada no próximo passo
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-3 bg-gray-50">
                  <button
                    onClick={handleProximoPasso}
                    className="w-full py-3 bg-[#6EC747] hover:bg-[#5BB636] text-white rounded-lg shadow-md transition-all duration-300 font-medium transform hover:scale-[1.02]"
                  >
                    Próximo Passo
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-300 text-sm"
                  >
                    Limpar Carrinho
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : passo === 'entrega' ? (
          <motion.div
            key="entrega"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Abas */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => isAuthenticated && setActiveTab('fidelidade')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-300 ${
                  activeTab === 'fidelidade'
                    ? 'text-[#173363] border-b-2 border-[#6EC747]'
                    : isAuthenticated
                      ? 'text-gray-500 hover:text-[#173363]'
                      : 'text-gray-300 cursor-not-allowed'
                }`}
                disabled={!isAuthenticated}
              >
                Cliente Fidelidade
                {!isAuthenticated && (
                  <span className="ml-2 text-xs text-gray-400">(Faça login)</span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('novo')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-300 ${
                  activeTab === 'novo'
                    ? 'text-[#173363] border-b-2 border-[#6EC747]'
                    : 'text-gray-500 hover:text-[#173363]'
                }`}
              >
                Cliente Novo
              </button>
            </div>

            {/* Conteúdo das Abas */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {activeTab === 'fidelidade' && isAuthenticated ? (
                  <motion.div
                    key="fidelidade"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <h3 className="text-lg font-medium text-[#173363] mb-4">
                        Dados do Cliente Fidelidade
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Nome</p>
                          <p className="font-medium text-gray-800">{user?.nome}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Endereço</p>
                          <p className="font-medium text-gray-800">{user?.endereco}</p>
                        </div>
                      </div>

                      {!alterarEndereco ? (
                        <button
                          onClick={handleAlterarEndereco}
                          className="mt-4 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md text-sm transition-colors flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                          Alterar Local da Entrega
                        </button>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contato WhatsApp
                              </label>
                              <input
                                type="text"
                                name="contato"
                                value={formData.contato}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all"
                                placeholder="(99) 99999-9999"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cidade
                              </label>
                              <input
                                type="text"
                                name="cidade"
                                value={formData.cidade}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all bg-gray-50"
                                readOnly
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bairro
                              </label>
                              <input
                                type="text"
                                name="bairro"
                                value={formData.bairro}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all"
                                placeholder="Seu bairro"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Rua
                              </label>
                              <input
                                type="text"
                                name="rua"
                                value={formData.rua}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all"
                                placeholder="Nome da rua"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Número
                              </label>
                              <input
                                type="text"
                                name="numero"
                                value={formData.numero}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all"
                                placeholder="123"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="novo"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <h3 className="text-lg font-medium text-[#173363] mb-4">
                        Dados para Entrega
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome
                          </label>
                          <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all"
                            placeholder="Seu nome completo"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contato WhatsApp
                          </label>
                          <input
                            type="text"
                            name="contato"
                            value={formData.contato}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all"
                            placeholder="(99) 99999-9999"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cidade
                          </label>
                          <input
                            type="text"
                            name="cidade"
                            value={formData.cidade}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all bg-gray-50"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bairro
                          </label>
                          <input
                            type="text"
                            name="bairro"
                            value={formData.bairro}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all"
                            placeholder="Seu bairro"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rua
                          </label>
                          <input
                            type="text"
                            name="rua"
                            value={formData.rua}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all"
                            placeholder="Nome da rua"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Número
                          </label>
                          <input
                            type="text"
                            name="numero"
                            value={formData.numero}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-between">
                <button
                  onClick={handleVoltarPasso}
                  className="py-3 px-6 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-300 flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Voltar para o Carrinho
                </button>

                <button
                  onClick={handleContinuarParaPagamento}
                  className="py-3 px-6 bg-[#6EC747] hover:bg-[#5BB636] text-white rounded-lg shadow-md transition-all duration-300 font-medium transform hover:scale-[1.02] flex items-center justify-center"
                >
                  Continuar para Pagamento
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="pagamento"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <OpcoesPagamento
              onVoltar={handleVoltarPasso}
              onFinalizar={handleFinalizarPedido}
              dadosEntrega={{
                nome: formData.nome,
                contato: formData.contato,
                endereco: `${formData.rua}, ${formData.numero}, ${formData.bairro}, ${formData.cidade} - PR`,
                alterouEndereco: alterarEndereco,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
