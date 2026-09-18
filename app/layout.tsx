import "./globals.css";
import { ReactNode } from "react";
import { AppProviders } from "@/components/providers/AppProviders";
import { MobileBottomNav } from "@/components/ui/MobileBottomNav";

export const metadata = {
  title: "Beat Flow — O primeiro link inteligente para DJs",
  description: "Crie um perfil profissional para DJ com música, agenda, disponibilidade e pedidos de proposta em um único link.",
  openGraph: {
    title: "Beat Flow — O primeiro link inteligente para DJs",
    description: "Crie um perfil profissional para DJ com música, agenda, disponibilidade e pedidos de proposta em um único link.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <body className="antialiased bg-[#08080F] text-white min-h-screen font-sans selection:bg-[#8A3FFC] selection:text-white pb-16 md:pb-0 overflow-x-hidden">
        <AppProviders>
          {children}
          <MobileBottomNav />
        </AppProviders>
      </body>
    </html>
  );
}
