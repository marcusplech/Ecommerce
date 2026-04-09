/**
 * Tokens semânticos — dark mode com base “midnight” + violeta/ciano.
 */
export type ThemeTokens = {
  background: string;
  nav: string;
  primary: string;
  text: string;
  icon: string;
  description: string;
};

export const LIGHT_MODE: ThemeTokens = {
  background: "#f4f6fb",
  nav: "#ffffff",
  primary: "#eef2f7",
  text: "#0f172a",
  icon: "#4f46e5",
  description: "#64748b",
};

/** Fundo profundo azulado, cartões elevados, acentos frios */
export const DARK_MODE: ThemeTokens = {
  background: "#0a0e17",
  /** Superfícies (cards, painéis) */
  nav: "#131b2e",
  primary: "#1e293b",
  text: "#f1f5f9",
  icon: "#a5b4fc",
  description: "#94a3b8",
};

export type AppTheme = ThemeTokens & { isDarkMode: boolean };
