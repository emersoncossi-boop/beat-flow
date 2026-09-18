import { ReactNode } from 'react';

export const metadata = {
  title: 'Nexora Command Center — Super Admin Beat Flow',
  description: 'Backoffice operacional corporativo, gestão de DJs, split de pagamentos e auditoria de contratos.',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full font-sans antialiased text-slate-900">
      {children}
    </div>
  );
}
