/**
 * Simple hash-based router for BrokeCoder
 * Manages navigation between game and SEO-friendly pages
 */

import { updateSEO } from './seo.js';
import { renderPage } from './pages.js';

class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.init();
  }

  init() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  register(path, handler) {
    this.routes.set(path, handler);
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, ...params] = hash.split('/').filter(Boolean);
    const fullPath = '/' + (path || '');
    
    this.currentRoute = fullPath;

    // Track page view
    try { window.bcTrack && window.bcTrack('page_view', { path: fullPath, hash: window.location.hash }); } catch {}

    // Find matching route
    let handler = this.routes.get(fullPath);
    
    // Handle dynamic routes (blog/:slug, careers/:slug, etc.)
    if (!handler && params.length > 0) {
      const basePath = fullPath;
      const slug = params[0];
      
      if (basePath === '/blog' && slug) {
        handler = this.routes.get('/blog/:slug');
        if (handler) handler(slug);
        return;
      }
      if (basePath === '/careers' && slug) {
        handler = this.routes.get('/careers/:slug');
        if (handler) handler(slug);
        return;
      }
      if (basePath === '/skills' && slug) {
        handler = this.routes.get('/skills/:slug');
        if (handler) handler(slug);
        return;
      }
      if (basePath === '/devices' && slug) {
        handler = this.routes.get('/devices/:slug');
        if (handler) handler(slug);
        return;
      }
    }

    // Execute handler or show 404
    if (handler) {
      handler();
    } else {
      this.show404();
    }
  }

  navigate(path) {
    window.location.hash = path;
  }

  show404() {
    renderPage('404', { 
      title: 'Page Not Found', 
      content: '<h1>404 - Page Not Found</h1><p>The page you\'re looking for doesn\'t exist.</p><p><a href="#/">Return to Home</a></p>' 
    });
    updateSEO({
      title: '404 - Page Not Found | BrokeCoder',
      description: 'This page does not exist.',
      path: window.location.hash.slice(1)
    });
  }
}

export const router = new Router();
