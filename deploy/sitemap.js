/**
 * Sitemap generator for BrokeCoder
 * Generates XML sitemap dynamically based on content
 */

import { getAllBlogPosts, getAllCareers, getAllSkills, getAllDevices } from './content.js';

export function generateSitemap() {
  const baseUrl = 'https://brokercoder.cloud';
  const today = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages = [
    { loc: '/', priority: '1.0', changefreq: 'weekly', lastmod: today },
    { loc: '/play', priority: '1.0', changefreq: 'monthly', lastmod: today },
    { loc: '/about', priority: '0.8', changefreq: 'monthly', lastmod: today },
    { loc: '/how-it-works', priority: '0.8', changefreq: 'monthly', lastmod: today },
    { loc: '/faq', priority: '0.7', changefreq: 'monthly', lastmod: today },
    { loc: '/blog', priority: '0.9', changefreq: 'daily', lastmod: today },
    { loc: '/careers', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { loc: '/skills', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { loc: '/devices', priority: '0.8', changefreq: 'monthly', lastmod: today },
    { loc: '/learn-typing', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { loc: '/learn-javascript', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { loc: '/careers-hub', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { loc: '/devices-hub', priority: '0.8', changefreq: 'monthly', lastmod: today },
    { loc: '/game-guide', priority: '0.8', changefreq: 'monthly', lastmod: today },
    { loc: '/tools', priority: '0.8', changefreq: 'monthly', lastmod: today },
    { loc: '/tools/typing-practice-planner', priority: '0.7', changefreq: 'monthly', lastmod: today },
    { loc: '/tools/js-learning-path-estimator', priority: '0.7', changefreq: 'monthly', lastmod: today },
    { loc: '/contact', priority: '0.6', changefreq: 'yearly', lastmod: today },
    { loc: '/privacy-policy', priority: '0.5', changefreq: 'yearly', lastmod: today },
    { loc: '/terms', priority: '0.5', changefreq: 'yearly', lastmod: today },
    { loc: '/disclaimer', priority: '0.5', changefreq: 'yearly', lastmod: today },
  ];

  // Dynamic content
  const blogPosts = getAllBlogPosts().map(post => ({
    loc: `/blog/${post.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: post.updatedDate ? post.updatedDate.split('T')[0] : post.publishedDate.split('T')[0]
  }));

  const careers = getAllCareers().map(career => ({
    loc: `/careers/${career.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: career.updatedDate ? career.updatedDate.split('T')[0] : career.publishedDate.split('T')[0]
  }));

  const skills = getAllSkills().map(skill => ({
    loc: `/skills/${skill.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: skill.updatedDate ? skill.updatedDate.split('T')[0] : skill.publishedDate.split('T')[0]
  }));

  const devices = getAllDevices().map(device => ({
    loc: `/devices/${device.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: device.updatedDate ? device.updatedDate.split('T')[0] : device.publishedDate.split('T')[0]
  }));

  // Combine all pages
  const allPages = [...staticPages, ...blogPosts, ...careers, ...skills, ...devices];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

// For server-side generation or build process
export function saveSitemap() {
  const xml = generateSitemap();
  return xml;
}
