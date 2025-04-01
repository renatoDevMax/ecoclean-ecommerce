'use client';

import React, { useState, useEffect } from 'react';
import ProdutoImagem from '@/components/ProdutoImagem';

const testImages = [
  { url: '', label: 'URL vazia' },
  { url: 'invalid-url', label: 'URL inválida' },
  { url: 'https://example.com/non-existent.jpg', label: 'Imagem inexistente' },
  { url: 'https://picsum.photos/200/300', label: 'Imagem random (Picsum)' },
  { url: 'https://cdn.awsli.com.br/600x450/1750/1750843/produto/238514896/desinf-clari-8bv71qladx.png', label: 'Produto 1' },
  { url: 'https://cdn.awsli.com.br/600x450/1750/1750843/produto/228823711/odorizador-de-ambientes-eucalipto-mint-pronto-uso-qaxo3j1f3s.jpg', label: 'Produto 2' },
  { url: 'https://produtos.saudeecomvida.com.br/img/produtos/desinf-clari-5l.jpg', label: 'Produto 3' },
  { url: 'http://unsecure-image.example/test.jpg', label: 'URL HTTP (insegura)' },
];

export default function ProductImagesDebugPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/produtos');
        if (!response.ok) {
          throw new Error('Falha ao buscar produtos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Erro ao carregar produtos: ' + (err instanceof Error ? err.message : String(err)));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-[#173363] mb-8">Teste de Imagens de Produtos</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-[#173363] mb-4">Imagens de Teste</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {testImages.map((img, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-md bg-white">
              <div className="h-48 relative">
                <ProdutoImagem 
                  src={img.url} 
                  alt={img.label} 
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-800">{img.label}</h3>
                <p className="text-xs font-mono text-gray-500 break-all mt-1">{img.url || '(vazio)'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold text-[#173363] mb-4">Imagens do Banco de Dados</h2>
        
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#173363] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
        
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={index} className="border rounded-lg overflow-hidden shadow-md bg-white">
                <div className="h-48 relative">
                  <ProdutoImagem 
                    src={product.imagem || ''} 
                    alt={product.nome || 'Produto'} 
                    categoria={product.categoria} 
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-800">{product.nome || 'Sem nome'}</h3>
                  <p className="text-xs text-gray-600">{product.categoria || 'Sem categoria'}</p>
                  <p className="text-xs font-mono text-gray-500 break-all mt-1">{product.imagem || '(sem imagem)'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && !error && products.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            Nenhum produto encontrado no banco de dados.
          </div>
        )}
      </div>
    </div>
  );
} 