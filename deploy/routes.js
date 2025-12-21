/**
 * Route handlers for all BrokeCoder pages
 */

import { renderPage, showGameScreen } from './pages.js';
import { updateSEO, addStructuredData, generateVideoGameSchema, generateBlogPostSchema, generateFAQSchema, generateWebsiteSchema, generateSoftwareAppSchema } from './seo.js';
import {
  getAllBlogPosts,
  getBlogPost,
  getRecentBlogPosts,
  getAllCareers,
  getCareer,
  getAllSkills,
  getSkill,
  getAllDevices,
  getDevice,
  getRelatedContent,
  loadCareerManifest,
  getAllCareerSummaries
} from './content.js';
import { router } from './router.js';

const DEFAULT_AUTHOR = {
  name: 'BrokeCoder Team',
  bio: 'We build beginner-friendly typing, coding, and career quests for aspiring developers and career switchers.',
  url: 'https://brokercoder.cloud'
};

const ENABLE_AD_SLOTS = false; // Set true to render reserved ad placeholders for layout stability
const EXPLORE_LINK_TARGET = 6;

/**
 * Home page / Landing page
 */
export function renderHome() {
  const recentPosts = getRecentBlogPosts(3);
  
  const content = `
    <div class="landing-page">
      <section class="hero-section">
        <div class="hero-content">
          <h1>Master Typing & Coding Through Gaming</h1>
          <p class="hero-subtitle">
            Navigate LA's digital jungle in BrokeCoder—an immersive typing RPG that builds real coding skills 
            while you battle through the Phone Era with neon grit and thumb-crushing challenges.
          </p>
          <div class="cta-buttons">
            <a href="#/play" class="btn btn-primary btn-large">Start Playing Free</a>
            <a href="#/how-it-works" class="btn btn-secondary btn-large">How It Works</a>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <strong>0 Cost</strong>
              <span>Completely Free</span>
            </div>
            <div class="stat">
              <strong>Browser-Based</strong>
              <span>No Download Required</span>
            </div>
            <div class="stat">
              <strong>Real Skills</strong>
              <span>Build Career Value</span>
            </div>
          </div>
        </div>
      </section>

      <section class="features-section">
        <h2>What is BrokeCoder?</h2>
        <p class="section-intro">
          BrokeCoder is where typing practice meets RPG adventure. Progress from a broke coder with a flip phone 
          to a tech professional, learning real coding patterns and career skills along the way.
        </p>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">⌨️</div>
            <h3>Typing Mastery</h3>
            <p>Build WPM and accuracy through code-specific patterns, special characters, and real programming syntax.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">💻</div>
            <h3>Learn to Code</h3>
            <p>Master JavaScript, HTML, CSS, and programming fundamentals through interactive challenges and quests.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🎮</div>
            <h3>Story-Driven Gameplay</h3>
            <p>Follow a narrative through LA's tech scene—from Venice Beach startups to DTLA enterprise offices.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>Device Progression</h3>
            <p>Upgrade from flip phones to flagship smartphones, unlocking new capabilities and coding challenges.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3>Career Skills</h3>
            <p>Explore tech career paths, learn industry skills, and build knowledge that transfers to real jobs.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🏆</div>
            <h3>Progress Tracking</h3>
            <p>Monitor your WPM growth, accuracy improvements, and skill development over time.</p>
          </div>
        </div>
      </section>

      <section class="how-it-works-section">
        <h2>How It Works</h2>
        <div class="steps-grid">
          <div class="step">
            <div class="step-number">1</div>
            <h3>Start Your Journey</h3>
            <p>Begin in LA with a basic flip phone. Learn the ropes through tutorial missions.</p>
          </div>
          
          <div class="step">
            <div class="step-number">2</div>
            <h3>Battle with Code</h3>
            <p>Type code patterns to defeat enemies, complete quests, and progress through the story.</p>
          </div>
          
          <div class="step">
            <div class="step-number">3</div>
            <h3>Upgrade Your Gear</h3>
            <p>Earn coins to upgrade devices, unlocking better typing capabilities and advanced challenges.</p>
          </div>
          
          <div class="step">
            <div class="step-number">4</div>
            <h3>Build Real Skills</h3>
            <p>Develop typing speed, coding knowledge, and career-ready technical abilities.</p>
          </div>
        </div>
        <div class="cta-center">
          <a href="#/play" class="btn btn-primary btn-large">Start Playing Now</a>
        </div>
      </section>

      <section class="blog-preview-section">
        <div class="section-header">
          <h2>Latest from the Blog</h2>
          <a href="#/blog" class="view-all-link">View All Articles →</a>
        </div>
        
        <div class="blog-grid">
          ${recentPosts.map(post => `
            <article class="blog-card">
              <div class="blog-card-content">
                <div class="blog-meta">
                  <span class="blog-category">${post.categories[0]}</span>
                  <time datetime="${post.publishedDate}">${formatDate(post.publishedDate)}</time>
                </div>
                <h3><a href="#/blog/${post.slug}">${post.title}</a></h3>
                <p>${post.description}</p>
                <a href="#/blog/${post.slug}" class="read-more">Read More →</a>
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="careers-preview-section">
        <h2>Explore Tech Career Paths</h2>
        <p class="section-intro">
          Discover what it takes to succeed in different tech roles. Learn about skills, salaries, and career progression.
        </p>
        <div class="career-preview-grid">
          <a href="#/careers/frontend-developer" class="career-preview-card">
            <h3>Frontend Developer</h3>
            <p>Build user interfaces with HTML, CSS, and JavaScript</p>
            <span class="salary">$75k - $120k</span>
          </a>
          <a href="#/careers/full-stack-developer" class="career-preview-card">
            <h3>Full Stack Developer</h3>
            <p>Master both frontend and backend development</p>
            <span class="salary">$85k - $150k</span>
          </a>
          <a href="#/careers" class="career-preview-card view-all-card">
            <h3>View All Careers →</h3>
            <p>Explore all tech career paths and find your fit</p>
          </a>
        </div>
      </section>

      <section class="final-cta-section">
        <div class="final-cta-content">
          <h2>Ready to Level Up Your Skills?</h2>
          <p>Join thousands of players building typing speed and coding knowledge through gameplay.</p>
          <a href="#/play" class="btn btn-primary btn-large">Play BrokeCoder Free</a>
        </div>
      </section>
    </div>
  `;

  renderPage('home', { content });
  
  updateSEO({
    title: 'BrokeCoder - Learn Typing & Coding Through Gaming',
    description: 'Master typing and coding skills through an immersive browser-based RPG. Navigate LA\'s digital jungle while building real-world tech career skills.',
    path: '/',
    keywords: 'typing game, learn to code, coding game, typing RPG, programming tutorial, tech careers, JavaScript tutorial, typing practice',
    type: 'website'
  });

  addStructuredData(generateVideoGameSchema());
}

/**
 * Play page - launches the game
 */
export function renderPlay() {
  showGameScreen();
  try { window.bcTrack && window.bcTrack('play_click', { source: 'route' }); } catch {}
  
  updateSEO({
    title: 'Play BrokeCoder - Typing RPG Game',
    description: 'Play BrokeCoder now! An immersive typing RPG where you learn coding while navigating LA\'s tech scene.',
    path: '/play',
    type: 'website'
  });
}

/**
 * Blog list page
 */
export function renderBlogList() {
  const posts = getAllBlogPosts();
  
  const content = `
    <div class="blog-page">
      <header class="page-header">
        <h1>Blog</h1>
        <p class="page-description">
          Articles about typing, coding, tech careers, and game strategies to help you level up.
        </p>
      </header>

      <div class="blog-list">
        ${posts.map(post => `
          <article class="blog-list-item">
            <div class="blog-list-meta">
              <span class="blog-category">${post.categories.join(', ')}</span>
              <time datetime="${post.publishedDate}">${formatDate(post.publishedDate)}</time>
            </div>
            <h2><a href="#/blog/${post.slug}">${post.title}</a></h2>
            <p class="blog-excerpt">${post.description}</p>
            <div class="blog-tags">
              ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="#/blog/${post.slug}" class="read-more-link">Read Article →</a>
          </article>
        `).join('')}
      </div>
      ${renderExploreMore(getFeaturedExploreLinks('blog'))}
    </div>
  `;

  renderPage('blog', { content });
  
  updateSEO({
    title: 'Blog - BrokeCoder',
    description: 'Learn about typing speed, coding tutorials, tech careers, and gaming strategies. Articles to help you master BrokeCoder and build real skills.',
    path: '/blog',
    type: 'website'
  });
}

/**
 * Blog post page
 */
export function renderBlogPost(slug) {
  const post = getBlogPost(slug);
  
  if (!post) {
    router.show404();
    return;
  }

  const related = getRelatedContent(post.tags, slug, 'blog', 5);
  const author = post.author || DEFAULT_AUTHOR;
  const updatedDate = post.updatedDate || post.publishedDate;
  const adSlots = ENABLE_AD_SLOTS ? {
    intro: renderAdSlot('Reserved ad slot (intro)'),
    mid: renderAdSlot('Reserved ad slot (mid-article)'),
    end: renderAdSlot('Reserved ad slot (post-end)')
  } : { intro: '', mid: '', end: '' };
  
  const content = `
    <article class="blog-post">
      <header class="post-header">
        <div class="post-meta">
          <span class="post-category">${post.categories.join(', ')}</span>
          <time datetime="${post.publishedDate}">${formatDate(post.publishedDate)}</time>
          ${updatedDate ? `<span class="post-updated">Updated: ${formatDate(updatedDate)}</span>` : ''}
        </div>
        <h1>${post.title}</h1>
        <p class="post-description">${post.description}</p>
        <div class="post-tags">
          ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </header>

      <div class="post-byline">
        <div class="byline-text">
          <div class="byline-name">By ${author.name}</div>
          <div class="byline-meta">Last updated ${formatDate(updatedDate)}</div>
          <p class="byline-bio">${author.bio}</p>
        </div>
      </div>

      ${adSlots.intro}

      <div class="post-content prose">
        ${markdownToHTML(post.body)}
      </div>

      ${adSlots.mid}

      ${related.length > 0 ? `
        <aside class="related-posts">
          <h3>Related Articles</h3>
          <div class="related-grid">
            ${related.map(relatedPost => `
              <a href="#/blog/${relatedPost.slug}" class="related-card">
                <h4>${relatedPost.title}</h4>
                <p>${relatedPost.description}</p>
              </a>
            `).join('')}
          </div>
        </aside>
      ` : ''}

      ${adSlots.end}

      <div class="post-cta">
        <h3>Ready to practice what you learned?</h3>
        <a href="#/play" class="btn btn-primary">Play BrokeCoder Now</a>
      </div>
      ${renderExploreMore(
        mergeAndCapLinks([
          related.map(p => ({ title: p.title, href: `#/blog/${p.slug}`, desc: p.description })),
          getCrossTypeExploreLinks(post.tags)
        ], EXPLORE_LINK_TARGET)
      )}
    </article>
  `;

  renderPage('blog-post', { content });
  
  updateSEO({
    title: `${post.title} | BrokeCoder Blog`,
    description: post.description,
    path: `/blog/${slug}`,
    type: 'article',
    publishedTime: post.publishedDate,
    modifiedTime: updatedDate,
    tags: post.tags,
    image: post.heroImage || '/media/game/brokecoder-og.png'
  });

  addStructuredData(generateBlogPostSchema(post));
}

/**
 * Careers list page
 */
export async function renderCareersList() {
  await loadCareerManifest();
  const careers = getAllCareerSummaries();
  
  const content = `
    <div class="careers-page">
      <header class="page-header">
        <h1>Tech Career Paths</h1>
        <p class="page-description">
          Explore different tech careers, learn about required skills, salary expectations, and find your path in the industry.
        </p>
      </header>

      <div class="careers-grid">
        ${careers.map(career => `
          <article class="career-card">
            <h2><a href="#/careers/${career.slug}">${career.title.replace(' Career Path', '')}</a></h2>
            <p class="career-description">${career.description || ''}</p>
            ${career.updated ? `<div class="career-details"><div class="career-detail"><strong>Updated:</strong> ${career.updated}</div></div>` : ''}
            <a href="#/careers/${career.slug}" class="career-link">Explore Career →</a>
          </article>
        `).join('')}
      </div>
      ${renderExploreMore(getFeaturedExploreLinks('careers'))}
    </div>
  `;

  renderPage('careers', { content });
  
  updateSEO({
    title: 'Tech Career Paths - BrokeCoder',
    description: 'Explore tech career options: frontend, backend, full stack developer and more. Learn skills, salaries, and how to break into tech.',
    path: '/careers',
    type: 'website'
  });
}

/**
 * Career detail page
 */
export async function renderCareerDetail(slug) {
  let career = getCareer(slug);

  // If not found in JS content, try loading from markdown file
  if (!career) {
    const mdDoc = await fetchCareerMarkdown(slug);
    if (!mdDoc) {
      router.show404();
      return;
    }

    // Map markdown doc to career-like object for rendering
    career = {
      slug: mdDoc.frontmatter.slug || slug,
      title: mdDoc.frontmatter.title || 'Career',
      description: mdDoc.frontmatter.description || '',
      publishedDate: mdDoc.frontmatter.updated || new Date().toISOString(),
      updatedDate: mdDoc.frontmatter.updated || new Date().toISOString(),
      categories: mdDoc.frontmatter.tags || ['careers'],
      tags: mdDoc.frontmatter.tags || [],
      averageSalary: mdDoc.frontmatter.averageSalary || '',
      experienceLevel: mdDoc.frontmatter.experienceLevel || '',
      requiredSkills: [],
      relatedSkills: [],
      relatedCareers: [],
      body: mdDoc.content
    };
  }

  const relatedSkills = career.relatedSkills?.map(getSkill).filter(Boolean) || [];
  const relatedCareers = career.relatedCareers?.map(getCareer).filter(Boolean) || [];
  
  const content = `
    <article class="career-detail">
      <header class="career-header">
        <h1>${career.title}</h1>
        <p class="career-intro">${career.description}</p>
        
        <div class="career-stats">
          <div class="career-stat">
            <strong>Average Salary</strong>
            <span>${career.averageSalary}</span>
          </div>
          <div class="career-stat">
            <strong>Experience Level</strong>
            <span>${career.experienceLevel}</span>
          </div>
          <div class="career-stat">
            <strong>Required Skills</strong>
            <span>${career.requiredSkills.slice(0, 3).join(', ')}</span>
          </div>
        </div>
      </header>

      <div class="career-content prose">
        ${markdownToHTML(career.body)}
      </div>

      ${relatedSkills.length > 0 ? `
        <aside class="related-section">
          <h3>Essential Skills for This Career</h3>
          <div class="related-grid">
            ${relatedSkills.map(skill => `
              <a href="#/skills/${skill.slug}" class="related-card">
                <h4>${skill.title}</h4>
                <p>${skill.description}</p>
                <span class="skill-time">⏱️ ${skill.timeToLearn}</span>
              </a>
            `).join('')}
          </div>
        </aside>
      ` : ''}

      ${relatedCareers.length > 0 ? `
        <aside class="related-section">
          <h3>Related Career Paths</h3>
          <div class="related-grid">
            ${relatedCareers.map(relCareer => `
              <a href="#/careers/${relCareer.slug}" class="related-card">
                <h4>${relCareer.title.replace(' Career Path', '')}</h4>
                <p>${relCareer.description}</p>
                <span class="career-salary">💰 ${relCareer.averageSalary}</span>
              </a>
            `).join('')}
          </div>
        </aside>
      ` : ''}

      <div class="career-cta">
        <h3>Build the skills you need</h3>
        <p>Practice typing and coding patterns relevant to this career path.</p>
        <a href="#/play" class="btn btn-primary">Start Playing BrokeCoder</a>
      </div>
      ${renderExploreMore(
        mergeAndCapLinks([
          relatedSkills.map(s => ({ title: s.title, href: `#/skills/${s.slug}`, desc: s.description })),
          relatedCareers.map(c => ({ title: c.title.replace(' Career Path',''), href: `#/careers/${c.slug}`, desc: c.description })),
          getFeaturedExploreLinks('careers')
        ], EXPLORE_LINK_TARGET)
      )}
    </article>
  `;

  renderPage('career-detail', { content });
  
  updateSEO({
    title: `${career.title} | BrokeCoder Careers`,
    description: career.description,
    path: `/careers/${slug}`,
    type: 'article',
    publishedTime: career.publishedDate,
    modifiedTime: career.updatedDate,
    tags: career.tags
  });
}

/**
 * Skills list page
 */
export function renderSkillsList() {
  const skills = getAllSkills();
  
  const content = `
    <div class="skills-page">
      <header class="page-header">
        <h1>Programming Skills</h1>
        <p class="page-description">
          Master the essential skills needed for a tech career. From JavaScript fundamentals to advanced frameworks.
        </p>
      </header>

      <div class="skills-grid">
        ${skills.map(skill => `
          <article class="skill-card">
            <div class="skill-card-header">
              <h2><a href="#/skills/${skill.slug}">${skill.title}</a></h2>
              <span class="skill-difficulty">${skill.difficulty}</span>
            </div>
            <p class="skill-description">${skill.description}</p>
            <div class="skill-meta">
              <span class="skill-time">⏱️ ${skill.timeToLearn}</span>
              <span class="skill-category">${skill.categories.join(', ')}</span>
            </div>
            <a href="#/skills/${skill.slug}" class="skill-link">Learn More →</a>
          </article>
        `).join('')}
      </div>
      ${renderExploreMore(getFeaturedExploreLinks('skills'))}
    </div>
  `;

  renderPage('skills', { content });
  
  updateSEO({
    title: 'Programming Skills - BrokeCoder',
    description: 'Learn essential programming skills: JavaScript, React, TypeScript, and more. Detailed guides for developers at all levels.',
    path: '/skills',
    type: 'website'
  });
}

/**
 * Skill detail page
 */
export function renderSkillDetail(slug) {
  const skill = getSkill(slug);
  
  if (!skill) {
    router.show404();
    return;
  }

  const relatedCareers = skill.relatedCareers?.map(getCareer).filter(Boolean) || [];
  
  const content = `
    <article class="skill-detail">
      <header class="skill-header">
        <div class="skill-meta-header">
          <span class="skill-difficulty-badge">${skill.difficulty}</span>
          <span class="skill-time-badge">⏱️ ${skill.timeToLearn}</span>
        </div>
        <h1>${skill.title}</h1>
        <p class="skill-intro">${skill.description}</p>
      </header>

      <div class="skill-content prose">
        ${markdownToHTML(skill.body)}
      </div>

      ${relatedCareers.length > 0 ? `
        <aside class="related-section">
          <h3>Careers Using This Skill</h3>
          <div class="related-grid">
            ${relatedCareers.map(career => `
              <a href="#/careers/${career.slug}" class="related-card">
                <h4>${career.title.replace(' Career Path', '')}</h4>
                <p>${career.description}</p>
                <span class="career-salary">💰 ${career.averageSalary}</span>
              </a>
            `).join('')}
          </div>
        </aside>
      ` : ''}

      <div class="skill-cta">
        <h3>Practice this skill in BrokeCoder</h3>
        <p>Build muscle memory and typing speed while learning ${skill.title}.</p>
        <a href="#/play" class="btn btn-primary">Start Playing</a>
      </div>
      ${renderExploreMore(
        mergeAndCapLinks([
          (skill.relatedCareers || []).map(rc => {
            const c = getCareer(rc);
            return c ? { title: c.title.replace(' Career Path',''), href: `#/careers/${c.slug}`, desc: c.description } : null;
          }).filter(Boolean),
          getFeaturedExploreLinks('skills')
        ], EXPLORE_LINK_TARGET)
      )}
    </article>
  `;

  renderPage('skill-detail', { content });
  
  updateSEO({
    title: `${skill.title} | BrokeCoder Skills`,
    description: skill.description,
    path: `/skills/${slug}`,
    type: 'article',
    publishedTime: skill.publishedDate,
    modifiedTime: skill.updatedDate,
    tags: skill.tags
  });
}

/**
 * Devices list page
 */
export function renderDevicesList() {
  const devices = getAllDevices();
  
  const content = `
    <div class="devices-page">
      <header class="page-header">
        <h1>Device Progression</h1>
        <p class="page-description">
          Upgrade your gear from flip phones to flagship smartphones. Each device unlocks new challenges and capabilities.
        </p>
      </header>

      <div class="devices-grid">
        ${devices.map(device => `
          <article class="device-card">
            <div class="device-card-header">
              <h2><a href="#/devices/${device.slug}">${device.title}</a></h2>
              <span class="device-tier">${device.deviceTier}</span>
            </div>
            <p class="device-description">${device.description}</p>
            <div class="device-meta">
              <span>📱 Season ${device.seasonNumber}</span>
            </div>
            <a href="#/devices/${device.slug}" class="device-link">View Guide →</a>
          </article>
        `).join('')}
      </div>
      ${renderExploreMore(getFeaturedExploreLinks('devices'))}
    </div>
  `;

  renderPage('devices', { content });
  
  updateSEO({
    title: 'Device Progression Guide - BrokeCoder',
    description: 'Learn about device upgrades in BrokeCoder. From flip phones to smartphones, each tier unlocks new coding challenges.',
    path: '/devices',
    type: 'website'
  });
}

/**
 * Device detail page
 */
export function renderDeviceDetail(slug) {
  const device = getDevice(slug);
  
  if (!device) {
    router.show404();
    return;
  }

  const content = `
    <article class="device-detail">
      <header class="device-header">
        <div class="device-meta-header">
          <span class="device-season-badge">Season ${device.seasonNumber}</span>
          <span class="device-tier-badge">${device.deviceTier}</span>
        </div>
        <h1>${device.title}</h1>
        <p class="device-intro">${device.description}</p>
      </header>

      <div class="device-content prose">
        ${markdownToHTML(device.body)}
      </div>

      <div class="device-cta">
        <h3>Experience the Phone Era</h3>
        <p>Start your journey and unlock all device tiers in Season 1.</p>
        <a href="#/play" class="btn btn-primary">Play Now</a>
      </div>
      ${renderExploreMore(
        mergeAndCapLinks([
          getFeaturedExploreLinks('devices'),
          getFeaturedExploreLinks('skills')
        ], EXPLORE_LINK_TARGET)
      )}
    </article>
  `;

  renderPage('device-detail', { content });
  
  updateSEO({
    title: `${device.title} | BrokeCoder`,
    description: device.description,
    path: `/devices/${slug}`,
    type: 'article',
    publishedTime: device.publishedDate,
    modifiedTime: device.updatedDate,
    tags: device.tags
  });
}

/**
 * About page
 */
export function renderAbout() {
  const content = `
    <div class="about-page prose">
      <h1>About BrokeCoder</h1>
      
      <p class="lead">
        BrokeCoder (brokercoder.cloud) is a browser-based typing RPG that makes learning to code fun and engaging. 
        We believe that the best way to build skills is through practice disguised as play.
      </p>

      <h2>Our Mission</h2>
      <p>
        Too many aspiring developers quit before they've built the muscle memory and foundational 
        skills needed to succeed. Traditional typing tutors are boring. Coding tutorials often lack 
        context. We're solving both problems.
      </p>

      <h2>What Makes BrokeCoder Different?</h2>
      <ul>
        <li><strong>Code-Specific Training:</strong> Practice the special characters, syntax patterns, 
        and keyboard shortcuts that actually matter for programming</li>
        <li><strong>Story-Driven Learning:</strong> Follow a narrative that teaches real concepts about 
        the tech industry, career paths, and professional development</li>
        <li><strong>Progressive Difficulty:</strong> Start simple and build up to complex challenges that 
        match real coding scenarios</li>
        <li><strong>Completely Free:</strong> No paywalls, no subscriptions. We believe education should 
        be accessible.</li>
      </ul>

      <h2>Who Is This For?</h2>
      <ul>
        <li>Aspiring developers looking to improve typing speed and accuracy</li>
        <li>Self-taught programmers building foundational skills</li>
        <li>Bootcamp students wanting extra practice</li>
        <li>Career changers exploring tech careers</li>
        <li>Anyone who wants to make coding practice more enjoyable</li>
      </ul>

      <h2>The Story</h2>
      <p>
        BrokeCoder started as a side project to help friends transitioning into tech careers. 
        We noticed that typing speed was a hidden bottleneck—people knew what code to write but 
        couldn't type it efficiently. We built a game to fix that.
      </p>

      <p>
        As we developed it, we realized we could teach more than just typing. The game became a 
        vehicle for exploring career paths, explaining industry concepts, and building confidence 
        in people who thought tech wasn't for them.
      </p>

      <h2>Season 1: The Phone Era</h2>
      <p>
        The current season follows a broke coder navigating LA's tech scene armed with nothing but 
        a basic phone. As you progress, you upgrade devices, unlock new challenges, and build the 
        skills that translate directly to real development work.
      </p>

      <h2>What's Next?</h2>
      <p>
        We're constantly adding new content, challenges, and career path guides. Season 2 will introduce 
        the Laptop Era with more advanced programming concepts, team collaboration scenarios, and 
        deeper technical challenges.
      </p>

      <h2>Editorial Policy</h2>
      <p>
        Our content is written and reviewed by the BrokeCoder Team with a focus on accuracy, clarity, and beginner-friendly language.
        We avoid hype, disclose limitations, and update articles when tools or techniques change. If we ever publish sponsored or affiliate content, we will label it clearly.
      </p>

      <h2>Contact Us</h2>
      <p>
        Have feedback? Found a bug? Want to contribute content? 
        <a href="#/contact">Get in touch</a>.
      </p>

      <div class="about-cta">
        <h3>Ready to start your journey?</h3>
        <a href="#/play" class="btn btn-primary btn-large">Play BrokeCoder Free</a>
      </div>
    </div>
  `;

  renderPage('about', { content });
  
  updateSEO({
    title: 'About BrokeCoder - Our Mission & Story',
    description: 'Learn about BrokeCoder: a free browser-based typing RPG that helps aspiring developers build coding skills through engaging gameplay.',
    path: '/about',
    type: 'website'
  });
}

/**
 * How It Works page
 */
export function renderHowItWorks() {
  const content = `
    <div class="how-it-works-page">
      <header class="page-header">
        <h1>How BrokeCoder Works</h1>
        <p class="page-description">
          Learn the mechanics of the game and how it helps you build real coding skills.
        </p>
      </header>

      <section class="how-section">
        <h2>The Basics</h2>
        <div class="how-grid">
          <div class="how-card">
            <h3>⌨️ Type to Battle</h3>
            <p>
              Enemies and challenges require you to type code patterns accurately and quickly. 
              Your WPM and accuracy determine your success in battles and quests.
            </p>
          </div>
          
          <div class="how-card">
            <h3>📈 Progress Through Seasons</h3>
            <p>
              Season 1 is the Phone Era. Start with a flip phone and work your way up to flagship 
              smartphones, unlocking new abilities and challenges with each upgrade.
            </p>
          </div>
          
          <div class="how-card">
            <h3>💰 Earn & Upgrade</h3>
            <p>
              Complete missions and challenges to earn coins. Use coins to purchase better devices, 
              unlock new areas, and access advanced content.
            </p>
          </div>
        </div>
      </section>

      <section class="how-section">
        <h2>What You'll Learn</h2>
        <div class="learning-points">
          <div class="learning-point">
            <h3>Typing Speed & Accuracy</h3>
            <p>
              Build muscle memory for programming-specific patterns: brackets, operators, common 
              keywords, and special characters. Unlike generic typing tutors, every challenge uses 
              real code syntax.
            </p>
          </div>
          
          <div class="learning-point">
            <h3>Programming Fundamentals</h3>
            <p>
              Learn JavaScript, HTML, CSS, and programming concepts through context. Each challenge 
              introduces real code that does something meaningful, not random strings.
            </p>
          </div>
          
          <div class="learning-point">
            <h3>Career Knowledge</h3>
            <p>
              The story and quests expose you to different tech roles, industry terminology, and 
              career paths. Learn what frontend, backend, and full stack developers actually do.
            </p>
          </div>
          
          <div class="learning-point">
            <h3>Problem-Solving Patterns</h3>
            <p>
              Encounter debugging scenarios, optimization challenges, and architectural decisions 
              that mirror real development work.
            </p>
          </div>
        </div>
      </section>

      <section class="how-section">
        <h2>Progression Path</h2>
        <div class="progression-timeline">
          <div class="timeline-item">
            <div class="timeline-marker">1</div>
            <div class="timeline-content">
              <h3>Tutorial (30 mins)</h3>
              <p>Learn controls, basic typing mechanics, and the story setup. Meet your first characters.</p>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-marker">2</div>
            <div class="timeline-content">
              <h3>Early Game (5-10 hours)</h3>
              <p>Build typing speed, complete simple quests, earn your first device upgrade. Focus on accuracy.</p>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-marker">3</div>
            <div class="timeline-content">
              <h3>Mid Game (10-25 hours)</h3>
              <p>Unlock advanced challenges, tackle complex code patterns, explore career paths, join guild activities.</p>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-marker">4</div>
            <div class="timeline-content">
              <h3>End Game (25+ hours)</h3>
              <p>Master the hardest challenges, unlock all devices, complete Season 1 story, prepare for Season 2.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="how-section">
        <h2>Tips for Success</h2>
        <div class="tips-grid">
          <div class="tip-card">
            <h4>Start Slow</h4>
            <p>Focus on accuracy first. Speed comes naturally with practice. A 95%+ accuracy rate is your goal.</p>
          </div>
          
          <div class="tip-card">
            <h4>Daily Practice</h4>
            <p>15-30 minutes per day is more effective than occasional long sessions. Build consistent habits.</p>
          </div>
          
          <div class="tip-card">
            <h4>Learn Finger Positioning</h4>
            <p>Keep fingers on home row (ASDF JKL;). Use the correct finger for each key. It feels slow at first but pays off.</p>
          </div>
          
          <div class="tip-card">
            <h4>Challenge Yourself</h4>
            <p>Don't just repeat easy missions. Push into harder content when ready. Discomfort means growth.</p>
          </div>
          
          <div class="tip-card">
            <h4>Track Progress</h4>
            <p>Check your stats regularly. Celebrate WPM milestones. Notice patterns in your errors and work on them.</p>
          </div>
          
          <div class="tip-card">
            <h4>Apply in Real Life</h4>
            <p>Use what you learn in actual coding. The patterns transfer directly to IDEs and code editors.</p>
          </div>
        </div>
      </section>

      <section class="how-section">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-list">
          <div class="faq-item">
            <h3>Is it really free?</h3>
            <p>Yes. No paywalls, no subscriptions, no ads. Completely free.</p>
          </div>
          
          <div class="faq-item">
            <h3>Do I need coding experience?</h3>
            <p>No! The game teaches from scratch. If you can type, you can play.</p>
          </div>
          
          <div class="faq-item">
            <h3>How long does Season 1 take?</h3>
            <p>20-40 hours depending on your play style. Speed-runners finish in ~10 hours.</p>
          </div>
          
          <div class="faq-item">
            <h3>Can I save my progress?</h3>
            <p>Yes. Progress is saved to browser local storage. You can continue where you left off.</p>
          </div>
          
          <div class="faq-item">
            <h3>Will this actually help my coding career?</h3>
            <p>
              Yes. Typing speed is a often-overlooked bottleneck for developers. The patterns you learn 
              (brackets, operators, common keywords) transfer directly to professional work. Plus, you'll 
              gain familiarity with JavaScript, HTML, CSS, and industry concepts.
            </p>
          </div>
        </div>
      </section>

      <div class="how-cta">
        <h2>Ready to start?</h2>
        <p>Jump into Season 1 and begin your journey from broke coder to tech professional.</p>
        <a href="#/play" class="btn btn-primary btn-large">Play BrokeCoder Now</a>
      </div>
    </div>
  `;

  renderPage('how-it-works', { content });
  
  updateSEO({
    title: 'How It Works - BrokeCoder Game Guide',
    description: 'Learn how to play BrokeCoder: mechanics, progression, tips for success, and how the game builds real coding skills.',
    path: '/how-it-works',
    type: 'website'
  });
}

/**
 * FAQ page
 */
export function renderFAQ() {
  const faqs = [
    {
      question: "Is BrokeCoder really free?",
      answer: "Yes! BrokeCoder is completely free with no paywalls, subscriptions, or ads. We believe accessible education benefits everyone."
    },
    {
      question: "Do I need programming experience to play?",
      answer: "No! BrokeCoder is designed for complete beginners. The game teaches programming concepts from scratch through interactive challenges. If you can type, you can play."
    },
    {
      question: "How long does it take to complete Season 1?",
      answer: "Most players complete Season 1 in 20-40 hours depending on play style. Speed-runners can finish in about 10 hours, while completionists might spend 50+ hours exploring everything."
    },
    {
      question: "Will this actually improve my coding skills?",
      answer: "Yes! BrokeCoder builds typing speed and accuracy for programming-specific patterns (brackets, operators, syntax). You'll also learn JavaScript, HTML, CSS fundamentals, and gain familiarity with industry concepts. Many players report improved WPM and better code retention."
    },
    {
      question: "Can I save my progress?",
      answer: "Yes. Your progress is automatically saved to your browser's local storage. You can close the game and continue where you left off anytime."
    },
    {
      question: "What typing speed should I aim for?",
      answer: "For general coding work, 60-70 WPM with 95%+ accuracy is excellent. Professional developers typically type 70-90 WPM. Start by focusing on accuracy—speed will come naturally with practice."
    },
    {
      question: "Which browser works best?",
      answer: "BrokeCoder works on all modern browsers (Chrome, Firefox, Safari, Edge). Chrome and Edge generally provide the smoothest experience."
    },
    {
      question: "Can I play on mobile?",
      answer: "Season 1 (Phone Era) is optimized for desktop browsers. Mobile support is limited currently but planned for future updates."
    },
    {
      question: "What happens after Season 1?",
      answer: "Season 2 (Laptop Era) is in development! It will feature more advanced programming concepts, team collaboration scenarios, and deeper technical challenges. Players who complete Season 1 get special bonuses in Season 2."
    },
    {
      question: "How do I report bugs or give feedback?",
      answer: "Use the contact page to send feedback, report bugs, or suggest features. We actively read and respond to all submissions."
    },
    {
      question: "Are there multiplayer features?",
      answer: "Not yet. Season 1 is single-player, but we're exploring multiplayer typing battles and cooperative challenges for future updates."
    },
    {
      question: "Can I use a mechanical keyboard?",
      answer: "Absolutely! Many players prefer mechanical keyboards for the tactile feedback. Use whatever keyboard helps you type best."
    }
  ];

  const content = `
    <div class="faq-page">
      <header class="page-header">
        <h1>Frequently Asked Questions</h1>
        <p class="page-description">
          Common questions about BrokeCoder, gameplay, and how it helps you learn coding.
        </p>
      </header>

      <div class="faq-list">
        ${faqs.map(faq => `
          <div class="faq-item">
            <h2 class="faq-question">${faq.question}</h2>
            <div class="faq-answer">
              <p>${faq.answer}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="faq-cta">
        <h2>Still have questions?</h2>
        <p>Contact us or jump in and try the game yourself!</p>
        <div class="cta-buttons">
          <a href="#/contact" class="btn btn-secondary">Contact Us</a>
          <a href="#/play" class="btn btn-primary">Play Now</a>
        </div>
      </div>
    </div>
  `;

  renderPage('faq', { content });
  
  updateSEO({
    title: 'FAQ - Frequently Asked Questions | BrokeCoder',
    description: 'Get answers to common questions about BrokeCoder: gameplay, features, learning outcomes, and technical requirements.',
    path: '/faq',
    type: 'website'
  });

  addStructuredData(generateFAQSchema(faqs));
}

export function renderTypingHub() {
  const links = mergeAndCapLinks([
    getFeaturedExploreLinks('blog'),
    getFeaturedExploreLinks('skills')
  ], EXPLORE_LINK_TARGET + 4);
  const content = `
    <div class="pillar-page">
      <header class="page-header">
        <h1>Typing Hub: Master Speed & Accuracy</h1>
        <p class="page-description">Curated guides to build programming-specific typing: brackets, operators, syntax, shortcuts, and speed without sacrificing accuracy.</p>
      </header>
      <section class="pillar-intro prose">
        <p>Typing for programmers is different from normal typing. You need precision with special characters, consistent finger positioning, and muscle memory for real code patterns. This hub organizes beginner → intermediate → expert pathways to help you practice what matters.</p>
        <h2>What You'll Learn</h2>
        <ul>
          <li>Special characters and bracket fluency</li>
          <li>Accuracy-first drills and speed building</li>
          <li>Syntax patterns that transfer to real code</li>
          <li>Keyboard shortcuts to reduce friction</li>
        </ul>
      </section>
      ${renderExploreGrid(links)}
    </div>
  `;
  renderPage('pillar-typing', { content });
  updateSEO({ title: 'Typing Hub: Speed & Accuracy for Coders', description: 'Learn programming-specific typing with curated guides and lessons to increase dwell time and page depth.', path: '/learn-typing', type: 'website' });
  addStructuredData(generateWebsiteSchema());
}

export function renderJavaScriptHub() {
  const links = mergeAndCapLinks([
    getFeaturedExploreLinks('skills'),
    getFeaturedExploreLinks('blog')
  ], EXPLORE_LINK_TARGET + 4);
  const content = `
    <div class="pillar-page">
      <header class="page-header">
        <h1>JavaScript Hub: Learn by Doing</h1>
        <p class="page-description">Beginner → intermediate → expert pathways across JS fundamentals, DOM, async, debugging, and framework readiness.</p>
      </header>
      <section class="pillar-intro prose">
        <p>JavaScript is the language of the web. This hub focuses on hands-on practice with concepts you’ll use daily: variables, functions, DOM manipulation, async patterns, and practical debugging.</p>
        <h2>Pathways</h2>
        <ul>
          <li>Foundations: variables, types, operators, control flow</li>
          <li>DOM: querying, events, state, rendering patterns</li>
          <li>Async: promises, async/await, error handling</li>
          <li>Preparation: clean code, debugging, documentation habits</li>
        </ul>
      </section>
      ${renderExploreGrid(links)}
    </div>
  `;
  renderPage('pillar-javascript', { content });
  updateSEO({ title: 'JavaScript Hub: Beginner to Advanced', description: 'Layered content depth and pathways to practice JavaScript skills with BrokeCoder.', path: '/learn-javascript', type: 'website' });
  addStructuredData(generateWebsiteSchema());
}

export function renderCareersHub() {
  const links = mergeAndCapLinks([
    getFeaturedExploreLinks('careers'),
    getFeaturedExploreLinks('skills')
  ], EXPLORE_LINK_TARGET + 6);
  const content = `
    <div class="pillar-page">
      <header class="page-header">
        <h1>Careers Hub: Choose Your Path</h1>
        <p class="page-description">Explore role overviews, required skills, and practical roadmaps to break into tech.</p>
      </header>
      ${renderExploreGrid(links)}
    </div>
  `;
  renderPage('pillar-careers', { content });
  updateSEO({ title: 'Careers Hub: Tech Career Paths', description: 'Hub-and-spoke career guides with internal linking to increase pages per session.', path: '/careers-hub', type: 'website' });
  addStructuredData(generateWebsiteSchema());
}

export function renderDevicesHub() {
  const links = mergeAndCapLinks([
    getFeaturedExploreLinks('devices'),
    getFeaturedExploreLinks('blog')
  ], EXPLORE_LINK_TARGET + 4);
  const content = `
    <div class="pillar-page">
      <header class="page-header">
        <h1>Devices Hub: Progression & Upgrades</h1>
        <p class="page-description">Guides for Season 1 device tiers and how upgrades unlock new challenges.</p>
      </header>
      ${renderExploreGrid(links)}
    </div>
  `;
  renderPage('pillar-devices', { content });
  updateSEO({ title: 'Devices Hub: Progression Guides', description: 'Centralized device progression resources with pathways to relevant content.', path: '/devices-hub', type: 'website' });
  addStructuredData(generateWebsiteSchema());
}

export function renderGameGuide() {
  const links = mergeAndCapLinks([
    getFeaturedExploreLinks('blog'),
    getFeaturedExploreLinks('devices'),
    getFeaturedExploreLinks('skills')
  ], EXPLORE_LINK_TARGET + 6);
  const content = `
    <div class="pillar-page">
      <header class="page-header">
        <h1>Game Guide: How to Master BrokeCoder</h1>
        <p class="page-description">All-in-one guide to story, missions, device upgrades, and skill-building.</p>
      </header>
      ${renderExploreGrid(links)}
    </div>
  `;
  renderPage('pillar-game-guide', { content });
  updateSEO({ title: 'Game Guide: BrokeCoder', description: 'Engagement-first guide designed to increase dwell time and page depth.', path: '/game-guide', type: 'website' });
  addStructuredData(generateWebsiteSchema());
}

export function renderToolsIndex() {
  const content = `
    <div class="tools-page">
      <header class="page-header">
        <h1>Tools</h1>
        <p class="page-description">Interactive tools to plan your learning and practice smarter.</p>
      </header>

      <div class="explore-grid">
        <a href="#/tools/typing-practice-planner" class="explore-card">
          <h3>Typing Practice Planner</h3>
          <p>Estimate weeks to reach your target WPM with accuracy‑first guidance.</p>
        </a>
        <a href="#/tools/js-learning-path-estimator" class="explore-card">
          <h3>JavaScript Learning Path Estimator</h3>
          <p>Generate a weekly plan based on hours/week and focus areas.</p>
        </a>
      </div>

      <div class="cta-center">
        <a href="#/play" class="btn btn-primary btn-large">Practice in BrokeCoder</a>
      </div>
    </div>
  `;

  renderPage('tools-index', { content });

  updateSEO({
    title: 'Tools Index - BrokeCoder',
    description: 'Explore BrokeCoder’s interactive tools for typing and JavaScript learning plans.',
    path: '/tools',
    type: 'website'
  });
}

export function renderTypingPracticePlanner() {
  const content = `
    <div class="tool-page">
      <header class="page-header">
        <h1>Typing Practice Planner</h1>
        <p class="page-description">Estimate time to reach your target WPM with accuracy-first guidance.</p>
      </header>

      <div class="tool-grid">
        <section class="tool-inputs">
          <label class="field">Current WPM
            <input id="tp-current-wpm" type="number" min="10" max="120" value="40" />
          </label>
          <label class="field">Target WPM
            <input id="tp-target-wpm" type="number" min="20" max="120" value="70" />
          </label>
          <label class="field">Current Accuracy (%)
            <input id="tp-current-acc" type="number" min="70" max="100" value="92" />
          </label>
          <label class="field">Target Accuracy (%)
            <input id="tp-target-acc" type="number" min="85" max="100" value="95" />
          </label>
          <label class="field">Minutes per day
            <input id="tp-mins-day" type="range" min="10" max="90" value="20" />
            <span id="tp-mins-day-label">20 min/day</span>
          </label>
          <button id="tp-calc" class="btn btn-primary">Generate Plan</button>
        </section>

        <section class="tool-results">
          <div id="tp-results" class="result-card">
            <h2>Your Plan</h2>
            <div id="tp-summary">Move the sliders and click Generate Plan.</div>
            <div id="tp-details" class="hidden"></div>
          </div>
        </section>
      </div>

      <section class="prose">
        <h2>How it works</h2>
        <p>This planner uses a conservative, accuracy‑first progression model. If your accuracy is below target, we slow the timeline until accuracy stabilizes. The plan emphasizes special characters, brackets, and syntax patterns that matter for coding.</p>
        <p>Practice focus: 40% special characters, 30% brackets, 30% syntax patterns. Increase minutes/day gradually once accuracy ≥ target.</p>
      </section>
    </div>
  `;

  renderPage('tool-typing-planner', { content });

  updateSEO({
    title: 'Typing Practice Planner | BrokeCoder Tools',
    description: 'Estimate weeks to reach your target WPM with accuracy-first guidance and coding-specific drills.',
    path: '/tools/typing-practice-planner',
    type: 'website'
  });
  addStructuredData(generateSoftwareAppSchema({
    name: 'Typing Practice Planner',
    description: 'An educational tool that estimates time to reach target WPM with accuracy guardrails for programmers.',
    path: '/tools/typing-practice-planner'
  }));

  try { window.bcTrack && window.bcTrack('tool_open', { tool: 'typing_practice_planner' }); } catch {}

  const $ = (id) => document.getElementById(id);
  const currentWpm = $('tp-current-wpm');
  const targetWpm = $('tp-target-wpm');
  const currentAcc = $('tp-current-acc');
  const targetAcc = $('tp-target-acc');
  const minsDay = $('tp-mins-day');
  const minsDayLabel = $('tp-mins-day-label');
  const calcBtn = $('tp-calc');
  const summary = $('tp-summary');
  const details = $('tp-details');

  function trackChange(name, value) {
    try { window.bcTrack && window.bcTrack('input_change', { tool: 'typing_practice_planner', name, value }); } catch {}
  }

  minsDay.addEventListener('input', () => {
    minsDayLabel.textContent = `${minsDay.value} min/day`;
    trackChange('minutes_per_day', minsDay.value);
  });
  [currentWpm, targetWpm, currentAcc, targetAcc].forEach(inp => inp.addEventListener('change', () => trackChange(inp.id, inp.value)));

  function estimatePlan(wc, wt, ac, at, md) {
    const k = 0.75;
    const baseDays = (wt - wc) / (k * Math.sqrt(Math.max(md, 1)));
    const accPenalty = ac < at ? 1 + (Math.min(at - ac, 10) / 10) : 1;
    const days = Math.max(1, Math.ceil(baseDays * accPenalty));
    const weeks = Math.ceil(days / 7);
    const focus = {
      special: Math.round(md * 0.4),
      brackets: Math.round(md * 0.3),
      syntax: Math.round(md * 0.3)
    };
    return { days, weeks, focus, accPenalty };
  }

  calcBtn.addEventListener('click', () => {
    const wc = Number(currentWpm.value);
    const wt = Number(targetWpm.value);
    const ac = Number(currentAcc.value);
    const at = Number(targetAcc.value);
    const md = Number(minsDay.value);
    const plan = estimatePlan(wc, wt, ac, at, md);

    summary.innerHTML = `Target: <strong>${wt} WPM @ ${at}%</strong> · Estimated: <strong>${plan.weeks} weeks</strong> (${plan.days} days)`;
    details.classList.remove('hidden');
    details.innerHTML = `
      <ul>
        <li>Accuracy adjustment: ${plan.accPenalty > 1 ? 'Applied' : 'Not needed'}</li>
        <li>Daily drills: ${md} minutes (Special ${plan.focus.special}m, Brackets ${plan.focus.brackets}m, Syntax ${plan.focus.syntax}m)</li>
        <li>Tip: Keep accuracy ≥ ${at}% before increasing speed.</li>
      </ul>
      <div class="cta-buttons">
        <a href="#/learn-typing" class="btn btn-secondary">Open Typing Hub</a>
        <a href="#/play" class="btn btn-primary">Practice in BrokeCoder</a>
      </div>
    `;

    try { window.bcTrack && window.bcTrack('tool_complete', { tool: 'typing_practice_planner', weeks: plan.weeks, days: plan.days, minutes_day: md }); } catch {}
  });
}

export function renderJSPathEstimator() {
  const content = `
    <div class="tool-page">
      <header class="page-header">
        <h1>JavaScript Learning Path Estimator</h1>
        <p class="page-description">Generate a study plan based on hours/week and focus areas.</p>
      </header>

      <div class="tool-grid">
        <section class="tool-inputs">
          <label class="field">Hours per week
            <input id="js-hours-week" type="range" min="5" max="30" value="10" />
            <span id="js-hours-week-label">10 hrs/week</span>
          </label>
          <label class="field">Starting level
            <select id="js-level">
              <option value="beginner" selected>Beginner</option>
              <option value="intermediate">Intermediate</option>
            </select>
          </label>
          <fieldset class="field">
            <legend>Focus areas</legend>
            <label><input type="checkbox" id="js-focus-fundamentals" checked /> Fundamentals</label>
            <label><input type="checkbox" id="js-focus-dom" checked /> DOM</label>
            <label><input type="checkbox" id="js-focus-async" checked /> Async</label>
            <label><input type="checkbox" id="js-focus-debug" checked /> Debugging</label>
          </fieldset>
          <button id="js-calc" class="btn btn-primary">Generate Plan</button>
        </section>

        <section class="tool-results">
          <div id="js-results" class="result-card">
            <h2>Your Plan</h2>
            <div id="js-summary">Move the sliders and click Generate Plan.</div>
            <div id="js-details" class="hidden"></div>
          </div>
        </section>
      </div>

      <section class="prose">
        <h2>How it works</h2>
        <p>We estimate module durations using conservative hour ranges and adjust for starting level. The output is a week‑by‑week plan with practice missions.</p>
      </section>
    </div>
  `;

  renderPage('tool-js-path', { content });

  updateSEO({
    title: 'JavaScript Learning Path Estimator | BrokeCoder Tools',
    description: 'Plan your JavaScript learning journey with weekly milestones based on your available time and focus areas.',
    path: '/tools/js-learning-path-estimator',
    type: 'website'
  });
  addStructuredData(generateSoftwareAppSchema({
    name: 'JavaScript Learning Path Estimator',
    description: 'An educational tool that generates a JS study plan from hours/week and focus areas.',
    path: '/tools/js-learning-path-estimator'
  }));

  try { window.bcTrack && window.bcTrack('tool_open', { tool: 'js_learning_path_estimator' }); } catch {}

  const $ = (id) => document.getElementById(id);
  const hours = $('js-hours-week');
  const hoursLabel = $('js-hours-week-label');
  const level = $('js-level');
  const fFund = $('js-focus-fundamentals');
  const fDom = $('js-focus-dom');
  const fAsync = $('js-focus-async');
  const fDebug = $('js-focus-debug');
  const calcBtn = $('js-calc');
  const summary = $('js-summary');
  const details = $('js-details');

  function trackChange(name, value) {
    try { window.bcTrack && window.bcTrack('input_change', { tool: 'js_learning_path_estimator', name, value }); } catch {}
  }

  hours.addEventListener('input', () => {
    hoursLabel.textContent = `${hours.value} hrs/week`;
    trackChange('hours_per_week', hours.value);
  });
  level.addEventListener('change', () => trackChange('level', level.value));
  [fFund, fDom, fAsync, fDebug].forEach(cb => cb.addEventListener('change', () => trackChange(cb.id, cb.checked)));

  function moduleHoursRange() {
    return {
      fundamentals: [20, 30],
      dom: [15, 25],
      async: [12, 20],
      debug: [10, 15]
    };
  }
  function estimateWeeks(range, hpw, levelMul) {
    const avg = (range[0] + range[1]) / 2;
    return Math.ceil((avg * levelMul) / Math.max(hpw, 1));
  }

  calcBtn.addEventListener('click', () => {
    const hpw = Number(hours.value);
    const levelMul = level.value === 'beginner' ? 1.2 : 1.0;
    const ranges = moduleHoursRange();
    const selected = [
      fFund.checked && ['Fundamentals', estimateWeeks(ranges.fundamentals, hpw, levelMul)],
      fDom.checked && ['DOM', estimateWeeks(ranges.dom, hpw, levelMul)],
      fAsync.checked && ['Async', estimateWeeks(ranges.async, hpw, levelMul)],
      fDebug.checked && ['Debugging', estimateWeeks(ranges.debug, hpw, levelMul)]
    ].filter(Boolean);

    const totalWeeks = selected.reduce((s, [, w]) => s + w, 0);
    summary.innerHTML = `Estimated total: <strong>${totalWeeks} weeks</strong> @ ${hpw} hrs/week (${level.value})`;
    details.classList.remove('hidden');
    details.innerHTML = `
      <ol>
        ${selected.map(([name, weeks]) => `<li>${name}: ${weeks} week(s)</li>`).join('')}
      </ol>
      <div class="cta-buttons">
        <a href="#/learn-javascript" class="btn btn-secondary">Open JavaScript Hub</a>
        <a href="#/play" class="btn btn-primary">Practice in BrokeCoder</a>
      </div>
    `;

    try { window.bcTrack && window.bcTrack('tool_complete', { tool: 'js_learning_path_estimator', total_weeks: totalWeeks, hours_week: hpw, level: level.value }); } catch {}
  });
}

/**
 * Trust pages (required for AdSense)
 */

export function renderContact() {
  const content = `
    <div class="contact-page prose">
      <h1>Contact Us</h1>
      
      <p class="lead">
        Have feedback, found a bug, or want to contribute? We'd love to hear from you!
      </p>

      <div class="contact-methods">
        <div class="contact-method">
          <h2>Email</h2>
          <p>For general inquiries, bug reports, or partnership opportunities:</p>
          <p><strong>hello@brokercoder.cloud</strong></p>
        </div>

        <div class="contact-method">
          <h2>GitHub</h2>
          <p>Report bugs or suggest features on our public repository:</p>
          <p><a href="https://github.com/brokecoder/game" target="_blank" rel="noopener">github.com/brokecoder/game</a></p>
        </div>

        <div class="contact-method">
          <h2>Community</h2>
          <p>Join our Discord server to connect with other players:</p>
          <p><a href="#/community" rel="noopener">BrokeCoder Discord</a> (Coming Soon)</p>
        </div>
      </div>

      <h2>Contact Form</h2>
      <p>Prefer a form? Send us a note below. We use a simple honeypot to reduce spam—please leave the hidden field empty.</p>
      <form class="contact-form" action="mailto:hello@brokercoder.cloud" method="post" enctype="text/plain">
        <label class="field">Name
          <input type="text" name="name" required />
        </label>
        <label class="field">Email
          <input type="email" name="email" required />
        </label>
        <label class="field">Message
          <textarea name="message" rows="4" required></textarea>
        </label>
        <label class="field honeypot">Leave this field empty
          <input type="text" name="website" tabindex="-1" autocomplete="off" />
        </label>
        <button type="submit" class="btn btn-primary">Send</button>
      </form>

      <h2>What to Include</h2>
      <p>When reaching out, please include:</p>
      <ul>
        <li><strong>Bug reports:</strong> Browser version, steps to reproduce, screenshot if possible</li>
        <li><strong>Feature requests:</strong> Describe the feature and why it would be valuable</li>
        <li><strong>Content contributions:</strong> Your area of expertise and proposed topic</li>
        <li><strong>Partnership inquiries:</strong> Your organization and proposal</li>
      </ul>

      <p>We typically respond within 2-3 business days.</p>
    </div>
  `;

  renderPage('contact', { content });
  
  updateSEO({
    title: 'Contact Us - BrokeCoder',
    description: 'Get in touch with the BrokeCoder team for support, feedback, partnerships, or contributions.',
    path: '/contact',
    type: 'website'
  });
}

export function renderPrivacy() {
  const content = `
    <div class="legal-page prose">
      <h1>Privacy Policy</h1>
      <p class="last-updated">Last Updated: December 20, 2025</p>

      <h2>Overview</h2>
      <p>
        BrokeCoder ("we", "us", "our") operates brokercoder.cloud. This Privacy Policy explains how we collect, use, and protect your information when you use our website and game.
      </p>

      <h2>Information We Collect</h2>
      <h3>Information You Provide</h3>
      <ul>
        <li>Game progress stored locally in your browser (localStorage)</li>
        <li>Contact details you share when you email or submit the contact form</li>
        <li>Optional account details if we add accounts in the future</li>
      </ul>

      <h3>Information Collected Automatically</h3>
      <ul>
        <li>Device and browser info, pages visited, and engagement (via analytics if you accept)</li>
        <li>Approximate location derived from IP (anonymized by our analytics tools)</li>
        <li>Referring URLs and basic performance metrics</li>
      </ul>

      <h2>How We Use Information</h2>
      <ul>
        <li>Operate and improve the game and learning experience</li>
        <li>Understand usage to make content clearer and faster</li>
        <li>Respond to support requests and feedback</li>
        <li>Detect abuse or errors</li>
      </ul>

      <h2>Cookies & Consent</h2>
      <p>
        We use essential cookies for site security and game state. Optional analytics cookies run only if you accept in the consent banner. You can change your choice anytime via Privacy Settings in the footer or your browser settings.
      </p>

      <h2>Advertising & Google Services</h2>
      <p>
        To prepare for Google AdSense, we may use Google services that set cookies or similar identifiers for interest-based ads. If enabled, Google may collect or receive data to show ads based on your visits here and to other sites. You can manage Google ad personalization at <a href="https://adssettings.google.com" rel="noopener" target="_blank">adssettings.google.com</a> and review Google’s policies at <a href="https://policies.google.com/privacy" rel="noopener" target="_blank">policies.google.com/privacy</a>.
      </p>

      <h2>Analytics</h2>
      <p>
        We use privacy-friendly analytics and may add Google Analytics 4 (GA4). Analytics load only after consent. Collected data is aggregated and helps us improve performance and content.
      </p>

      <h2>Data Sharing</h2>
      <ul>
        <li>Service providers for hosting, analytics, and security (access limited to what’s needed)</li>
        <li>Legal requirements: if we must comply with law or protect our rights</li>
        <li>We do not sell personal information</li>
      </ul>

      <h2>Data Retention</h2>
      <p>
        Gameplay progress stays in your browser. Contact messages are kept only as long as needed to respond. Aggregated analytics may be retained for trend analysis.
      </p>

      <h2>Your Choices & Rights</h2>
      <ul>
        <li>Update or delete your game progress by clearing browser data</li>
        <li>Opt out of analytics via the consent banner (Reject) or Privacy Settings</li>
        <li>Request access, correction, or deletion of contact data by emailing us</li>
      </ul>

      <h2>Children’s Privacy</h2>
      <p>
        BrokeCoder is for users 13+ and not directed to children. If you believe a child under 13 provided information, contact us so we can delete it.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable safeguards, but no online service is 100% secure. Avoid sharing sensitive data through the contact form.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy. We will adjust the “Last Updated” date and, for significant changes, provide a notice on the site.
      </p>

      <h2>Contact</h2>
      <p>
        Privacy questions? Email us at <a href="mailto:hello@brokercoder.cloud">hello@brokercoder.cloud</a> or visit <a href="#/contact">Contact</a>.
      </p>
    </div>
  `;

  renderPage('privacy', { content });
  
  updateSEO({
    title: 'Privacy Policy - BrokeCoder',
    description: 'BrokeCoder privacy policy: how we collect, use, and protect your information.',
    path: '/privacy-policy',
    type: 'website'
  });
}

export function renderTerms() {
  const content = `
    <div class="legal-page prose">
      <h1>Terms of Service</h1>
      <p class="last-updated">Last Updated: December 20, 2025</p>

      <h2>Agreement to Terms</h2>
      <p>
        By accessing or using BrokeCoder, you agree to be bound by these Terms of Service. 
        If you disagree with any part of these terms, you may not access the service.
      </p>

      <h2>Use License</h2>
      <p>
        We grant you a personal, non-exclusive, non-transferable, limited license to access 
        and use BrokeCoder for personal, non-commercial purposes.
      </p>

      <h3>You May:</h3>
      <ul>
        <li>Play the game for personal enjoyment and learning</li>
        <li>Share your progress on social media</li>
        <li>Provide feedback and suggestions</li>
      </ul>

      <h3>You May Not:</h3>
      <ul>
        <li>Reverse engineer, decompile, or disassemble the game</li>
        <li>Use automated systems or bots to play the game</li>
        <li>Exploit bugs or glitches for unfair advantage</li>
        <li>Harass or harm other users (in future multiplayer features)</li>
        <li>Use the service for any illegal purpose</li>
        <li>Resell or redistribute the game or content</li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>
        All content, features, and functionality of BrokeCoder are owned by us and are protected 
        by international copyright, trademark, and other intellectual property laws.
      </p>

      <h2>User-Generated Content</h2>
      <p>
        If you submit feedback, suggestions, or other content to us, you grant us a worldwide, 
        perpetual, royalty-free license to use, modify, and incorporate that content.
      </p>

      <h2>Disclaimer of Warranties</h2>
      <p>
        BrokeCoder is provided "as is" without warranties of any kind, either express or implied. 
        We do not guarantee that the service will be uninterrupted, secure, or error-free.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        We shall not be liable for any indirect, incidental, special, consequential, or punitive 
        damages resulting from your use of or inability to use the service.
      </p>

      <h2>Educational Purpose Disclaimer</h2>
      <p>
        While BrokeCoder teaches coding concepts and typing skills, it is not a substitute for 
        formal education or professional training. We make no guarantees about employment outcomes 
        or skill proficiency.
      </p>

      <h2>Game Progress and Data</h2>
      <p>
        Your game progress is stored locally in your browser. We are not responsible for loss of 
        progress due to browser data deletion, device changes, or technical issues.
      </p>

      <h2>Changes to Service</h2>
      <p>
        We reserve the right to modify, suspend, or discontinue any part of the service at any 
        time without notice.
      </p>

      <h2>Changes to Terms</h2>
      <p>
        We may revise these terms at any time. Continued use of the service after changes 
        constitutes acceptance of the new terms.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws of the United States, without regard to conflict 
        of law provisions.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms? Contact us at <a href="mailto:hello@brokercoder.cloud">hello@brokercoder.cloud</a> or visit <a href="#/contact">Contact</a>
      </p>
    </div>
  `;

  renderPage('terms', { content });
  
  updateSEO({
    title: 'Terms of Service - BrokeCoder',
    description: 'BrokeCoder terms of service: rules, rights, and responsibilities for using our typing RPG game.',
    path: '/terms',
    type: 'website'
  });
}

export function renderDisclaimer() {
  const content = `
    <div class="legal-page prose">
      <h1>Disclaimer</h1>
      <p class="last-updated">Last Updated: December 20, 2024</p>

      <h2>General Disclaimer</h2>
      <p>
        The information and game content provided by BrokeCoder is for general informational and 
        educational purposes only. While we strive for accuracy, we make no representations or 
        warranties of any kind about the completeness, accuracy, or reliability of the information.
      </p>

      <h2>Educational Content Disclaimer</h2>
      <p>
        BrokeCoder provides educational content about programming, typing, and tech careers. 
        This content is:
      </p>
      <ul>
        <li>For educational purposes only</li>
        <li>Not a substitute for formal education or professional training</li>
        <li>Based on general industry knowledge and best practices</li>
        <li>Subject to change as technology and industries evolve</li>
      </ul>

      <h2>Career Advice Disclaimer</h2>
      <p>
        Information about careers, salaries, and job market trends is provided for general guidance 
        only. We do not guarantee:
      </p>
      <ul>
        <li>Employment outcomes or job placement</li>
        <li>Specific salary ranges (which vary by location, experience, and company)</li>
        <li>That learning the content will qualify you for any specific job</li>
        <li>The accuracy of third-party career or salary information</li>
      </ul>

      <h2>Coding and Technical Information</h2>
      <p>
        Code examples, tutorials, and technical information are provided for learning purposes. 
        We do not guarantee that:
      </p>
      <ul>
        <li>Code examples are production-ready or secure</li>
        <li>Information reflects the latest language/framework versions</li>
        <li>Best practices are universally applicable to all situations</li>
      </ul>
      <p>
        Always research and test code thoroughly before using it in production environments.
      </p>

      <h2>Game Progress and Data</h2>
      <p>
        Game progress is stored locally in your browser. We are not responsible for:
      </p>
      <ul>
        <li>Loss of game progress due to browser data deletion</li>
        <li>Incompatibility with future browser or device updates</li>
        <li>Corruption or loss of locally stored data</li>
      </ul>

      <h2>Third-Party Links</h2>
      <p>
        BrokeCoder may contain links to third-party websites or services. We are not responsible 
        for the content, privacy policies, or practices of third-party sites.
      </p>

      <h2>Health and Ergonomics</h2>
      <p>
        Extended typing sessions can cause strain or injury. Users should:
      </p>
      <ul>
        <li>Take regular breaks (recommend 5-10 minutes per hour)</li>
        <li>Maintain proper posture and ergonomics</li>
        <li>Stop immediately if experiencing pain or discomfort</li>
        <li>Consult a healthcare professional for any persistent issues</li>
      </ul>
      <p>We are not responsible for repetitive strain injuries or other health issues.</p>

      <h2>No Professional Advice</h2>
      <p>
        Content on BrokeCoder does not constitute professional advice (legal, financial, medical, 
        or otherwise). For specific professional advice, consult a qualified professional in 
        the relevant field.
      </p>

      <h2>Accuracy of Information</h2>
      <p>
        While we make efforts to keep information current and accurate, we do not warrant:
      </p>
      <ul>
        <li>The completeness or accuracy of information</li>
        <li>That content is up-to-date with latest industry changes</li>
        <li>That all information is applicable to your specific situation</li>
      </ul>

      <h2>Use at Your Own Risk</h2>
      <p>
        Your use of BrokeCoder and reliance on any information provided is solely at your own risk. 
        We shall not be liable for any losses or damages in connection with the use of our service.
      </p>

      <h2>Changes to Disclaimer</h2>
      <p>
        We may update this disclaimer at any time. Your continued use of the service constitutes 
        acceptance of the updated disclaimer.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this disclaimer? Contact us at <a href="mailto:hello@brokercoder.cloud">hello@brokercoder.cloud</a>
      </p>
    </div>
  `;

  renderPage('disclaimer', { content });
  
  updateSEO({
    title: 'Disclaimer - BrokeCoder',
    description: 'Important disclaimers about BrokeCoder educational content, career advice, and game usage.',
    path: '/disclaimer',
    type: 'website'
  });
}

/**
 * Helper functions
 */

function renderAdSlot(label = 'Reserved ad slot') {
  return `
    <div class="ad-slot" role="presentation" aria-hidden="true">
      <div class="ad-slot-inner">${label}</div>
    </div>
  `;
}

function renderExploreMore(links = []) {
  if (!links || links.length === 0) return '';
  return `
    <aside class="explore-more">
      <h3>Explore More</h3>
      <div class="related-grid">
        ${links.map(l => `
          <a href="${l.href}" class="related-card">
            <h4>${l.title}</h4>
            ${l.desc ? `<p>${l.desc}</p>` : ''}
          </a>
        `).join('')}
      </div>
    </aside>
  `;
}

function renderExploreGrid(links = []) {
  return `
    <div class="explore-grid">
      ${links.map(l => `
        <a href="${l.href}" class="explore-card">
          <h3>${l.title}</h3>
          ${l.desc ? `<p>${l.desc}</p>` : ''}
        </a>
      `).join('')}
    </div>
  `;
}

function mergeAndCapLinks(groups, cap = EXPLORE_LINK_TARGET) {
  const flat = groups.flat().filter(Boolean);
  const seen = new Set();
  const unique = [];
  for (const l of flat) {
    const key = l.href;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(l);
    }
    if (unique.length >= cap) break;
  }
  return unique;
}

function getFeaturedExploreLinks(type) {
  try {
    if (type === 'blog') {
      const posts = getAllBlogPosts().slice(0, 6);
      return posts.map(p => ({ title: p.title, href: `#/blog/${p.slug}`, desc: p.description }));
    }
    if (type === 'careers') {
      const careers = getAllCareers().slice(0, 6);
      return careers.map(c => ({ title: c.title.replace(' Career Path',''), href: `#/careers/${c.slug}`, desc: c.description }));
    }
    if (type === 'skills') {
      const skills = getAllSkills().slice(0, 6);
      return skills.map(s => ({ title: s.title, href: `#/skills/${s.slug}`, desc: s.description }));
    }
    if (type === 'devices') {
      const devices = getAllDevices().slice(0, 6);
      return devices.map(d => ({ title: d.title, href: `#/devices/${d.slug}`, desc: d.description }));
    }
  } catch (e) {
    console.warn('Explore links error', type, e);
  }
  return [];
}

function getCrossTypeExploreLinks(tags = []) {
  const cross = [];
  const skills = getAllSkills().filter(s => s.tags?.some(t => tags.includes(t))).slice(0, 3);
  cross.push(...skills.map(s => ({ title: s.title, href: `#/skills/${s.slug}`, desc: s.description })));
  const careers = getAllCareers().filter(c => c.tags?.some(t => tags.includes(t))).slice(0, 3);
  cross.push(...careers.map(c => ({ title: c.title.replace(' Career Path',''), href: `#/careers/${c.slug}`, desc: c.description })));
  return cross;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

function markdownToHTML(markdown) {
  // Simple markdown to HTML converter
  // For production, consider using a library like marked.js
  
  // First, convert internal link placeholders to anchors
  markdown = preprocessPlaceholders(markdown);

  const html = markdown
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    // Line breaks
    .replace(/\n/g, '<br>');

  return `<p>${html}</p>`;
}

/**
 * Convert placeholder syntax like:
 *  "Link Text — [SKILL:slug]" into <a href="#/skills/slug">Link Text</a>
 * Supports SKILL, CAREER, BLOG types.
 */
function preprocessPlaceholders(md) {
  // Skill placeholders
  md = md.replace(/([^\n]+?)\s+—\s+\[SKILL:([a-z0-9-]+)\]/gim, '<a href="#/skills/$2">$1</a>');
  // Career placeholders
  md = md.replace(/([^\n]+?)\s+—\s+\[CAREER:([a-z0-9-]+)\]/gim, '<a href="#/careers/$2">$1</a>');
  // Blog placeholders
  md = md.replace(/([^\n]+?)\s+—\s+\[BLOG:([a-z0-9-]+)\]/gim, '<a href="#/blog/$2">$1</a>');
  return md;
}

/**
 * Fetch and parse a career markdown document with YAML front matter.
 */
async function fetchCareerMarkdown(slug) {
  try {
    const res = await fetch(`./content/careers/${slug}.md?v=${Date.now()}`);
    if (!res.ok) return null;
    const raw = await res.text();
    const parsed = parseFrontMatter(raw);
    return parsed;
  } catch (e) {
    console.error('Failed to load career markdown:', slug, e);
    return null;
  }
}

/**
 * Minimal YAML front matter parser for ---\n...\n--- blocks
 */
function parseFrontMatter(raw) {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  let frontmatter = {};
  let content = raw;
  if (fmMatch) {
    const yaml = fmMatch[1];
    content = raw.slice(fmMatch[0].length);
    frontmatter = yamlToObject(yaml);
  }
  return { frontmatter, content };
}

function yamlToObject(yaml) {
  const obj = {};
  const lines = yaml.split('\n');
  for (let line of lines) {
    const m = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2];
    // Strip quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    // Arrays: [a, b, c]
    if (val.startsWith('[') && val.endsWith(']')) {
      const arrStr = val.slice(1, -1).trim();
      const arr = arrStr ? arrStr.split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')) : [];
      obj[key] = arr;
    } else {
      obj[key] = val;
    }
  }
  return obj;
}
