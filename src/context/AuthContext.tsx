'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definindo os tipos para os usuários
export interface ClienteMatriz {
  _id: string;
  nome: string;
  cpfcnpj: string;
  endereco: string;
  contato: string;
  beneficios: string[];
  tipoCliente: string;
  dataCadastro: Date;
  email: string;
  tempo: number;
}

export interface ClienteFiliado {
  _id: string;
  nome: string;
  cpfcnpj: string;
  endereco: string;
  contato: string;
  beneficios: string[];
  tipoCliente: string;
  dataCadastro: Date;
  matriz: string;
  beneficioMatriz: string[];
  email: string;
  tempo: number;
}

export type UserType = ClienteMatriz | ClienteFiliado | null;

interface AuthContextType {
  user: UserType;
  loading: boolean;
  error: string | null;
  login: (identifier: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar se há usuário no localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('ecoCleanUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Erro ao recuperar usuário da sessão:', err);
        localStorage.removeItem('ecoCleanUser');
      }
    }
  }, []);

  // Função de login
  const login = async (identifier: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      // Armazenar no localStorage (excluindo a senha)
      delete data.user.senha;
      localStorage.setItem('ecoCleanUser', JSON.stringify(data.user));

      setUser(data.user);
      setIsAuthenticated(true);
      return true;
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao fazer login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem('ecoCleanUser');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
