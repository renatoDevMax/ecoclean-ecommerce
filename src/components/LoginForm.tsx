import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createPortal } from 'react-dom';
import Link from 'next/link';

// Interface para os dados do formulário
interface RegisterFormData {
  nome: string;
  cpfcnpj: string;
  endereco: string;
  contato: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  participarProgramaFidelidade: boolean;
}

// Interface para feedback após cadastro
interface RegisterFeedback {
  status: 'success' | 'error';
  message: string;
}

// Componente de feedback de sucesso ou erro
const FeedbackMessage = ({
  feedback,
  onClose,
}: {
  feedback: RegisterFeedback;
  onClose: () => void;
}) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prevCount => prevCount - 1);
      }, 1000);
    } else {
      onClose();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, onClose]);

  return (
    <div className="flex flex-col items-center text-center p-8">
      {feedback.status === 'success' ? (
        <>
          {/* Ícone de sucesso animado */}
          <div className="w-20 h-20 rounded-full bg-[#6EC747]/10 flex items-center justify-center mb-6 animate-pulse">
            <svg
              className="w-12 h-12 text-[#6EC747]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 12L11 15L16 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h4 className="text-2xl font-light text-[#173363] mb-2">
            Cadastro realizado com sucesso!
          </h4>

          <p className="text-gray-600 mb-6">
            Você já pode fazer login com suas credenciais.
            <br />
            Seja bem-vindo à EcoClean! <span className="text-2xl">😊</span>
          </p>
        </>
      ) : (
        <>
          {/* Ícone de erro animado */}
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6 animate-pulse">
            <svg
              className="w-12 h-12 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M15 9L9 15M9 9L15 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h4 className="text-2xl font-light text-red-600 mb-2">Erro no cadastro</h4>

          <p className="text-gray-600 mb-6">
            {feedback.message}
            <br />
            Por favor, tente novamente.
          </p>
        </>
      )}

      {/* Contador elegante */}
      <div className="relative h-14 w-14">
        <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="16" fill="none" stroke="#eee" strokeWidth="2" />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke={feedback.status === 'success' ? 'url(#gradient)' : '#f87171'}
            strokeWidth="2"
            strokeDasharray={`${(countdown / 5) * 100} 100`}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#173363" />
              <stop offset="100%" stopColor="#6EC747" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[#173363] font-light text-xl">
          {countdown}
        </div>
      </div>
    </div>
  );
};

// Componente do modal separado para evitar re-renderizações desnecessárias
const RegisterModal = ({
  isOpen,
  onClose,
  formData,
  handleChange,
  handleSubmit,
  feedback,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  formData: RegisterFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  feedback: RegisterFeedback | null;
  isLoading: boolean;
}) => {
  const [mounted, setMounted] = useState(false);

  // Controlar a montagem apenas uma vez quando o modal abrir
  useEffect(() => {
    if (isOpen && !mounted) {
      setMounted(true);
    }

    if (!isOpen) {
      setTimeout(() => {
        setMounted(false);
      }, 300); // Aguardar a animação de saída
    }
  }, [isOpen, mounted]);

  if (!isOpen && !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Overlay com efeito de desfoque */}
      <div className="fixed inset-0 bg-[#173363]/30 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] relative z-10 animate-scale-in overflow-hidden flex flex-col">
        {/* Modal Header com gradiente elegante */}
        <div className="bg-gradient-to-r from-[#173363] to-[#6EC747] p-6 text-white">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-light">
              Cadastre-se na <span className="font-semibold">EcoClean</span>
            </h3>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body com scroll */}
        <div className="overflow-y-auto p-6 flex-grow">
          {feedback ? (
            <FeedbackMessage feedback={feedback} onClose={onClose} />
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                    placeholder="Digite seu nome completo"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label htmlFor="cpfcnpj" className="block text-sm font-medium text-gray-700 mb-1">
                    CPF/CNPJ
                  </label>
                  <input
                    type="text"
                    id="cpfcnpj"
                    name="cpfcnpj"
                    value={formData.cpfcnpj}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                    placeholder="000.000.000-00 ou 00.000.000/0000-00"
                    required
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="endereco"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Endereço completo
                  </label>
                  <input
                    type="text"
                    id="endereco"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                    placeholder="Rua, número, bairro, cidade, estado"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label htmlFor="contato" className="block text-sm font-medium text-gray-700 mb-1">
                    Contato (telefone)
                  </label>
                  <input
                    type="text"
                    id="contato"
                    name="contato"
                    value={formData.contato}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                    placeholder="exemplo@email.com"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                    placeholder="Digite sua senha"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="confirmarSenha"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    id="confirmarSenha"
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                    placeholder="Confirme sua senha"
                    required
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="participarProgramaFidelidade"
                        name="participarProgramaFidelidade"
                        type="checkbox"
                        checked={formData.participarProgramaFidelidade}
                        onChange={handleChange}
                        className="focus:ring-[#6EC747] h-4 w-4 text-[#6EC747] border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="participarProgramaFidelidade"
                        className="font-medium text-gray-700"
                      >
                        Desejo participar do programa de fidelidade
                      </label>
                      <p className="text-gray-500">
                        Ganhe pontos e descontos exclusivos em todas as suas compras.
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm text-center py-3">
                    Seu cadastro será avaliado pelo administrativo, e então é verificado a
                    disponibilização de acesso aos valores
                  </p>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-[#173363] to-[#6EC747] text-white rounded-lg hover:shadow-md transition-all flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processando...
                    </>
                  ) : (
                    'Confirmar'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [showRecuperacaoModal, setShowRecuperacaoModal] = useState(false);
  const [emailRecuperacao, setEmailRecuperacao] = useState('');
  const { login, loading, error: authError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    try {
      if (onSubmit) {
        onSubmit(email, senha);
      } else {
        const success = await login(email, senha);
        if (success) {
          router.push('/');
        }
      }
    } catch (err) {
      setErro('Falha ao fazer login. Verifique suas credenciais.');
    }
  };

  const handleRecuperacaoSenha = () => {
    const mensagem = `Olá, esqueci minha senha e gostaria de cadastrar uma nova senha, segue meu email: ${emailRecuperacao}`;
    const url = `https://wa.me/5541997943219?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
    setShowRecuperacaoModal(false);
    setEmailRecuperacao('');
  };

  // Usar o erro do contexto, se existir
  const displayError = authError || erro;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8 animate-fade-in-up"
      >
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Nome ou Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              placeholder="Seu nome ou email"
              required
            />
            <div className="absolute bottom-0 left-0 h-0.5 bg-secondary transform origin-left transition-all duration-300 w-0 group-focus-within:w-full"></div>
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <div className="relative">
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              placeholder="Sua senha"
              required
            />
            <div className="absolute bottom-0 left-0 h-0.5 bg-secondary transform origin-left transition-all duration-300 w-0 group-focus-within:w-full"></div>
          </div>
        </div>

        {displayError && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm animate-fade-in">
            {displayError}
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowRecuperacaoModal(true)}
            className="text-sm text-[#173363] hover:text-[#6EC747] transition-colors"
          >
            Esqueceu sua senha?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border-2 border-green-700 rounded-md shadow-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-lg font-medium"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            'Fazer Login'
          )}
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link
              href="/cadastro"
              className="text-primary hover:text-primary-light font-medium transition-colors duration-300"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </form>

      {/* Modal de Recuperação de Senha */}
      {showRecuperacaoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 transform transition-all animate-fade-in">
            <h2 className="text-2xl font-bold text-[#173363] mb-6 text-center">
              Solicitar recadastro da senha
            </h2>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="emailRecuperacao"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="emailRecuperacao"
                  value={emailRecuperacao}
                  onChange={e => setEmailRecuperacao(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC13D] focus:border-transparent transition-all"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowRecuperacaoModal(false);
                    setEmailRecuperacao('');
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleRecuperacaoSenha}
                  disabled={!emailRecuperacao}
                  className="px-6 py-2 bg-gradient-to-r from-[#173363] to-[#6EC747] text-white rounded-lg hover:shadow-lg hover:shadow-[#173363]/20 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Abrir Solicitação
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
