import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Certigrid",
  description: "Renewable energy certificate traceability MVP on Solana Devnet."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="topbar">
            <div className="topbar__inner">
              <Link className="brand" href="/">
                <strong>Certigrid</strong>
                <span>Renewable certificate traceability</span>
              </Link>
              <nav className="nav" aria-label="Primary navigation">
                <Link href="/admin">Admin</Link>
                <Link href="/marketplace">Marketplace</Link>
                <Link href="/portfolio">Portfolio</Link>
                <Link href="/audit">Audit</Link>
              </nav>
            </div>
          </header>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
