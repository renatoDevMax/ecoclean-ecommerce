'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Interface para os produtos
export interface CartProduct {
  id: string | number;
  nome: string;
  valor: number;
  descricao: string;
  imagem: string;
  categoria: string;
  quantidade: number;
  cod?: string; // Código do produto, usado para exibição
}

// Interface para o contexto do carrinho
interface CartContextType {
  cartItems: CartProduct[];
  addToCart: (product: Omit<CartProduct, 'quantidade'>) => void;
  addToCartWithQuantity: (product: Omit<CartProduct, 'quantidade'>, quantidade: number) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantidade: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalValue: number;
}

// Criar o contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook personalizado para usar o contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Estado para armazenar os itens do carrinho
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  // Carregar itens do carrinho do localStorage (se houver)
  useEffect(() => {
    const savedCart = localStorage.getItem('ecoCleanCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  // Salvar itens no localStorage quando o carrinho é atualizado
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('ecoCleanCart', JSON.stringify(cartItems));
    }

    // Calcular totais
    const items = cartItems.reduce((acc, item) => acc + item.quantidade, 0);
    const value = cartItems.reduce((acc, item) => acc + item.valor * item.quantidade, 0);

    setTotalItems(items);
    setTotalValue(value);
  }, [cartItems]);

  // Adicionar um produto ao carrinho
  const addToCart = (product: Omit<CartProduct, 'quantidade'>) => {
    setCartItems(prev => {
      // Verificar se o produto já está no carrinho
      const existingProductIndex = prev.findIndex(item => item.id === product.id);

      if (existingProductIndex >= 0) {
        // Se já existe, incrementar a quantidade
        const updatedCart = [...prev];
        updatedCart[existingProductIndex].quantidade += 1;
        return updatedCart;
      } else {
        // Se não existe, adicionar como novo produto
        return [...prev, { ...product, quantidade: 1 }];
      }
    });
  };

  // Adicionar um produto ao carrinho com quantidade específica
  const addToCartWithQuantity = (product: Omit<CartProduct, 'quantidade'>, quantidade: number) => {
    setCartItems(prev => {
      // Verificar se o produto já está no carrinho
      const existingProductIndex = prev.findIndex(item => item.id === product.id);

      if (existingProductIndex >= 0) {
        // Se já existe, somar a quantidade
        const updatedCart = [...prev];
        updatedCart[existingProductIndex].quantidade += quantidade;
        return updatedCart;
      } else {
        // Se não existe, adicionar como novo produto com a quantidade especificada
        return [...prev, { ...product, quantidade }];
      }
    });
  };

  // Remover um produto do carrinho
  const removeFromCart = (productId: string | number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));

    // Se o carrinho ficar vazio, remover do localStorage
    if (cartItems.length === 1) {
      localStorage.removeItem('ecoCleanCart');
    }
  };

  // Atualizar a quantidade de um produto
  const updateQuantity = (productId: string | number, quantidade: number) => {
    if (quantidade <= 0) {
      // Se quantidade for zero ou negativa, remover o produto
      removeFromCart(productId);
      return;
    }

    setCartItems(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantidade } : item))
    );
  };

  // Limpar o carrinho
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('ecoCleanCart');
  };

  // Abrir o modal do carrinho
  const openCart = () => setIsCartOpen(true);

  // Fechar o modal do carrinho
  const closeCart = () => setIsCartOpen(false);

  // Valor do contexto
  const value = {
    cartItems,
    addToCart,
    addToCartWithQuantity,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    openCart,
    closeCart,
    totalItems,
    totalValue,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
