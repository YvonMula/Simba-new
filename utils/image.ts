
export const getOptimizedImage = (url: string, width: number = 800, quality: number = 75) => {
  if (!url) return '';
  if (!url.includes('images.unsplash.com')) return url;
  
  // Remove existing query params to avoid duplication/conflict
  const baseUrl = url.split('?')[0];
  // Add auto=format,compress for WebP/AVIF support and better compression
  return `${baseUrl}?auto=format,compress&fit=crop&q=${quality}&w=${width}&fm=webp`;
};

export const getSrcSet = (url: string) => {
  if (!url || !url.includes('images.unsplash.com')) return undefined;
  
  // Generate srcSet for common breakpoints, including high-res for zoom
  return `
    ${getOptimizedImage(url, 400)} 400w,
    ${getOptimizedImage(url, 600)} 600w,
    ${getOptimizedImage(url, 800)} 800w,
    ${getOptimizedImage(url, 1200)} 1200w,
    ${getOptimizedImage(url, 1600)} 1600w,
    ${getOptimizedImage(url, 2000)} 2000w
  `.trim().replace(/\s+/g, ' ');
};

export const getThumbnailSrcSet = (url: string, width: number) => {
  if (!url || !url.includes('images.unsplash.com')) return undefined;
  // Generate 1x and 2x density for thumbnails
  return `${getOptimizedImage(url, width)} 1x, ${getOptimizedImage(url, width * 2)} 2x`;
};
