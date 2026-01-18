/**
 * Generate optimized image URL with query parameters
 * @param {string} imageUrl - Original image URL
 * @param {number} width - Desired width
 * @param {number} quality - Quality 1-100 (default: 60 for aggressive compression)
 * @returns {string} Optimized image URL
 */
export const optimizeImageUrl = (imageUrl, width = 400, quality = 50) => {
  if (!imageUrl) return '';

  if (imageUrl.includes('unsplash.com')) {
    const params = new URLSearchParams({
      w: width,
      q: quality,
      fit: 'crop',
      auto: 'format',
      dpr: '1',
    });
    const connector = imageUrl.includes('?') ? '&' : '?';
    return `${imageUrl}${connector}${params.toString()}`;
  }

  return imageUrl;
};

/**
 * Generate srcSet for responsive images with better compression
 * @param {string} imageUrl - Original image URL
 * @param {boolean} isLarge - If true, use larger breakpoints (for featured cards)
 * @returns {string} srcSet string for responsive loading
 */
export const generateSrcSet = (imageUrl, isLarge = false) => {
  if (!imageUrl || !imageUrl.includes('unsplash.com')) {
    return '';
  }

  if (isLarge) {
    return [
      `${optimizeImageUrl(imageUrl, 400, 50)} 400w`,
      `${optimizeImageUrl(imageUrl, 600, 55)} 600w`,
      `${optimizeImageUrl(imageUrl, 800, 60)} 800w`,
    ].join(', ');
  }

  return [
    `${optimizeImageUrl(imageUrl, 256, 50)} 256w`,
    `${optimizeImageUrl(imageUrl, 400, 55)} 400w`,
    `${optimizeImageUrl(imageUrl, 600, 60)} 600w`,
  ].join(', ');
};