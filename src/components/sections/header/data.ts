/* Navigation content for the KITROOM site header (all names fictional). */

export interface LinkItem {
  label: string;
  href: string;
}

export interface MegaGroup extends LinkItem {
  children: LinkItem[];
}

export interface MegaFeature {
  href: string;
  eyebrow: string;
  heading: string;
  sub: string;
  cta: string;
}

export interface MegaMenu {
  title: string;
  /** Columns of group links (each group has a hover popout of children). */
  columns: MegaGroup[][];
  /** Rows of the bottom list (".tnk-mega__list--ctas"). */
  ctas: LinkItem[];
  /** Whether the ctas list renders as the uppercase "All …" CTA style. */
  ctaStyle?: boolean;
  feature?: MegaFeature;
}

export type NavEntry =
  | { kind: "link"; label: string; href: string }
  | { kind: "highlight"; label: string; href: string }
  | { kind: "mega"; label: string; menu: MegaMenu }
  | { kind: "submenu"; label: string; items: LinkItem[] };

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const cat = (label: string): LinkItem => ({ label, href: `/collections/${slug(label)}` });
const group = (label: string, children: string[]): MegaGroup => ({
  ...cat(label),
  children: children.map(cat),
});

export const TOP_LINKS: LinkItem[] = [
  { label: "Help", href: "/help" },
  { label: "My account", href: "/account" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Track order", href: "/track-order" },
];

export interface Currency {
  code: string;
  flag: string;
  symbol: string;
  name: string;
}

export const CURRENCIES: Currency[] = [
  { code: "GBP", flag: "🇬🇧", symbol: "£", name: "Pound sterling" },
  { code: "AUD", flag: "🇦🇺", symbol: "$", name: "Australian dollar" },
  { code: "CAD", flag: "🇨🇦", symbol: "$", name: "Canadian dollar" },
  { code: "DKK", flag: "🇩🇰", symbol: "kr", name: "Danish krone" },
  { code: "EUR", flag: "🇪🇺", symbol: "€", name: "Euro" },
  { code: "NOK", flag: "🇳🇴", symbol: "kr", name: "Norwegian krone" },
  { code: "SEK", flag: "🇸🇪", symbol: "kr", name: "Swedish krona" },
  { code: "CHF", flag: "🇨🇭", symbol: "CHF", name: "Swiss franc" },
  { code: "USD", flag: "🇺🇸", symbol: "$", name: "United States (US) dollar" },
];

const NATIONAL_TEAMS: MegaMenu = {
  title: "By Continent",
  ctaStyle: true,
  columns: [
    [
      group("Africa", ["Kilwana", "Mbalé", "Ondaro", "Sahelia", "Tamaru", "Zambara", "Kovenda", "Lumaré"]),
      group("Asia", ["Haruvia", "Kirabad", "Lumeng", "Qasira", "Seonmar", "Tavaristan"]),
      group("Europe", [
        "Aldermark",
        "Brennland",
        "Castavia",
        "Kaltenberg",
        "Lusevia",
        "Montavo",
        "Nordheim",
        "Valdoria",
        "Westrovia",
        "Ystremark",
      ]),
    ],
    [
      group("North & Central America", ["Caldera", "Costa Lumina", "Isla Verde", "Northmarch", "San Ilario", "Tierra Alta"]),
      group("Oceania", ["Marawa", "Te Ranui"]),
      group("South America", ["Altamar", "Andaria", "Pampera", "Serrania", "Valcosta", "Esmerada"]),
    ],
  ],
  ctas: [{ label: "All nations", href: "/collections/national-teams" }],
  feature: {
    href: "/collections/summer-cup-2026",
    eyebrow: "Summer Cup 2026",
    heading: "The tournament shirts",
    sub: "Every nation and every shirt, ready before June 2026. Fresh drops each week.",
    cta: "Shop SC 26 →",
  },
};

const CLUBS: MegaMenu = {
  title: "By League",
  ctaStyle: true,
  columns: [
    [
      group("Premier Division", [
        "Harbour City FC",
        "Northbridge United",
        "Ashford Rovers",
        "Vale Athletic",
        "Redmoor FC",
        "Lakeside Town",
        "Castleton Albion",
        "Westmere FC",
      ]),
      group("Championship Division", ["Kingsport Athletic", "Easthaven City", "Brookfield Rangers", "Millbrook United", "Stonegate FC", "Oakridge Town"]),
      group("Northern League", ["Fairhaven Wanderers", "Ironbridge FC", "Saltmarsh Rovers", "Highcliffe Albion"]),
      group("Highland Premiership", ["Glenmore FC", "Strathcairn United", "Port Ardrie", "Kinloch Thistle"]),
      group("Alpine Liga", ["FC Nordheim", "SV Kaltenberg", "Brennland 04", "Union Aldermark", "TSV Felsach"]),
      group("Lowlands League", ["FC Westrovia", "Sparta Dijkveld", "Vitesse Molen", "AZ Kanaalstad"]),
      group("Coastal Primera", ["Real Altamar", "Atlético Serrania", "Deportivo Valcosta", "CD Puerto Sol", "UD Brisamar"]),
      group("Riviera Ligue", ["Olympique Castavia", "AS Lumière", "Stade Marivaux", "FC Montclair"]),
      group("Southern Serie", ["Montavo Calcio", "AS Lusevia", "Virtus Lago", "US Collina"]),
    ],
    [
      group("Atlantic Liga", ["Sporting Aldermark", "CF Ribamar", "Vitória Costa", "Académica Serra"]),
      group("Pampas Primera", ["Club Pampera", "Atlético Andaria", "Racing Río Claro"]),
      group("Tropical Série A", ["Esporte Esmerada", "Clube Verdemar", "Praia Azul FC", "Atlético Serrano", "União Litoral"]),
      group("Northmarch Soccer League", ["Northmarch FC", "Caldera Sol", "Bayfront United", "Pine Valley SC", "Lakeshore City"]),
      group("Golden Coast League", ["Kilwana Stars", "Ondaro United", "Tamaru Lions"]),
      group("Desert Pro League", ["Al Qasira", "Oasis FC", "Qasira Falcons"]),
      group("Strait Lig", ["Kartal Spor", "Yıldızkent SK", "Dalga FK"]),
      group("Island League", ["Isla Verde FC", "Marawa Reef", "Te Ranui City"]),
      group("Other Continental", ["Greywater FC", "Elmstead United", "Port Lumen FC", "Riverside Athletic", "Thornbury City"]),
    ],
  ],
  ctas: [{ label: "All clubs", href: "/collections/clubs" }],
  feature: {
    href: "/collections/special-editions",
    eyebrow: "Continental Cup",
    heading: "Continental nights",
    sub: "Cup-night shirts, training tops & limited runs from the continent's biggest clubs.",
    cta: "Shop Cup →",
  },
};

const COLLECTIONS: MegaMenu = {
  title: "By type",
  columns: [],
  ctas: ["Player Version", "Special Editions", "Long Sleeves", "Balls", "Tracksuits"].map(cat),
};

const CUSTOMER_SERVICES: MegaMenu = {
  title: "How can we help?",
  columns: [],
  ctas: [
    { label: "Help & FAQ", href: "/help" },
    { label: "Track your order", href: "/track-order" },
    { label: "Contact us", href: "/contact" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Returns Policy", href: "/returns-policy" },
    { label: "Size Guide", href: "/size-guide" },
  ],
};

export const NAV: NavEntry[] = [
  { kind: "link", label: "Home", href: "/" },
  { kind: "mega", label: "National teams", menu: NATIONAL_TEAMS },
  { kind: "mega", label: "Clubs", menu: CLUBS },
  { kind: "highlight", label: "Summer Cup 2026", href: "/collections/summer-cup-2026" },
  { kind: "link", label: "Boots", href: "/collections/football-boots" },
  { kind: "mega", label: "Collections", menu: COLLECTIONS },
  {
    kind: "submenu",
    label: "Women & Kids",
    items: [
      { label: "Women", href: "/collections/women-kits" },
      { label: "Kids", href: "/collections/kids-football-shirts" },
    ],
  },
  { kind: "mega", label: "Customer services", menu: CUSTOMER_SERVICES },
];
