# Behaviours (from scroll/click/hover sweep + theme JS)

- **No smooth-scroll library** (no Lenis/Locomotive); native scrolling.
- Announcement: messages crossfade (opacity .4s), 2600ms dwell; CTA hover turns red and widens gap.
- Header: `position: sticky`; class `is-scrolled` toggled when `scrollY > 36` (announcement height). Desktop nav items with ▾ open mega menus on hover. Mobile (<= breakpoint in CSS): hamburger opens left drawer with backdrop; Escape / backdrop close; accordion sub-menus.
- Hero: crossfade slides, autoplay 3000ms, pauses on hover / hidden tab, arrows, dots, counter, swipe, ←/→ keys.
- Marquee: infinite horizontal CSS animation of outlined display type.
- Collections: hover zoom on tile imagery; on mobile tiles become a scroll-snap row with synced dots.
- New arrivals / Top picks / Best sellers: horizontal scrollers; prev/next scroll by one card step (smooth), disabled at ends; dots track the card nearest the left edge.
- Personalisation: shirt-back card cycles name/number/flag samples on a timer with indicator dots.
- Reviews: horizontally scrollable card row ("Swipe to see more").
- Newsletter: client-side email validation and success state.
- Responsive breakpoints: see each section's stylesheet (common: 1024px, 900px, 768px, 720px, 480px).
