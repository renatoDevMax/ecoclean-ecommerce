'use client';

import React, { useState } from 'react';
import ProdutoImagem from './ProdutoImagem';

const ImageDebugger: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [categoria, setCategoria] = useState<string>('');
  const [testType, setTestType] = useState<string>('direto');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // Lista de URLs para testes
  const sampleUrls = [
    { label: 'URL inválida', value: 'invalid-url' },
    { label: 'URL vazia', value: '' },
    { label: 'Google Logo (https)', value: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' },
    { label: 'Imagem inexistente', value: 'https://example.com/non-existent-image.jpg' },
    { label: 'Produto do MongoDB', value: 'https://cdn.awsli.com.br/600x450/1750/1750843/produto/238514896/desinf-clari-8bv71qladx.png' }
  ];

  const handleTestImage = () => {
    if (!imageUrl && testType !== 'direto') {
      setErrorMessage('Por favor, insira uma URL de imagem');
      return;
    }
    
    setErrorMessage('');
  };

  const categorias = ['Cozinha', 'Banheiro', 'Estofados e Tecidos', 'Automotivo', 'Piscinas', 'Organizadores'];

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[#173363] mb-4">Depurador de Imagens</h2>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">URL da Imagem:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#173363]"
          placeholder="Digite a URL da imagem"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Categoria:</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#173363]"
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Exemplos de URLs:</label>
        <select
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#173363]"
        >
          <option value="">Selecione um exemplo</option>
          {sampleUrls.map((url, index) => (
            <option key={index} value={url.value}>{url.label}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <button
          onClick={handleTestImage}
          className="px-4 py-2 bg-[#173363] text-white rounded-md hover:bg-[#0f2042]"
        >
          Testar Imagem
        </button>
      </div>
      
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Resultado do Teste:</h3>
        
        <div className="h-64 border border-gray-300 rounded-lg overflow-hidden">
          <ProdutoImagem
            src={imageUrl}
            alt="Imagem de teste"
            categoria={categoria}
          />
        </div>
        
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h4 className="font-semibold mb-2">Detalhes:</h4>
          <pre className="text-xs overflow-auto p-2 bg-white rounded border">
            URL: {imageUrl || 'Não especificada'}<br/>
            Categoria: {categoria || 'Não especificada'}<br/>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ImageDebugger; 