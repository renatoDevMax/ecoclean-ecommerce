'use client';

import React, { useState, useEffect } from 'react';
import { isValidUrl } from '@/utils/imageUtils';

interface ProdutoImagemProps {
  src: string;
  alt: string;
  className?: string;
  categoria?: string;
}

const ProdutoImagem: React.FC<ProdutoImagemProps> = ({ src, alt, className = "", categoria }) => {
  const [imagemErro, setImagemErro] = useState(false);
  const [imagemCarregada, setImagemCarregada] = useState(false);
  const [erroMensagem, setErroMensagem] = useState<string>('');
  const [erroDetalhes, setErroDetalhes] = useState<{ [key: string]: any }>({});
  
  // URL de rastreamento para exibir nos erros
  const [urlAtual, setUrlAtual] = useState(src);

  useEffect(() => {
    // Atualiza a fonte da imagem quando props mudam
    setUrlAtual(src);
    setImagemErro(false);
    setImagemCarregada(false);
    setErroMensagem('');
    setErroDetalhes({});
    
    // Log da tentativa de carregamento para depuração
    console.log(`Tentando carregar imagem: ${src}`);
    
    // Verificação preliminar da URL
    if (!src) {
      setErroMensagem('URL não fornecida');
      setErroDetalhes({ motivo: 'URL vazia ou undefined' });
      setImagemErro(true);
    } else if (!isValidUrl(src)) {
      setErroMensagem('URL mal formatada');
      setErroDetalhes({ 
        url: src,
        motivo: 'Formato de URL inválido'
      });
      setImagemErro(true);
    }
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    
    // Coleta detalhes do erro
    let detalhesErro = '';
    const errorDetails: {[key: string]: any} = {
      url: src,
      timestamp: new Date().toISOString(),
      categoria: categoria || 'não especificada',
      naturalWidth: target.naturalWidth,
      naturalHeight: target.naturalHeight,
      elementWidth: target.width,
      elementHeight: target.height,
      complete: target.complete,
      currentSrc: target.currentSrc,
    };
    
    // Verificar o tipo de erro
    if (!src) {
      detalhesErro = 'URL não fornecida';
      errorDetails.tipo = 'URL_AUSENTE';
    } else if (!isValidUrl(src)) {
      detalhesErro = 'URL inválida';
      errorDetails.tipo = 'URL_INVALIDA';
    } else if (src.trim() === '') {
      detalhesErro = 'URL vazia';
      errorDetails.tipo = 'URL_VAZIA';
    } else {
      try {
        // Tenta extrair informações da URL
        const urlObj = new URL(src);
        errorDetails.protocol = urlObj.protocol;
        errorDetails.hostname = urlObj.hostname;
        errorDetails.pathname = urlObj.pathname;
        
        detalhesErro = `Erro ao carregar a imagem de ${urlObj.hostname}`;
        errorDetails.tipo = 'FALHA_CARREGAMENTO';
      } catch (error) {
        detalhesErro = 'Erro ao processar URL';
        errorDetails.tipo = 'ERRO_URL';
        errorDetails.parseError = error instanceof Error ? error.message : 'Erro desconhecido';
      }
    }
    
    console.error(`Erro de imagem: ${detalhesErro}`, errorDetails);
    
    setErroMensagem(detalhesErro);
    setErroDetalhes(errorDetails);
    setImagemErro(true);
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    console.log(`Imagem carregada com sucesso: ${src}`, {
      naturalWidth: target.naturalWidth, 
      naturalHeight: target.naturalHeight
    });
    setImagemCarregada(true);
  };

  if (imagemErro) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 p-4 border border-red-200">
        <div className="text-center w-full">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-sm text-red-800 font-medium">{alt || 'Imagem indisponível'}</p>
          <p className="text-xs text-red-700 mt-1 font-mono">Erro: {erroMensagem}</p>
          <div className="mt-2 p-2 bg-red-100 rounded-md text-xs font-mono break-all text-red-800 overflow-auto max-h-32">
            <p className="mb-1 font-bold">URL:</p>
            <p className="opacity-90">{urlAtual || 'Não especificada'}</p>
            
            {erroDetalhes.tipo && (
              <p className="mt-2 font-bold">
                Tipo: <span className="font-normal">{erroDetalhes.tipo}</span>
              </p>
            )}
            
            {erroDetalhes.hostname && (
              <p className="mt-1 opacity-90">
                Servidor: {erroDetalhes.hostname}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${!imagemCarregada ? 'bg-gray-100 animate-pulse' : ''}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${className} ${imagemCarregada ? 'opacity-100' : 'opacity-0'}`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
      {!imagemCarregada && !imagemErro && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#173363] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ProdutoImagem; 