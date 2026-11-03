# Content & asset rules (apply to every component)

This clone reproduces the target's **layout, spacing, typography, colours, motion and responsive behaviour exactly**.
It does NOT reuse the target's brand, photos, or third-party trademarks. Follow these rules:

1. **Brand** — the store is called **KITROOM**. Use `<Logo />` from `@/components/art` wherever the original logo appears (`inverted` on dark backgrounds). Copyright line: "© 2026 KITROOM Ltd".
2. **No real clubs, national teams, players, kit makers, sponsors or tournaments.** Replace with fictional names:
   clubs — Harbour City FC, Northbridge United, Ashford Rovers, Vale Athletic, Redmoor FC, Lakeside Town, Castleton Albion, Westmere FC;
   player names on shirts — e.g. "OKAFOR", "LINDQVIST", "MORENO". Instead of "World Cup", say "Summer Cup".
3. **Images** — never hotlink or download the target's images. Use `PhotoArt` (abstract photographic panel, absolutely fills its parent) and `ShirtArt` (generic shirt SVG) from `@/components/art`. Match the dominant colours/mood of the original image (read the screenshot) so the page *feels* the same.
4. **Copy** — short UI labels and generic headings may stay as-is (e.g. "Featured Collections", "New arrivals.", "Shop now", "View all", footer link labels, "Free shipping"). Longer marketing sentences and all customer reviews must be **rewritten** in your own words at roughly the same length, so wrapping/line counts stay close. Prices may stay (£34.99 etc.).
5. Keep every badge, eyebrow, counter, dot, and button that exists in the original — only the words/images change.
