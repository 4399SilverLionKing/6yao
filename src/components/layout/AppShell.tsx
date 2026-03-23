import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-parchment text-ink">
      <header className="border-b border-ink/10 bg-white/50">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link className="text-lg font-semibold tracking-[0.2em]" to="/">
            六爻
          </Link>
          <nav className="text-sm text-ink/70">
            <Link to="/cast">在线起卦</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}

