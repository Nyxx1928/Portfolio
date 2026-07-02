'use client';

import { Project } from '@/types';
import { MangaImage } from '@/components/manga/MangaImage';
import { HalftonePattern } from '@/components/manga/HalftonePattern';

interface TradingCardFrontProps {
  project: Project;
}

function RarityBadge({ rarity }: { rarity: Project['rarity'] }) {
  const stars = rarity === 'rare' ? '★★★' : rarity === 'uncommon' ? '★★' : '★';
  const label = rarity === 'rare' ? 'RARE' : rarity === 'uncommon' ? 'UNCOMMON' : 'COMMON';

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg tracking-wider">{stars}</span>
      <span className="text-[10px] font-heading uppercase tracking-widest">{label}</span>
    </div>
  );
}

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-mono uppercase">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="stat-bar h-3">
        <div
          className="stat-bar-fill"
          style={{ width: `${value}%` }}
          data-testid={`stat-bar-${label.toLowerCase()}`}
        />
      </div>
    </div>
  );
}

export function TradingCardFront({ project }: TradingCardFrontProps) {
  return (
    <div className="space-y-3">
      <div className="relative w-full h-40 overflow-hidden border border-manga-black bg-manga-gray-200">
        <MangaImage
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          wrapperClassName="absolute inset-0"
        />
        <HalftonePattern intensity="light" className="z-10" />
      </div>

      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-heading uppercase leading-tight line-clamp-2 flex-1">
          {project.title}
        </h3>
        <span className="text-[10px] font-mono text-manga-gray-600 shrink-0">
          {project.cardNumber}
        </span>
      </div>

      <RarityBadge rarity={project.rarity || 'common'} />

      <div className="space-y-1.5">
        <StatBar label="CODE" value={project.stats.code} />
        <StatBar label="DESIGN" value={project.stats.design} />
        <StatBar label="INNOVATION" value={project.stats.innovation} />
      </div>
    </div>
  );
}
