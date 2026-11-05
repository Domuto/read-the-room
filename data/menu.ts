/**
 * ────────────────────────────────────────────────────────────
 *  MENU
 *  Add sections and items here and /menu updates automatically.
 *  The full menu PDF is linked from the page independently.
 * ────────────────────────────────────────────────────────────
 */
export type MenuItem = {
  name: string;
  description?: string;
  price?: string;
};

export type MenuSection = {
  title: string;
  blurb?: string;
  items: MenuItem[];
};

export const menu: MenuSection[] = [
  // {
  //   title: "Cocktails",
  //   blurb: "Every drink is named for a song.",
  //   items: [{ name: "Song Title", description: "Spirit, citrus, bitters", price: "$14" }],
  // },
  // { title: "Bites", items: [] },
  // { title: "Coffee", items: [] },
];
