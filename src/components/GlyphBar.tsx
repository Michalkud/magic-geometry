import React from 'react';

type PathRef = { a: number; b: number } | null | undefined;

function chipColor(attribution?: string) {
  if (!attribution) return 'from-cyan-400/20 to-blue-400/20 text-slate-100/90';
  const a = attribution.toLowerCase();
  if (a.includes('air')) return 'from-yellow-300/20 to-sky-300/20 text-yellow-200';
  if (a.includes('fire')) return 'from-orange-400/20 to-red-400/20 text-orange-200';
  if (a.includes('water')) return 'from-sky-400/20 to-indigo-400/20 text-sky-200';
  if (a.includes('earth')) return 'from-lime-400/20 to-emerald-400/20 text-lime-200';
  return 'from-fuchsia-400/20 to-violet-400/20 text-fuchsia-200';
}

export default function GlyphBar({
  hebrew,
  attribution,
  pathTitle,
  path,
  tradition = 'thoth',
}: {
  hebrew?: string;
  attribution?: string;
  pathTitle?: string;
  path?: PathRef;
  tradition?: 'thoth' | 'rws' | 'gd';
}) {
  const color = chipColor(attribution);
  const palette: string[] = ((): string[] => {
    if (tradition === 'rws') {
      return ['bg-amber-300', 'bg-blue-300', 'bg-green-300', 'bg-gray-200'];
    }
    if (tradition === 'gd') {
      return ['bg-violet-300', 'bg-indigo-300', 'bg-rose-300', 'bg-zinc-200'];
    }
    // thoth default
    return ['bg-yellow-300', 'bg-sky-300', 'bg-emerald-300', 'bg-slate-200'];
  })();
  return (
    <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-2">
      <button className={`rounded-xl border border-white/10 bg-gradient-to-br ${color} px-3 py-2 text-sm`} title="Hebrew letter">
        <div className="text-[11px] uppercase tracking-wide opacity-70">Hebrew</div>
        <div className="text-base font-semibold">{hebrew || '—'}</div>
      </button>
      <button className={`rounded-xl border border-white/10 bg-gradient-to-br ${color} px-3 py-2 text-sm`} title="Element / Planet / Sign">
        <div className="text-[11px] uppercase tracking-wide opacity-70">Attribution</div>
        <div className="text-base font-semibold">{attribution || '—'}</div>
      </button>
      <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" title="Path title">
        <div className="text-[11px] uppercase tracking-wide opacity-70">Path</div>
        <div className="text-base font-semibold truncate">{pathTitle || (path ? `${path.a} ↔ ${path.b}` : '—')}</div>
      </button>
      <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" title="Palette">
        <div className="text-[11px] uppercase tracking-wide opacity-70">Palette</div>
        <div className="flex items-center gap-1 mt-1" aria-label={`Palette ${tradition.toUpperCase()}`}>
          {palette.map((cls, i) => (
            <span key={i} className={`inline-block h-3 w-3 rounded-full ${cls}`}></span>
          ))}
        </div>
      </button>
    </div>
  );
}


