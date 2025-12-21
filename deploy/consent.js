const CONSENT_KEY = 'bc-consent-v1';
const ANALYTICS_SRC = 'https://app.rybbit.io/api/script.js';
const ANALYTICS_SITE_ID = '321ab12ef995';

function getStoredConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.warn('[BrokeCoder] Unable to read consent storage', err);
    return null;
  }
}

function storeConsent(status) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ status, ts: Date.now() }));
  } catch (err) {
    console.warn('[BrokeCoder] Unable to store consent', err);
  }
}

function loadAnalyticsOnce() {
  if (window.__bcAnalyticsLoaded) return;
  const existing = document.querySelector(`script[src="${ANALYTICS_SRC}"]`);
  if (existing) {
    window.__bcAnalyticsLoaded = true;
    return;
  }
  const script = document.createElement('script');
  script.src = ANALYTICS_SRC;
  script.setAttribute('data-site-id', ANALYTICS_SITE_ID);
  script.defer = true;
  script.onload = () => { window.__bcAnalyticsLoaded = true; };
  document.head.appendChild(script);
}

function hideBanner() {
  const banner = document.getElementById('consent-banner');
  if (banner) banner.remove();
}

function renderBanner() {
  if (document.getElementById('consent-banner')) return;

  const banner = document.createElement('div');
  banner.id = 'consent-banner';
  banner.className = 'consent-banner';
  banner.innerHTML = `
    <div class="consent-copy">
      <strong>We use cookies for a better experience.</strong>
      <p>
        We use essential cookies for the game and optional analytics to improve BrokeCoder.
        Choose Accept to allow analytics, or Reject to stay essential-only. You can change this anytime in Privacy Settings.
      </p>
    </div>
    <div class="consent-actions">
      <button type="button" class="consent-btn ghost" id="consent-reject">Reject</button>
      <button type="button" class="consent-btn ghost" id="consent-manage">Manage</button>
      <button type="button" class="consent-btn primary" id="consent-accept">Accept</button>
    </div>
  `;

  document.body.appendChild(banner);

  const acceptBtn = document.getElementById('consent-accept');
  const rejectBtn = document.getElementById('consent-reject');
  const manageBtn = document.getElementById('consent-manage');

  acceptBtn?.addEventListener('click', () => {
    storeConsent('accepted');
    loadAnalyticsOnce();
    hideBanner();
  });

  rejectBtn?.addEventListener('click', () => {
    storeConsent('rejected');
    hideBanner();
  });

  manageBtn?.addEventListener('click', () => {
    banner.classList.toggle('expanded');
  });
}

function wirePrivacySettingsLink() {
  const link = document.getElementById('privacy-settings-link');
  if (link) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      renderBanner();
    });
  }
}

function initConsent() {
  const stored = getStoredConsent();
  if (stored?.status === 'accepted') {
    loadAnalyticsOnce();
  } else if (stored?.status === 'rejected') {
    // Respect rejection; no analytics.
  } else {
    renderBanner();
  }
  wirePrivacySettingsLink();
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConsent);
  } else {
    initConsent();
  }
}
