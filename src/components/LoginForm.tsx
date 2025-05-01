import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error: authError } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (onSubmit) {
        onSubmit(identifier, password);
      } else {
        // Usando o contexto de autenticação para fazer login
        const success = await login(identifier, password);
        if (success) {
          // Redirecionamento após login bem-sucedido
          router.push('/');
        }
      }
    } catch (err) {
      setError('Falha ao fazer login. Verifique suas credenciais.');
    }
  };

  // Usar o erro do contexto, se existir
  const displayError = authError || error;

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8 animate-fade-in-up"
      >
        <div className="mb-6">
          <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
            Nome ou Email
          </label>
          <div className="relative">
            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              placeholder="Seu nome ou email"
              required
            />
            <div className="absolute bottom-0 left-0 h-0.5 bg-secondary transform origin-left transition-all duration-300 w-0 group-focus-within:w-full"></div>
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <div className="relative">
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
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

        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-sm text-primary hover:text-primary-light transition-colors duration-300"
          >
            Esqueceu sua senha?
          </a>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <a
              href="#"
              className="text-primary hover:text-primary-light font-medium transition-colors duration-300"
            >
              Cadastre-se
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
