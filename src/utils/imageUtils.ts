/**
 * Utilitários para manipulação de imagens
 */

/**
 * Verifica se uma string é uma URL válida
 * @param url String a ser verificada
 * @returns true se for uma URL válida, false caso contrário
 */
export function isValidUrl(url: string): boolean {
  if (!url) return false;
  
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Verifica se uma URL de imagem é válida e carregável
 * @param url URL da imagem
 * @returns Promise que resolve para true se a imagem for carregável, false caso contrário
 */
export function isImageUrlValid(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!isValidUrl(url)) {
      resolve(false);
      return;
    }

    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

/**
 * Obtém uma URL de imagem válida ou retorna a URL padrão
 * @param url URL da imagem a ser verificada
 * @param defaultUrl URL padrão a ser retornada caso a imagem seja inválida
 * @returns URL válida ou URL padrão
 */
export function getValidImageUrl(url: string, defaultUrl: string = '/produto-default.jpg'): string {
  if (!isValidUrl(url)) {
    return defaultUrl;
  }
  
  return url;
}

// Tipo para categorias válidas
export type ProdutoCategoria = 
  | 'Cozinha'
  | 'Banheiro'
  | 'Estofados e Tecidos'
  | 'Automotivo'
  | 'Piscinas'
  | 'Organizadores';

/**
 * Lista de imagens padrão por categoria para uso quando não houver imagem disponível
 */
export const defaultCategoryImages: Record<ProdutoCategoria | 'default', string> = {
  'Cozinha': '/images/default-cozinha.jpg',
  'Banheiro': '/images/default-banheiro.jpg', 
  'Estofados e Tecidos': '/images/default-estofados.jpg',
  'Automotivo': '/images/default-automotivo.jpg',
  'Piscinas': '/images/default-piscinas.jpg',
  'Organizadores': '/images/default-organizadores.jpg',
  'default': '/produto-default.jpg'
};

/**
 * Obtém a imagem padrão para uma categoria
 * @param categoria Nome da categoria
 * @returns URL da imagem padrão para a categoria ou imagem default
 */
export function getDefaultImageForCategory(categoria?: string): string {
  if (!categoria) return defaultCategoryImages.default;
  
  return (categoria in defaultCategoryImages) 
    ? defaultCategoryImages[categoria as ProdutoCategoria] 
    : defaultCategoryImages.default;
} 