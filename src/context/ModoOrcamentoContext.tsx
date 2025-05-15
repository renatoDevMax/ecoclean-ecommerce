'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';
import { useAuth } from './AuthContext';
import type { ClienteMatriz, ClienteFiliado } from './AuthContext';

interface ModoOrcamentoContextData {
  tempoTotal: number;
  setTempoTotal: (tempo: number) => void;
  adicionarTempo: (tempo: number) => void;
  removerTempo: (tempo: number) => void;
  resetarTempo: () => void;
  isOrcamentoAtivo: boolean;
  toggleOrcamento: () => void;
}

interface ModoOrcamentoProviderProps {
  children: ReactNode;
}

const ModoOrcamentoContext = createContext<ModoOrcamentoContextData>(
  {} as ModoOrcamentoContextData
);

export function ModoOrcamentoProvider({ children }: ModoOrcamentoProviderProps) {
  const [tempoTotal, setTempoTotal] = useState(0);
  const [isOrcamentoAtivo, setIsOrcamentoAtivo] = useState(true);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setIsOrcamentoAtivo(true);
    } else if (user && (user as ClienteMatriz | ClienteFiliado).tempo !== undefined) {
      const userTempo = (user as ClienteMatriz | ClienteFiliado).tempo;
      setIsOrcamentoAtivo(userTempo <= 0);
      setTempoTotal(userTempo);
    }
  }, [isAuthenticated, user]);

  const adicionarTempo = useCallback((tempo: number) => {
    setTempoTotal(tempoAtual => {
      const novoTempo = tempoAtual + tempo;
      setIsOrcamentoAtivo(novoTempo <= 0);
      return novoTempo;
    });
  }, []);

  const removerTempo = useCallback((tempo: number) => {
    setTempoTotal(tempoAtual => {
      const novoTempo = Math.max(0, tempoAtual - tempo);
      setIsOrcamentoAtivo(novoTempo <= 0);
      return novoTempo;
    });
  }, []);

  const resetarTempo = useCallback(() => {
    setTempoTotal(0);
    setIsOrcamentoAtivo(true);
  }, []);

  const toggleOrcamento = useCallback(() => {
    if (isAuthenticated && user && (user as ClienteMatriz | ClienteFiliado).tempo > 0) {
      setIsOrcamentoAtivo(atual => !atual);
    }
  }, [isAuthenticated, user]);

  return (
    <ModoOrcamentoContext.Provider
      value={{
        tempoTotal,
        setTempoTotal,
        adicionarTempo,
        removerTempo,
        resetarTempo,
        isOrcamentoAtivo,
        toggleOrcamento,
      }}
    >
      {children}
    </ModoOrcamentoContext.Provider>
  );
}

export function useModoOrcamento(): ModoOrcamentoContextData {
  const context = useContext(ModoOrcamentoContext);

  if (!context) {
    throw new Error('useModoOrcamento deve ser usado dentro de um ModoOrcamentoProvider');
  }

  return context;
}
