/**
 * BrokeCoder App Initialization
 * Handles routing setup and SEO-friendly navigation
 */

import { router } from './router.js';
import {
  renderHome,
  renderPlay,
  renderBlogList,
  renderBlogPost,
  renderCareersList,
  renderCareerDetail,
  renderSkillsList,
  renderSkillDetail,
  renderDevicesList,
  renderDeviceDetail,
  renderAbout,
  renderHowItWorks,
  renderFAQ,
  renderContact,
  renderPrivacy,
  renderTerms,
  renderDisclaimer,
  renderTypingHub,
  renderJavaScriptHub,
  renderCareersHub,
  renderDevicesHub,
  renderGameGuide
  renderToolsIndex,
} from './routes.js';

/**
 * Initialize the SEO-friendly routing system
 */
export function initApp() {
  // Register all routes
  router.register('/', renderHome);
  router.register('/play', renderPlay);
  router.register('/blog', renderBlogList);
  router.register('/blog/:slug', renderBlogPost);
  router.register('/careers', renderCareersList);
  router.register('/careers/:slug', renderCareerDetail);
  router.register('/skills', renderSkillsList);
  router.register('/skills/:slug', renderSkillDetail);
  router.register('/devices', renderDevicesList);
  router.register('/devices/:slug', renderDeviceDetail);
  router.register('/about', renderAbout);
  router.register('/how-it-works', renderHowItWorks);
  router.register('/faq', renderFAQ);
  router.register('/contact', renderContact);
  router.register('/privacy-policy', renderPrivacy);
  router.register('/terms', renderTerms);
  router.register('/disclaimer', renderDisclaimer);
  // Pillar hub routes
  router.register('/learn-typing', renderTypingHub);
  router.register('/learn-javascript', renderJavaScriptHub);
  router.register('/careers-hub', renderCareersHub);
  router.register('/devices-hub', renderDevicesHub);
  router.register('/game-guide', renderGameGuide);
  router.register('/tools', renderToolsIndex);
  // Tools
  router.register('/tools/typing-practice-planner', renderTypingPracticePlanner);
  router.register('/tools/js-learning-path-estimator', renderJSPathEstimator);

  console.log('[BrokeCoder] SEO routing initialized');

  // Analytics: internal link clicks
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (!target) return;
    const href = target.getAttribute('href') || '';
    const isInternal = href.startsWith('#/');
    if (isInternal) {
      try { window.bcTrack && window.bcTrack('internal_link_click', { href, text: (target.textContent || '').trim() }); } catch {}
    }
  });
}

// Initialize on module load
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}
