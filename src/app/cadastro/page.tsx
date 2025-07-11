'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function Cadastro() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cpfCnpj: '',
    endereco: '',
    complemento: '',
    contato: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    beneficios: {
      sistemaRecompensa: false,
      entregaPrioridade: false,
      flexibilidadePagamento: false,
      descomplicaPiscinas: false,
    },
  });

  const [senhasIguais, setSenhasIguais] = useState(false);

  useEffect(() => {
    // Adiciona a classe 'active' aos elementos após a montagem do componente
    const elements = document.querySelectorAll('.fade-in-element');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('active');
      }, 100 * index);
    });

    // Verifica se as senhas são iguais e não estão vazias
    setSenhasIguais(
      formData.senha === formData.confirmarSenha &&
        formData.senha !== '' &&
        formData.confirmarSenha !== ''
    );
  }, [formData.senha, formData.confirmarSenha]);

  const formatarCPFCNPJ = (valor: string) => {
    // Remove todos os caracteres não numéricos
    const numeros = valor.replace(/\D/g, '');

    // Formata como CPF se tiver 11 dígitos ou menos
    if (numeros.length <= 11) {
      let resultado = '';
      for (let i = 0; i < numeros.length; i++) {
        if (i === 3 || i === 6) {
          resultado += '.';
        }
        if (i === 9) {
          resultado += '-';
        }
        resultado += numeros[i];
      }
      return resultado;
    }
    // Formata como CNPJ se tiver mais de 11 dígitos
    else {
      let resultado = '';
      for (let i = 0; i < numeros.length; i++) {
        if (i === 2 || i === 5) {
          resultado += '.';
        }
        if (i === 8) {
          resultado += '/';
        }
        if (i === 12) {
          resultado += '-';
        }
        resultado += numeros[i];
      }
      return resultado;
    }
  };

  const formatarTelefone = (valor: string) => {
    // Remove todos os caracteres não numéricos
    const numeros = valor.replace(/\D/g, '');

    let resultado = '';
    for (let i = 0; i < numeros.length; i++) {
      if (i === 0) {
        resultado += '(';
      }
      if (i === 2) {
        resultado += ') ';
      }
      if (i === 7 && numeros.length > 8) {
        resultado += ' - ';
      }
      if (i === 8 && numeros.length <= 8) {
        resultado += ' - ';
      }
      resultado += numeros[i];
    }
    return resultado;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'cpfCnpj') {
      const valorFormatado = formatarCPFCNPJ(value);
      setFormData(prev => ({
        ...prev,
        [name]: valorFormatado,
      }));
    } else if (name === 'contato') {
      const valorFormatado = formatarTelefone(value);
      setFormData(prev => ({
        ...prev,
        [name]: valorFormatado,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleBeneficioChange = (beneficio: string) => {
    setFormData(prev => ({
      ...prev,
      beneficios: {
        ...prev.beneficios,
        [beneficio]: !prev.beneficios[beneficio as keyof typeof prev.beneficios],
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevenir múltiplos envios
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Função para remover caracteres especiais
    const limparFormatacao = (valor: string) => {
      return valor.replace(/\D/g, '');
    };

    // Verificar se o CPF/CNPJ está no formato correto
    const cpfCnpjFormatado = formData.cpfCnpj;
    const cpfCnpjNumeros = limparFormatacao(cpfCnpjFormatado);

    // Criar o objeto seguindo o schema do ClienteMatriz
    const dadosFormulario = {
      nome: formData.nomeCompleto,
      cpfcnpj: cpfCnpjFormatado,
      endereco: formData.endereco,
      contato: limparFormatacao(formData.contato),
      beneficios: ['Sistema de economia com crédito'], // Benefício padrão incluído
      tipoCliente: 'matriz',
      dataCadastro: new Date(),
      email: formData.email,
      senha: formData.senha,
      tempo: 0,
    };

    try {
      // Primeiro, salvar no banco de dados
      const response = await fetch('/api/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          document: dadosFormulario,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar');
      }

      // Lista de benefícios selecionados
      const beneficiosSelecionados = Object.entries(formData.beneficios)
        .filter(([_, selected]) => selected)
        .map(([key]) => {
          switch (key) {
            case 'sistemaRecompensa':
              return 'Sistema de Recompensa de Crédito por Compra Realizada';
            case 'entregaPrioridade':
              return 'Entrega com Prioridade';
            case 'flexibilidadePagamento':
              return 'Flexibilidade no Pagamento';
            case 'descomplicaPiscinas':
              return 'Acesso ao EcoClean Descomplica Piscinas';
            default:
              return '';
          }
        });

      // Preparar a mensagem para o WhatsApp
      const mensagemWhatsApp = `
Um *Cadastro* foi realizado no *Sistema Fideliade EcoClean*

*Nome:* ${formData.nomeCompleto}

*Endereço:* ${formData.endereco}

*Complemento:* ${formData.complemento}

*Contato:* ${formData.contato}

*Email:* ${formData.email}

*Benefícios Solicitados:*
${beneficiosSelecionados.map(beneficio => `- ${beneficio}`).join('\n')}

*Conversar com o cliente*
https://wa.me/55${limparFormatacao(formData.contato)}
`;

      // Tentar enviar mensagem para o WhatsApp (não bloqueia o fluxo)
      try {
        const whatsappResponse = await fetch(
          'https://web-production-cc27.up.railway.app/whatsapp/mensagemCadastro',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              mensagem: mensagemWhatsApp,
            }),
          }
        );

        const whatsappData = await whatsappResponse.json();
        console.log(
          'Status do envio WhatsApp:',
          whatsappData.mensagemEnviada ? 'Sucesso' : 'Falha'
        );
      } catch (whatsappError) {
        console.error('Erro ao enviar mensagem WhatsApp:', whatsappError);
      }

      // Independente do resultado do WhatsApp, mostrar sucesso
      setShowModal(true);

      // Redirecionar após 8 segundos
      setTimeout(() => {
        router.push('/login');
      }, 8000);
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      // Aqui você pode adicionar uma mensagem de erro para o usuário
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EDF3F9] via-white to-[#EDF3F9] relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#7EC13D]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#183263]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#7EC13D]/10 to-[#183263]/10 rounded-full blur-3xl"></div>
      </div>

      <Header />

      <div className="container mx-auto px-4 py-12 mt-24 relative">
        <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 opacity-0 transform translate-y-4 transition-all duration-500 fade-in-element border border-white/20">
          <h1 className="text-3xl font-bold text-[#183263] mb-8 text-center opacity-0 transform translate-y-4 transition-all duration-500 fade-in-element">
            Cadastro EcoClean
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 opacity-0 transform translate-y-4 transition-all duration-500 fade-in-element">
                <label htmlFor="nomeCompleto" className="block text-sm font-medium text-[#183263]">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nomeCompleto"
                  name="nomeCompleto"
                  value={formData.nomeCompleto}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome, Empresa ou Condomínio"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#7EC13D] focus:border-transparent transition-all backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2 opacity-0 transform translate-y-4 transition-all duration-500 fade-in-element">
                <label htmlFor="cpfCnpj" className="block text-sm font-medium text-[#183263]">
                  CPF/CNPJ
                </label>
                <input
                  type="text"
                  id="cpfCnpj"
                  name="cpfCnpj"
                  value={formData.cpfCnpj}
                  onChange={handleChange}
                  required
                  maxLength={18}
                  placeholder="000.000.000-00 ou 00.000.000/0000-00"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#7EC13D] focus:border-transparent transition-all backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2 md:col-span-2 opacity-0 transform translate-y-4 transition-all duration-500 fade-in-element">
                <label htmlFor="endereco" className="block text-sm font-medium text-[#183263]">
                  Endereço Completo
                </label>
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  required
                  placeholder="Matinhos, Bairro, Rua e Número"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#7EC13D] focus:border-transparent transition-all backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2 md:col-span-2 opacity-0 transform translate-y-4 transition-all duration-500 fade-in-element">
                <label htmlFor="complemento" className="block text-sm font-medium text-[#183263]">
                  Complemento
                </label>
                <input
                  type="text"
                  id="complemento"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                  placeholder="Condomínio ou Ponto de Referência"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#7EC13D] focus:border-transparent transition-all backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2 opacity-0 transform translate-y-4 transition-all duration-500 fade-in-element">
                <label htmlFor="contato" className="block text-sm font-medium text-[#183263]">
                  Contato
                </label>
                <input
                  type="text"
                  id="contato"
                  name="contato"
                  value={formData.contato}
                  onChange={handleChange}
                  required
                  maxLength={20}
                  placeholder="(99) 99999 - 9999"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#7EC13D] focus:border-transparent transition-all backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2 opacity-0 transform translate-y-4 transition-all duration-500 fade-in-element">
                <label htmlFor="email" className="block text-sm font-medium text-[#183263]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="seuemailaqui@email.com"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#7EC13D] focus:border-transparent transition-all backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2 opacity-0 transform translate-y-4 transition-all duration-500 fade-in-element relative">
                <label htmlFor="senha" className="block text-sm font-medium text-[#183263]">
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#7EC13D] focus:border-transparent transition-all backdrop-blur-sm"
                />
                {senhasIguais && (
                  <div className="absolute top-8 right-2 text-[#7EC13D] animate-fade-in">
                    <CheckCircleIcon className="h-6 w-6" />
                  </div>
                )}
              </div>

              <div className="space-y-2 opacity-0 transform translate-y-4 transition-all duration-500 fade-in-element relative">
                <label
                  htmlFor="confirmarSenha"
                  className="block text-sm font-medium text-[#183263]"
                >
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#7EC13D] focus:border-transparent transition-all backdrop-blur-sm"
                />
                {senhasIguais && (
                  <div className="absolute top-8 right-2 text-[#7EC13D] animate-fade-in">
                    <CheckCircleIcon className="h-6 w-6" />
                  </div>
                )}
              </div>
            </div>

            {/* Seção de Benefícios */}
            <div className="mt-12 opacity-0 transform translate-y-4 transition-all duration-500 fade-in-element">
              <h2 className="text-2xl font-bold text-[#183263] mb-6 text-center">
                Selecione seus Benefícios de interesse
              </h2>

              <div className="space-y-6">
                {/* Sistema de Recompensa */}
                <div className="bg-white/50 rounded-xl p-6 border border-gray-200 hover:border-[#7EC13D] transition-all">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      id="sistemaRecompensa"
                      checked={formData.beneficios.sistemaRecompensa}
                      onChange={() => handleBeneficioChange('sistemaRecompensa')}
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-[#7EC13D] focus:ring-[#7EC13D] transition-all"
                    />
                    <div>
                      <label
                        htmlFor="sistemaRecompensa"
                        className="text-lg font-semibold text-[#183263] cursor-pointer"
                      >
                        Sistema de Recompensa de Crédito por Compra Realizada
                      </label>
                      <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                        Aqui voce pode gerar créditos por compra realizada, juntar seus créditos e
                        resgata-los como um desconto incrível que faz a diferença no seu bolso. Para
                        empresas e condomínios os créditos ficarão disponíveis por 90 dias, para
                        pessoas, créditos disponíveis por até 30 dias. Moradores ou trabalhadores de
                        uma empresa ou condomínio cadastrado tem acesso a créditos ainda maiores.
                        Créditos disponíveis 24 horas após a realização de uma compra.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Entrega com Prioridade */}
                <div className="bg-white/50 rounded-xl p-6 border border-gray-200 hover:border-[#7EC13D] transition-all">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      id="entregaPrioridade"
                      checked={formData.beneficios.entregaPrioridade}
                      onChange={() => handleBeneficioChange('entregaPrioridade')}
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-[#7EC13D] focus:ring-[#7EC13D] transition-all"
                    />
                    <div>
                      <label
                        htmlFor="entregaPrioridade"
                        className="text-lg font-semibold text-[#183263] cursor-pointer"
                      >
                        Entrega com Prioridade
                      </label>
                      <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                        Aqui seus pedidos ganham prioridade, e são entregues na primeira rota
                        disponível sempre. Designaremos um motorista para levar seus pedidos assim
                        que concluído a solicitação da compra. A EcoClean entende sua necessidade de
                        agilidade no dia a dia.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Flexibilidade no Pagamento */}
                <div className="bg-white/50 rounded-xl p-6 border border-gray-200 hover:border-[#7EC13D] transition-all">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      id="flexibilidadePagamento"
                      checked={formData.beneficios.flexibilidadePagamento}
                      onChange={() => handleBeneficioChange('flexibilidadePagamento')}
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-[#7EC13D] focus:ring-[#7EC13D] transition-all"
                    />
                    <div>
                      <label
                        htmlFor="flexibilidadePagamento"
                        className="text-lg font-semibold text-[#183263] cursor-pointer"
                      >
                        Flexibilidade no Pagamento
                      </label>
                      <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                        Aqui geramos boletos com prazos personalizados que atendem o ciclo
                        financeiro da sua empresa. Seus pedidos são entregues e os pagamentos são
                        realizados apenas em datas pré definidas para voce comerciante ou
                        condomínio. Este benefício é exclusivo para CNPJ.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Descomplica Piscinas */}
                <div className="bg-white/50 rounded-xl p-6 border border-gray-200 hover:border-[#7EC13D] transition-all">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      id="descomplicaPiscinas"
                      checked={formData.beneficios.descomplicaPiscinas}
                      onChange={() => handleBeneficioChange('descomplicaPiscinas')}
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-[#7EC13D] focus:ring-[#7EC13D] transition-all"
                    />
                    <div>
                      <label
                        htmlFor="descomplicaPiscinas"
                        className="text-lg font-semibold text-[#183263] cursor-pointer"
                      >
                        Acesso ao EcoClean Descomplica Piscinas
                      </label>
                      <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                        Um sistema personalizado que lhe ajuda a orientar exatamente como manter sua
                        piscina com água cristalina, informamdo exatamente quanto de produto usar
                        para atender exatamente a necessidade da sua piscina. Um sistema que
                        facilita sua vida, e descomplica cálculos e estudos referente ao tratamento
                        de águas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-8 space-x-4">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="px-8 py-3 bg-white text-[#183263] font-medium rounded-full
                         border-2 border-[#183263] hover:bg-[#183263] hover:text-white
                         transition-all duration-300 hover:shadow-lg hover:shadow-[#183263]/20 hover:-translate-y-1"
              >
                Voltar a Tela Inicial
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 font-medium rounded-full transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#7EC13D] to-[#6EC747] text-white hover:from-[#6EC747] hover:to-[#5AB636] hover:shadow-lg hover:shadow-[#183263]/20 hover:-translate-y-1'
                }`}
              >
                {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Sucesso */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 transform transition-all animate-fade-in">
            <h2 className="text-2xl font-bold text-[#183263] mb-4 text-center">
              Cadastro Realizado com Sucesso! 😊
            </h2>
            <p className="text-gray-600 text-center">
              Seu cadastro foi realizado com sucesso. Nossa equipe de administração avaliará sua
              solicitação e entrará em contato disponibilizando acesso a valores e benefícios
              solicitados. Você já pode fazer o seu Login com Sucesso. Obrigado pela preferência!
            </p>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
