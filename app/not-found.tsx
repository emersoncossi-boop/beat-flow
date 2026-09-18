import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#08080F] text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-black text-white/90 mb-2">404</h1>
      <p className="text-white/60 mb-6 text-sm">Página não encontrada ou link expirado.</p>
      <Link 
        href="/"
        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8A3FFC] to-[#00D1FF] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-90 transition-opacity"
      >
        Voltar para a Home
      </Link>
    </div>
  );
}
