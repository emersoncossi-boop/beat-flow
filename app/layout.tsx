import "./globals.css";
import { ReactNode } from "react";
import { AppProviders } from "@/components/providers/AppProviders";
import { MobileBottomNav } from "@/components/ui/MobileBottomNav";

export const metadata = {
  title: "Beat Flow \u2014 O primeiro link inteligente para DJs",
  description: "Crie um perfil profissional para DJ com m\u00fasica, agenda, disponibilidade e pedidos de proposta em um \u00fanico link.",
  openGraph: {
    title: "Beat Flow \u2014 O primeiro link inteligente para DJs",
    description: "Crie um perfil profissional para DJ com m\u00fasica, agenda, disponibilidade e pedidos de proposta em um \u00fanico link.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <body className="antialiased bg-[#08080F] text-white min-h-screen font-sans selection:bg-[#8A3FFC] selection:text-white overflow-x-hidden">
        <AppProviders>
          {children}
          <MobileBottomNav />
        </AppProviders>
      </body>
    </html>
  );
}
