import React, { useState } from 'react';
import { SymbolIcon } from './icons/SymbolIcon';
import { Link } from 'react-router-dom';

export type Correspondence = {
  category: string;
  icon?: string;
  items: Array<{
    label: string;
    value: string | string[];
    link?: string;
    color?: string;
  }>;
};

export type CorrespondenceRailProps = {
  correspondences: Correspondence[];
  cardId: string;
  cardName: string;
  colorScale?: 'king' | 'queen' | 'emperor' | 'empress';
  onColorScaleChange?: (scale: 'king' | 'queen' | 'emperor' | 'empress') => void;
  className?: string;
};

export default function CorrespondenceRail({
  correspondences,
  cardId,
  cardName,
  colorScale = 'king',
  onColorScaleChange,
  className = '',
}: CorrespondenceRailProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['Primary', 'Qabalah', 'Astrology'])
  );

  const toggleSection = (category: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const colorScales = [
    { id: 'king', label: 'King', color: '#fbbf24' },
    { id: 'queen', label: 'Queen', color: '#60a5fa' },
    { id: 'emperor', label: 'Emperor', color: '#34d399' },
    { id: 'empress', label: 'Empress', color: '#f472b6' },
  ];

  return (
    <div className={`bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4 ${className}`}>
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-sm font-bold text-cyan-100 mb-2">
          Correspondences
        </h3>
        <div className="text-xs text-slate-400">
          {cardName}
        </div>
      </div>

      {/* Color Scale Switcher */}
      {onColorScaleChange && (
        <div className="mb-4 p-3 bg-white/5 rounded-lg">
          <div className="text-[10px] uppercase tracking-wide text-slate-400 mb-2">
            Color Scale
          </div>
          <div className="grid grid-cols-2 gap-1">
            {colorScales.map(scale => (
              <button
                key={scale.id}
                onClick={() => onColorScaleChange(scale.id as any)}
                className={`
                  px-2 py-1 text-[10px] rounded border transition-all
                  ${colorScale === scale.id
                    ? 'border-current bg-current/20'
                    : 'border-white/20 bg-white/5 hover:bg-white/10'
                  }
                `}
                style={{
                  color: colorScale === scale.id ? scale.color : undefined,
                  borderColor: colorScale === scale.id ? scale.color : undefined,
                }}
              >
                {scale.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Correspondence Sections */}
      <div className="space-y-2">
        {correspondences.map(section => {
          const isExpanded = expandedSections.has(section.category);
          
          return (
            <div
              key={section.category}
              className="border border-white/10 rounded-lg overflow-hidden"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.category)}
                className="w-full px-3 py-2 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {section.icon && (
                    <SymbolIcon
                      name={section.icon}
                      size={14}
                      className="text-cyan-300"
                    />
                  )}
                  <span className="text-xs font-medium text-slate-200">
                    {section.category}
                  </span>
                </div>
                <svg
                  className={`w-3 h-3 text-slate-400 transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Section Content */}
              {isExpanded && (
                <div className="p-3 bg-white/[0.02] space-y-2">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[10px] text-slate-500 min-w-[60px]">
                        {item.label}:
                      </span>
                      <div className="flex-1">
                        {Array.isArray(item.value) ? (
                          <div className="flex flex-wrap gap-1">
                            {item.value.map((v, i) => (
                              <Chip
                                key={i}
                                value={v}
                                link={item.link}
                                color={item.color}
                              />
                            ))}
                          </div>
                        ) : (
                          <Chip
                            value={item.value}
                            link={item.link}
                            color={item.color}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-[10px] uppercase tracking-wide text-slate-400 mb-2">
          Quick Links
        </div>
        <div className="flex flex-wrap gap-1">
          <Link
            to={`/cards/${cardId}`}
            className="px-2 py-1 text-[10px] rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
          >
            Card Details
          </Link>
          <button
            className="px-2 py-1 text-[10px] rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 hover:bg-violet-500/20 transition-colors"
            onClick={() => console.log('Navigate to Tree path')}
          >
            View on Tree
          </button>
          <button
            className="px-2 py-1 text-[10px] rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
            onClick={() => console.log('Study this card')}
          >
            Study Mode
          </button>
        </div>
      </div>
    </div>
  );
}

// Chip component for individual correspondence values
function Chip({ 
  value, 
  link, 
  color 
}: { 
  value: string; 
  link?: string; 
  color?: string;
}) {
  const chipClass = `
    inline-block px-2 py-0.5 text-[10px] rounded-full 
    border transition-colors cursor-pointer
    ${color ? '' : 'bg-white/5 text-slate-300 border-white/20 hover:bg-white/10'}
  `;

  const content = (
    <span
      className={chipClass}
      style={color ? {
        backgroundColor: `${color}20`,
        color: color,
        borderColor: `${color}40`,
      } : undefined}
    >
      {value}
    </span>
  );

  if (link) {
    return (
      <Link to={link}>
        {content}
      </Link>
    );
  }

  return content;
}

// Helper function to create correspondences from card data
export function createCorrespondencesFromCard(cardData: any): Correspondence[] {
  const correspondences: Correspondence[] = [];

  // Primary correspondences
  if (cardData.correspondences) {
    const primary: Correspondence = {
      category: 'Primary',
      icon: 'star',
      items: [],
    };

    if (cardData.correspondences.hebrew_letter) {
      primary.items.push({
        label: 'Hebrew',
        value: `${cardData.correspondences.hebrew_value} (${cardData.correspondences.hebrew_letter})`,
        color: '#06b6d4',
      });
    }

    if (cardData.correspondences.path_number) {
      primary.items.push({
        label: 'Path',
        value: `${cardData.correspondences.path_number} - ${cardData.correspondences.path_name || ''}`,
        link: `/tree?path=${cardData.correspondences.path_number}`,
        color: '#a78bfa',
      });
    }

    if (cardData.correspondences.element) {
      primary.items.push({
        label: 'Element',
        value: cardData.correspondences.element,
        color: getElementColor(cardData.correspondences.element),
      });
    }

    correspondences.push(primary);
  }

  // Qabalah correspondences
  if (cardData.correspondences) {
    const qabalah: Correspondence = {
      category: 'Qabalah',
      icon: 'hexagram',
      items: [],
    };

    if (cardData.correspondences.sephiroth_from) {
      qabalah.items.push({
        label: 'From',
        value: cardData.correspondences.sephiroth_from,
        link: `/tree?sephira=${cardData.correspondences.sephiroth_from}`,
        color: '#fbbf24',
      });
    }

    if (cardData.correspondences.sephiroth_to) {
      qabalah.items.push({
        label: 'To',
        value: cardData.correspondences.sephiroth_to,
        link: `/tree?sephira=${cardData.correspondences.sephiroth_to}`,
        color: '#fbbf24',
      });
    }

    if (cardData.correspondences.magical_weapon) {
      qabalah.items.push({
        label: 'Weapon',
        value: cardData.correspondences.magical_weapon,
      });
    }

    correspondences.push(qabalah);
  }

  // Astrological correspondences
  if (cardData.correspondences?.astrology) {
    const astrology: Correspondence = {
      category: 'Astrology',
      icon: 'star',
      items: [],
    };

    if (cardData.correspondences.astrology.sign) {
      astrology.items.push({
        label: 'Sign',
        value: cardData.correspondences.astrology.sign,
        link: `/zodiac?sign=${cardData.correspondences.astrology.sign}`,
        color: '#60a5fa',
      });
    }

    if (cardData.correspondences.astrology.planet) {
      astrology.items.push({
        label: 'Planet',
        value: cardData.correspondences.astrology.planet,
        color: '#f472b6',
      });
    }

    if (cardData.correspondences.astrology.decan) {
      astrology.items.push({
        label: 'Decan',
        value: cardData.correspondences.astrology.decan,
        link: `/zodiac?decan=${cardData.correspondences.astrology.decan}`,
      });
    }

    correspondences.push(astrology);
  }

  // Alchemical correspondences
  if (cardData.correspondences?.alchemy && cardData.correspondences.alchemy.length > 0) {
    correspondences.push({
      category: 'Alchemy',
      icon: 'triangle',
      items: [{
        label: 'Principles',
        value: cardData.correspondences.alchemy,
        color: '#10b981',
      }],
    });
  }

  // Natural correspondences
  const natural: Correspondence = {
    category: 'Natural',
    icon: 'earth',
    items: [],
  };

  if (cardData.correspondences?.animal) {
    natural.items.push({
      label: 'Animal',
      value: cardData.correspondences.animal,
    });
  }

  if (cardData.correspondences?.plant) {
    natural.items.push({
      label: 'Plant',
      value: cardData.correspondences.plant,
    });
  }

  if (cardData.correspondences?.mineral) {
    natural.items.push({
      label: 'Mineral',
      value: cardData.correspondences.mineral,
    });
  }

  if (cardData.correspondences?.perfume) {
    natural.items.push({
      label: 'Perfume',
      value: cardData.correspondences.perfume,
    });
  }

  if (natural.items.length > 0) {
    correspondences.push(natural);
  }

  // Color scales
  if (cardData.correspondences?.color_scales) {
    const colors: Correspondence = {
      category: 'Color Scales',
      icon: 'circle',
      items: [],
    };

    Object.entries(cardData.correspondences.color_scales).forEach(([scale, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        colors.items.push({
          label: scale.charAt(0).toUpperCase() + scale.slice(1),
          value: values,
          color: getScaleColor(scale),
        });
      }
    });

    if (colors.items.length > 0) {
      correspondences.push(colors);
    }
  }

  return correspondences;
}

function getElementColor(element: string): string {
  const colors: Record<string, string> = {
    Fire: '#ef4444',
    Water: '#3b82f6',
    Air: '#eab308',
    Earth: '#22c55e',
  };
  return colors[element] || '#94a3b8';
}

function getScaleColor(scale: string): string {
  const colors: Record<string, string> = {
    king: '#fbbf24',
    queen: '#60a5fa',
    emperor: '#34d399',
    empress: '#f472b6',
  };
  return colors[scale] || '#94a3b8';
}