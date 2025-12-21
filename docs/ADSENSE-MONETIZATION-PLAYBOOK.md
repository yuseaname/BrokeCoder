# AdSense Monetization Playbook (Baseline)

Status: Implementation-ready, ads disabled by default. See `routes.js` `ENABLE_AD_SLOTS`.

Goals:
- Viewability: ≥70% for in-article units; CLS ≤0.1; LCP <2.5s
- Density: Respect Google policies; prioritize user value
- UX: Non-disruptive placements; test formats responsively

Placements (Future Enablement):
- Blog Post: Intro, mid-article, end (reserved slots exist)
- Careers/Skills: Mid-content and end (reserved via Explore More separation)
- Hubs: In-feed responsive units between cards (every 3–4 items)

Formats to Test:
- Responsive display and in-article
- In-feed for hub grids
- Auto ads (limited, after manual baseline validation)

Optimization Schedule:
- Week 1: Baseline metrics (viewability, RPM, CTR); ensure consent gating
- Week 2–4: A/B test density (1 → 2 units per long article); monitor engagement
- Ongoing: Adjust placements based on scroll-depth and viewport

Compliance:
- Ads load only after consent (future toggle)
- Clear trust pages: Privacy, Terms, Disclaimer, Contact (implemented)
- No deceptive UX; content-first design

Technical Notes:
- Keep `ENABLE_AD_SLOTS=false` until AdSense approved
- When enabling, replace slot containers with AdSense code and guard behind consent
