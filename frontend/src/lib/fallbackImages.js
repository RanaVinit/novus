const FALLBACK_MAP = {
    Technology: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    Design: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800&auto=format&fit=crop&q=80",
    Lifestyle: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
    Business: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    Strategy: "https://images.unsplash.com/photo-1553484771-33162624fcce?w=800&auto=format&fit=crop&q=80",
    Default: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&auto=format&fit=crop&q=80",
};

/**
 * Returns a high-quality Unsplash fallback URL based on the article category.
 * @param {string} category 
 * @returns {string}
 */
export const getFallbackForCategory = (category) => {
    return FALLBACK_MAP[category] || FALLBACK_MAP.Default;
};
