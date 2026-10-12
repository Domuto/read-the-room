/**
 * ────────────────────────────────────────────────────────────
 *  SHOP CONFIG
 *  Everything about the business lives here. Edit these strings and
 *  they update across the site, the structured data and the footers.
 * ────────────────────────────────────────────────────────────
 */
export const shop = {
  name: "Read the Room",
  tagline: "Vinyl & Cocktails · Atlanta",
  description:
    "Read the Room is a vinyl record bar on the BeltLine in Old Fourth Ward, Atlanta. Song-named cocktails, coffee and a crate of records worth flipping.",

  url: "https://www.readtheroomatl.com",

  // Shown in the top bars and footers
  handle: "@readtheroom.atl",
  address: "691 John Wesley Dobbs Ave NE, Atlanta, GA 30312",
  street: "691 John Wesley Dobbs Ave NE",
  city: "Atlanta",
  region: "GA",
  postalCode: "30312",
  neighborhood: "Old Fourth Ward (BeltLine)",

  // TODO: confirm with the owners — listed on The Infatuation.
  phone: "(470) 345-4550",
  phoneHref: "tel:+14703454550",

  // Opening hours. Leave empty until confirmed; the site falls back to
  // "see Instagram" and the structured data omits hours.
  // Example: { days: "Wed–Sun", time: "5 PM – 2 AM", schemaDays: ["Wednesday", ...], opens: "17:00", closes: "02:00" }
  hours: [] as {
    days: string;
    time: string;
    schemaDays: string[];
    opens: string;
    closes: string;
  }[],

  // Links — paste your real URLs here
  instagram: "https://instagram.com/readtheroom.atl",
  instagramDM: "https://ig.me/m/readtheroom.atl", // deep-links straight to DMs
  maps: "https://www.google.com/maps/search/?api=1&query=691+John+Wesley+Dobbs+Ave+NE+Atlanta+GA+30312",
  menuUrl: "/menu",
};
