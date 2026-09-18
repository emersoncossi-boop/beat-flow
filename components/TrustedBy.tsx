export function TrustedBy() {
  return (
    <div className="w-full border-t border-white/10 pt-10 pb-8 mt-12 opacity-70">
      <p className="text-xs font-semibold tracking-[0.2em] text-text-secondary uppercase mb-8">
        Confiado por artistas em todo o mundo
      </p>
      <div className="flex flex-wrap items-center gap-x-12 gap-y-8 grayscale opacity-60">
        <div className="text-xl font-bold tracking-tighter">Pioneer DJ</div>
        <div className="text-xl font-bold tracking-tighter lowercase">beatport</div>
        <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-background text-xs">S</div>
            Spotify
        </div>
        <div className="text-xl font-bold tracking-tighter uppercase">SOUNDCLOUD</div>
        <div className="text-2xl font-black italic">RA</div>
        <div className="text-xl font-bold tracking-tighter lowercase">ticketmaster</div>
      </div>
    </div>
  )
}
