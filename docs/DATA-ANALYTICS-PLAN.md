# Data & Analytics Plan

KPIs:
- Traffic: Organic sessions/month; growth rate
- Engagement: Avg session duration; pages/session; scroll depth
- Content: Publish velocity; refresh count; top 20 performance
- Monetization: RPM (once ads live); viewability; CTR
- CWV: Mobile scores (LCP, FID/INP, CLS)

Instrumentation:
- Consent-gated analytics (already implemented via `consent.js`)
- Event tracking: `page_view`, `internal_link_click`, `cta_click`, `play_click`
- Scroll-depth sampling (25/50/75/90%) on long-form pages

Dashboards:
- Monthly report: sessions, engagement, content velocity, Top 20
- Quarterly pivot: topic mix, backlink wins, refresh impact

Cadence:
- Monthly performance reviews: all 8 specialists contribute
- Quarterly strategic pivots based on data

Attribution:
- Pathways: Search → Hub → Article → Play
- Identify link modules driving pages/session via `Explore More` interactions

Notes:
- Keep analytics lightweight to preserve CWV
- Respect user privacy and consent at all times
