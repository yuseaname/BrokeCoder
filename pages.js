/**
 * Page renderer for BrokeCoder SEO pages
 */

export function renderPage(pageType, data = {}) {
  const appContainer = document.getElementById('app-container');
  const mainNav = document.getElementById('main-nav');
  const mainFooter = document.getElementById('main-footer');
  
  if (!appContainer) return;

  // Hide game screens when showing SEO pages
  const titleScreen = document.getElementById('title-screen');
  const gameScreen = document.getElementById('game-screen');
  
  if (titleScreen) titleScreen.classList.add('hidden');
  if (gameScreen) gameScreen.classList.add('hidden');
  
  // Show app container, nav, and footer
  appContainer.classList.remove('hidden');
  if (mainNav) mainNav.classList.remove('hidden');
  if (mainFooter) mainFooter.classList.remove('hidden');
  
  appContainer.innerHTML = data.content || '';
}

export function showGameScreen() {
  const appContainer = document.getElementById('app-container');
  const titleScreen = document.getElementById('title-screen');
  const mainNav = document.getElementById('main-nav');
  const mainFooter = document.getElementById('main-footer');
  
  // Hide SEO elements
  if (appContainer) appContainer.classList.add('hidden');
  if (mainNav) mainNav.classList.add('hidden');
  if (mainFooter) mainFooter.classList.add('hidden');
  
  // Show game
  if (titleScreen) titleScreen.classList.remove('hidden');
}
