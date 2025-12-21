/**
 * SEO Meta Tag Manager
 * Handles title, meta tags, OpenGraph, Twitter cards, canonical URLs
 */

export function updateSEO(config) {
  const {
    title = 'BrokeCoder - Learn Typing & Coding Through Gaming',
    description = 'Master typing and coding skills through an immersive browser-based RPG. Navigate LA\'s digital jungle while building real-world tech career skills.',
    path = '/',
    image = '/media/game/brokecoder-og.png',
    type = 'website',
    keywords = 'typing game, coding tutorial, learn to code, typing RPG, tech careers, programming skills',
    author = 'BrokeCoder',
    publishedTime,
    modifiedTime,
    tags = []
  } = config;

  const baseUrl = window.location.origin;
  const canonicalUrl = `${baseUrl}${path.startsWith('/') ? path : '/' + path}`;

  // Update title
  document.title = title;

  // Helper to update or create meta tag
  const setMeta = (selector, content, attribute = 'content') => {
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      const selectorParts = selector.match(/\[(.+?)=["'](.+?)["']\]/);
      if (selectorParts) {
        element.setAttribute(selectorParts[1], selectorParts[2]);
      }
      document.head.appendChild(element);
    }
    element.setAttribute(attribute, content);
  };

  // Basic meta tags
  setMeta('meta[name="description"]', description);
  setMeta('meta[name="keywords"]', keywords);
  setMeta('meta[name="author"]', author);

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalUrl);

  // OpenGraph tags
  setMeta('meta[property="og:title"]', title);
  setMeta('meta[property="og:description"]', description);
  setMeta('meta[property="og:type"]', type);
  setMeta('meta[property="og:url"]', canonicalUrl);
  setMeta('meta[property="og:image"]', `${baseUrl}${image}`);
  setMeta('meta[property="og:site_name"]', 'BrokeCoder');

  // Article-specific OG tags
  if (type === 'article') {
    if (publishedTime) {
      setMeta('meta[property="article:published_time"]', publishedTime);
    }
    if (modifiedTime) {
      setMeta('meta[property="article:modified_time"]', modifiedTime);
    }
    if (tags.length > 0) {
      // Remove existing article:tag meta tags
      document.querySelectorAll('meta[property="article:tag"]').forEach(el => el.remove());
      // Add new tags
      tags.forEach(tag => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'article:tag');
        meta.setAttribute('content', tag);
        document.head.appendChild(meta);
      });
    }
  }

  // Twitter Card tags
  setMeta('meta[name="twitter:card"]', 'summary_large_image');
  setMeta('meta[name="twitter:title"]', title);
  setMeta('meta[name="twitter:description"]', description);
  setMeta('meta[name="twitter:image"]', `${baseUrl}${image}`);

  // Robots meta
  setMeta('meta[name="robots"]', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
}

/**
 * Add JSON-LD structured data to the page
 */
export function addStructuredData(schema) {
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}

/**
 * Generate VideoGame schema for game pages
 */
export function generateVideoGameSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "BrokeCoder",
    "description": "An immersive typing RPG where you navigate LA's digital jungle while mastering coding and typing skills. Battle through the Phone Era with neon grit and thumb-crushing typing drills.",
    "genre": ["Educational", "Role Playing Game", "Typing Game"],
    "gamePlatform": "Web Browser",
    "applicationCategory": "Game",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "playMode": "SinglePlayer",
    "url": window.location.origin,
    "educationalUse": "Typing practice, coding fundamentals, career exploration",
    "learningResourceType": "Interactive Game",
    "interactivityType": "active"
  };
}

/**
 * Generate BlogPosting schema for blog posts
 */
export function generateBlogPostSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.heroImage ? `${window.location.origin}${post.heroImage}` : undefined,
    "datePublished": post.publishedDate,
    "dateModified": post.updatedDate || post.publishedDate,
    "author": {
      "@type": "Organization",
      "name": "BrokeCoder"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BrokeCoder",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/media/game/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${window.location.origin}/#/blog/${post.slug}`
    },
    "keywords": post.tags?.join(', ')
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generate WebSite schema for hub/landing pages
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BrokeCoder",
    "url": window.location.origin,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${window.location.origin}/#/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generate SoftwareApplication schema for on-site interactive tools
 */
export function generateSoftwareAppSchema({ name, description, path }) {
  const url = `${window.location.origin}/#${path.startsWith('/') ? path : '/' + path}`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "url": url
  };
}
