import React from 'react';
import { 
  Calendar, 
  Plus, 
  MapPin, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ChevronLeft, 
  X, 
  ShieldCheck, 
  Lock, 
  CheckSquare, 
  ExternalLink,
  FileText,
  MessageSquare,
  Copy,
  ChevronRight,
  Radio
} from 'lucide-react';

export const AgendaIcon = Calendar;
export const AdicionarIcon = Plus;
export const LocalizacaoIcon = MapPin;
export const ExcluirIcon = Trash2;
export const SucessoIcon = CheckCircle2;
export const RelogioIcon = Clock;
export const EsquerdaIcon = ChevronLeft;
export const FecharIcon = X;
export const SegurancaIcon = ShieldCheck;
export const BloqueadoIcon = Lock;
export const DataConfirmadaIcon = CheckSquare;
export const ExternoIcon = ExternalLink;
export const DocumentoIcon = FileText;
export const MensagensIcon = MessageSquare;
export const CopiarIcon = Copy;
export const DireitaIcon = ChevronRight;
export const WaveformIcon = Radio;

export function StatusIndicator({ 
  status = 'online', 
  size = 'md',
  label,
  className = ''
}: { 
  status?: 'online' | 'offline' | 'busy' | 'confirmado' | 'pendente' | 'recusado'; 
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}) {
  const sizeClass = size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-2.5 h-2.5' : 'w-2 h-2';

  const isGreen = status === 'online' || status === 'confirmado';
  const isAmber = status === 'busy' || status === 'pendente';
  const isRed = status === 'recusado';

  const dot = isGreen ? (
    <span className="relative flex items-center justify-center">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
      <span className={`relative inline-flex rounded-full ${sizeClass} bg-[#10B981] shadow-[0_0_8px_#10B981]`} />
    </span>
  ) : isAmber ? (
    <span className={`inline-flex rounded-full ${sizeClass} bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]`} />
  ) : isRed ? (
    <span className={`inline-flex rounded-full ${sizeClass} bg-[#EF4444] shadow-[0_0_8px_#EF4444]`} />
  ) : (
    <span className={`inline-flex rounded-full ${sizeClass} bg-[#6B7280]`} />
  );

  if (label) {
    const pillStyle = isGreen
      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
      : isAmber
      ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
      : isRed
      ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
      : 'bg-white/10 border-white/20 text-white/70';

    return (
      <span className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${pillStyle} ${className}`}>
        {dot}
        <span>{label}</span>
      </span>
    );
  }

  return dot;
}
export function SpotifyIcon({ className, size }: { className?: string; size?: number | string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.56.3z"/>
    </svg>
  );
}

export function SoundCloudIcon({ className, size }: { className?: string; size?: number | string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M11.75 17.026v-6.906a.2.2 0 00-.203-.2h-.05a.2.2 0 00-.201.2v6.906a.2.2 0 00.201.2h.05a.2.2 0 00.203-.2zm-1.378-7.794v7.794a.2.2 0 01-.202.2h-.05a.2.2 0 01-.201-.2v-7.794a.2.2 0 01.201-.2h.05a.2.2 0 01.202.2zm1.378-4.522v11.776a.2.2 0 01-.203.2h-.05a.2.2 0 01-.201-.2v-11.776a.2.2 0 01.201-.2h.05a.2.2 0 01.203.2zm-2.756 3.992v7.784a.2.2 0 01-.202.2h-.05a.2.2 0 01-.2-.2v-7.784a.2.2 0 01.2-.2h.05a.2.2 0 01.202.2zm4.134-2.846v10.63a.2.2 0 01-.202.2h-.05a.2.2 0 01-.202-.2v-10.63a.2.2 0 01.202-.2h.05a.2.2 0 01.202.2zm1.378 10.63V4.498a.2.2 0 00-.201-.2h-.051a.2.2 0 00-.201.2v12.388a.2.2 0 00.201.2h.05a.2.2 0 00.202-.2zm1.378-.04V6.438a.2.2 0 00-.201-.2h-.052a.2.2 0 00-.202.2v10.408a.2.2 0 00.202.2h.052a.2.2 0 00.201-.2zm1.378-.052V8.348a.2.2 0 00-.202-.2h-.052a.2.2 0 00-.202.2v8.448a.2.2 0 00.202.2h.052a.2.2 0 00.202-.2zm1.378-.172v-6.31a.2.2 0 00-.202-.2h-.052a.2.2 0 00-.201.2v6.31a.2.2 0 00.201.2h.052a.2.2 0 00.202-.2zm1.378-.292v-4.3a.2.2 0 00-.202-.2h-.052a.2.2 0 00-.201.2v4.3a.2.2 0 00.201.2h.052a.2.2 0 00.202-.2zm-12.4-7.5v8.034a.2.2 0 01-.202.2h-.05a.2.2 0 01-.2-.2v-8.034a.2.2 0 01.2-.2h.05a.2.2 0 01.202.2zm-1.378 1.48v6.554a.2.2 0 01-.201.2h-.051a.2.2 0 01-.201-.2V9.82a.2.2 0 01.201-.2h.05a.2.2 0 01.202.2zm-1.378.96v5.594a.2.2 0 01-.201.2h-.051a.2.2 0 01-.201-.2V10.78a.2.2 0 01.201-.2h.05a.2.2 0 01.202.2zm-1.378.96v4.634a.2.2 0 01-.2.2h-.052a.2.2 0 01-.201-.2V11.74a.2.2 0 01.201-.2h.05a.2.2 0 01.2.2zm-1.378.96v3.674a.2.2 0 01-.201.2h-.05a.2.2 0 01-.202-.2V12.7a.2.2 0 01.202-.2h.05a.2.2 0 01.201.2zm-1.378 1.34v2.334a.2.2 0 01-.2.2h-.052a.2.2 0 01-.201-.2V14.04a.2.2 0 01.201-.2h.05a.2.2 0 01.2.2zm-2.066.862v.51a.2.2 0 01-.2.2H.2a.2.2 0 01-.2-.2v-.51a.2.2 0 01.2-.2h.918a.2.2 0 01.2.2zM23.8 17.026a.2.2 0 01-.2.2h-.596a5.756 5.756 0 01-1.74-10.985v10.583a.2.2 0 01-.202.2h-.05a.2.2 0 01-.2-.2V8.955a5.748 5.748 0 012.988 10.158z"/>
    </svg>
  );
}


export function VerificadoBadge({ className = '', size }: { className?: string; size?: number }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded border border-[#00D1FF]/30 bg-[#00D1FF]/10 text-[10px] font-mono uppercase tracking-widest text-[#00D1FF] ${className}`}>
      <ShieldCheck className="w-3 h-3" />
      <span>Verificado</span>
    </span>
  );
}
export function GenreTag({ genre, className = '', size = 'md', active = false, onClick }: { genre: string; className?: string; size?: 'sm' | 'md' | 'lg' | string; active?: boolean; onClick?: () => void }) {
  const sizeClass = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : size === 'lg' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs';
  const activeClass = active ? 'bg-[#8A3FFC] text-white border-[#8A3FFC]' : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white';
  
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`inline-flex items-center rounded-full font-medium border transition-colors ${sizeClass} ${activeClass} ${className}`}>
        {genre}
      </button>
    );
  }
  
  return (
    <span className={`inline-flex items-center rounded-full font-medium border transition-colors ${sizeClass} ${activeClass} ${className}`}>
      {genre}
    </span>
  );
}
