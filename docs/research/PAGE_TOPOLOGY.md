# Page topology (desktop 1440px; total height ≈ 8904px)

| # | Section | Component | y / height | Position | Interaction model |
|---|---------|-----------|-----------|----------|-------------------|
| 1 | Announcement bar | AnnouncementBar | 0 / 36 | relative, z 110 | time-driven rotator |
| 2 | Header (utility row, main row, dark nav) | SiteHeader | 36 / 162 | **sticky top 0**, z 100 | scroll (`is-scrolled` after 36px), hover mega menus, mobile drawer |
| 3 | Hero carousel | Hero | 198 / 617 | relative, bg #131313 | autoplay 3s, prev/next, dots, swipe |
| 4 | Outlined text marquee + caption | MarqueeSeparator | 815 / 217 | relative | CSS infinite marquee |
| 5 | Featured collections | Collections | 1032 / 1153 | flow | static grid; mobile scroll-snap + dots |
| 6 | New arrivals | NewArrivals | 2185 / 1321 | flow | horizontal carousel |
| 7 | Top picks + Best sellers | TopPicksBestSellers | 3506 / 1571 | flow | 2 horizontal carousels |
| 8 | Women / Kids tiles | WomenKids | 5078 / 1019 | flow | static + hover |
| 9 | Personalisation | PrintShop | 6096 / 757 | relative, bg #0e0e10 | time-driven sample cycler |
| 10 | Retro / Mystery split | RetroMystery | 6853 / 580 | relative, bg #0d0d0d | static + hover |
| 11 | Reviews | Reviews | 7433 / 599 | flow, bg #f6f7f8 | horizontal scroll row |
| 12 | Newsletter + help bar | Newsletter | 8032 / 252 | relative, bg #0e0e10 | form states |
| 13 | Footer | SiteFooter | 8283 / 620 | flow, bg #0e0e10 | static |

Overlays on the original not reproduced: currency suggestion toast (fixed bottom), cart drawer, wishlist JS, third-party widgets.
