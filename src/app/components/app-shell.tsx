"use client";

import { useAppTheme } from "@/contexts/theme-context";
import { NavBar } from "./nav-bar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { theme } = useAppTheme();

  return (
    <div
      className="relative min-h-screen transition-[background-color] duration-500 ease-out"
      style={{ backgroundColor: theme.background }}
    >
      {theme.isDarkMode ? (
        <div
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
          aria-hidden
        >
          <div className="absolute -left-[20%] -top-[30%] h-[min(90vw,52rem)] w-[min(90vw,52rem)] rounded-full bg-violet-600/[0.12] blur-3xl" />
          <div className="absolute -right-[15%] top-[20%] h-[min(70vw,40rem)] w-[min(70vw,40rem)] rounded-full bg-cyan-500/[0.08] blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-[min(50vw,28rem)] w-[min(50vw,28rem)] rounded-full bg-indigo-600/[0.09] blur-3xl" />
        </div>
      ) : (
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_-30%,rgba(139,92,246,0.06),transparent)]"
          aria-hidden
        />
      )}
      <NavBar />
      <main id="conteudo-principal" className="outline-none" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
