/**
 * ────────────────────────────────────────────────────────────
 *  EVENTS & DJ NIGHTS
 *  Add upcoming nights here and /events updates automatically.
 *  `date` is an ISO date (YYYY-MM-DD); past events are hidden.
 * ────────────────────────────────────────────────────────────
 */
export type ShopEvent = {
  title: string;
  date: string;
  time?: string;
  description?: string;
  dj?: string;
};

export const events: ShopEvent[] = [
  // { title: "Listening Party", date: "2026-11-07", time: "8 PM", dj: "DJ Name", description: "..." },
];
