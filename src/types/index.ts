import type { ShirtPattern } from "@/components/art";

export interface ShirtLook {
  base: string;
  accent: string;
  trim?: string;
  pattern?: ShirtPattern;
  /** Background behind the shirt in product photography */
  backdrop?: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  badge?: string;
  href: string;
  look: ShirtLook;
}

export interface NavItem {
  label: string;
  href: string;
  hasMenu?: boolean;
  highlight?: boolean;
}
