/** Shared market-observation types for daily notes and weekly outlooks. */

export type DailyKind = "daily" | "weekly";

export type MarketQuote = {
  name: string;
  symbol: string;
  value: string;
  change: number | null;
  basis: string;
  points: number[];
};

export type AgendaEvent = {
  label: string;
  title: string;
  detail: string;
  /** Display time such as "11.10" or "本周内". Exact clock times stay unverified. */
  when?: string;
};

export type WatchlistItem = {
  symbol: string;
  name: string;
  note?: string;
};

export type ContentSection = {
  id: string;
  /** Optional section label shown above the paragraphs. */
  heading?: string;
  body: string[];
};

export type DailyIssue = {
  id: string;
  kind: DailyKind;
  /** Publication calendar day, ISO date `YYYY-MM-DD`. */
  dateISO: string;
  /** Display date such as `2026.11.08`. */
  date: string;
  weekday?: string;
  /** Weekly coverage window, e.g. `2026.11.09–11.13`. */
  periodLabel?: string;
  /** Demo scenario label only; omit on published issues. */
  scenario?: string;
  title: string;
  lead: string;
  /** Structured body for weekly/daily reading. */
  sections: ContentSection[];
  stance: string;
  watch: string;
  marketSummary?: string;
  marketTime?: string;
  opinionTime: string;
  /** Omit or leave empty when no reviewed quotes are available. */
  quotes?: MarketQuote[];
  agenda?: {
    current: AgendaEvent[];
    next: AgendaEvent[];
  };
  watchlist?: WatchlistItem[];
  /** Attribution line, e.g. `2026-11-08 晚 · Wise`. */
  authorNote?: string;
  status: "published" | "demo";
};
