import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TAROT_CARDS } from '../data/cards';
import { SEPHIROT } from '../data/sephirot';

// Tree of Life coordinates - mathematically positioned
const SEPHIROTH_POSITIONS: Record<number, { x: number; y: number }> = {
  1: { x: 300, y: 50 },   // Kether - Crown (Middle Pillar)
  2: { x: 450, y: 150 },  // Chokmah - Wisdom (Right Pillar - Mercy)
  3: { x: 150, y: 150 },  // Binah - Understanding (Left Pillar - Severity)
  4: { x: 450, y: 300 },  // Chesed - Mercy (Right Pillar - Mercy)
  5: { x: 150, y: 300 },  // Geburah - Severity (Left Pillar - Severity)
  6: { x: 300, y: 350 },  // Tiphareth - Beauty (Middle Pillar)
  7: { x: 450, y: 500 },  // Netzach - Victory (Right Pillar - Mercy)
  8: { x: 150, y: 500 },  // Hod - Glory (Left Pillar - Severity)
  9: { x: 300, y: 550 },  // Yesod - Foundation (Middle Pillar)
  10: { x: 300, y: 700 }  // Malkuth - Kingdom (Middle Pillar)
};

interface CardPreviewData {
  card: any;
  x: number;
  y: number;
}

export default function TreeOfLifeMystical() {
  const navigate = useNavigate();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [cardPreview, setCardPreview] = useState<CardPreviewData | null>(null);

  // Handle card click navigation
  const handleCardClick = (card: any) => {
    // Navigate to the card detail page using the card ID
    navigate(`/card/${card.id}`);
  };

  // Generate path line without pattern definition
  const generatePath = (fromId: number, toId: number, card: any) => {
    const from = SEPHIROTH_POSITIONS[fromId];
    const to = SEPHIROTH_POSITIONS[toId];
    const pathId = `${fromId}-${toId}`;
    
    // Calculate path center for card preview positioning
    const centerX = (from.x + to.x) / 2;
    const centerY = (from.y + to.y) / 2;
    
    // Calculate rotation angle for text
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    // Flip text if it would be upside down (angle > 90 or < -90)
    if (angle > 90 || angle < -90) {
      angle += 180;
    }

    // Calculate safe text position to avoid sephiroth overlap
    const sephirahRadius = 40;
    const minDistance = 60; // Minimum distance from sephirah center
    
    // Check if center position is too close to either sephirah
    const distanceToFrom = Math.sqrt((centerX - from.x) ** 2 + (centerY - from.y) ** 2);
    const distanceToTo = Math.sqrt((centerX - to.x) ** 2 + (centerY - to.y) ** 2);
    
    let textX = centerX;
    let textY = centerY;
    
    // If center position is too close to either sephirah, adjust position
    if (distanceToFrom < minDistance || distanceToTo < minDistance) {
      // Move text to 30% along the path from the farther sephirah
      const pathLength = Math.sqrt(dx ** 2 + dy ** 2);
      const unitX = dx / pathLength;
      const unitY = dy / pathLength;
      
      if (distanceToFrom < distanceToTo) {
        // Move away from 'from' sephirah (70% along path)
        textX = from.x + (dx * 0.7);
        textY = from.y + (dy * 0.7);
      } else {
        // Move away from 'to' sephirah (30% along path)
        textX = from.x + (dx * 0.3);
        textY = from.y + (dy * 0.3);
      }
    }

    // Extract just the number/numeral from the card label
    const cardNumber = card.label.split(' ')[0]; // Gets "0", "I", "II", etc.

    return (
      <g key={pathId}>
        {/* Path line with card image fill */}
        <line
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke={`url(#cardPattern-${card.id})`}
          strokeWidth={hoveredPath === pathId ? 35 : 25}
          strokeLinecap="round"
          style={{
            filter: hoveredPath === pathId ? 'drop-shadow(0 0 15px #D4AF37) brightness(1.2)' : 'brightness(0.9)',
            transition: 'all 300ms ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            setHoveredPath(pathId);
            setCardPreview({
              card,
              x: e.clientX,
              y: e.clientY
            });
          }}
          onMouseLeave={() => {
            setHoveredPath(null);
            setCardPreview(null);
          }}
          onClick={() => handleCardClick(card)}
        />

        {/* Path label background */}
        <rect
          x={textX - 15}
          y={textY - 8}
          width="30"
          height="16"
          fill="rgba(0,0,0,0.8)"
          rx="8"
          transform={`rotate(${angle}, ${textX}, ${textY})`}
          style={{
            transition: 'all 300ms ease',
            pointerEvents: 'none'
          }}
        />
        
        {/* Path label */}
        <text
          x={textX}
          y={textY}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="1.5"
          paintOrder="stroke fill"
          fontSize={hoveredPath === pathId ? "14" : "12"}
          fontWeight="bold"
          fontFamily="Cinzel, serif"
          transform={`rotate(${angle}, ${textX}, ${textY})`}
          style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
            filter: hoveredPath === pathId ? 'brightness(1.2) drop-shadow(0 0 4px #FFFFFF)' : 'brightness(1)',
            transition: 'all 300ms ease',
            cursor: 'pointer',
            pointerEvents: 'auto'
          }}
          onClick={() => handleCardClick(card)}
        >
          {cardNumber}
        </text>
      </g>
    );
  };

  return (
    <div className="min-h-screen p-4 overflow-auto" style={{ backgroundColor: '#FFF8E7', color: '#654522' }}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold mb-4" style={{ fontFamily: 'Cinzel, serif', color: '#654522' }}>
          Tree of Life
        </h1>
        <p className="text-xl" style={{ color: '#654522' }}>
          Interactive Qabalistic Tree with Classical Tarot Correspondences
        </p>
      </div>

      {/* Tree SVG */}
      <div className="flex justify-center">
        <svg 
          width="600" 
          height="800" 
          viewBox="0 0 600 800"
          className="border rounded-lg" 
          style={{ borderColor: '#D4AF37', backgroundColor: '#FFFBF0', borderWidth: '3px' }}
        >
          {/* Define all card image patterns once at the top */}
          <defs>
            {TAROT_CARDS.map((card) => (
              <pattern
                key={card.id}
                id={`cardPattern-${card.id}`}
                patternUnits="userSpaceOnUse"
                width="200"
                height="300"
                patternTransform="rotate(0)"
              >
                <image
                  href={card.image}
                  x="-50"
                  y="-75"
                  width="300"
                  height="450"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
            ))}
          </defs>

          {/* Render all paths with card images */}
          {TAROT_CARDS.map((card) => {
            if (card.path) {
              return generatePath(card.path.a, card.path.b, card);
            }
            return null;
          })}

          {/* Render Sephiroth circles */}
          {SEPHIROT.map((sephirah) => {
            const pos = SEPHIROTH_POSITIONS[sephirah.id];
            return (
              <g key={sephirah.id}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="40"
                  fill="#FFFBF0"
                  stroke="#D4AF37"
                  strokeWidth="4"
                  style={{
                    filter: 'drop-shadow(0 0 8px #D4AF37)',
                  }}
                />
                <text
                  x={pos.x}
                  y={pos.y - 5}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#654522"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="Cinzel, serif"
                  style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}
                >
                  {sephirah.title}
                </text>
                <text
                  x={pos.x}
                  y={pos.y + 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#654522"
                  fontSize="10"
                  fontFamily="Cinzel, serif"
                  style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}
                >
                  {sephirah.key}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Card Preview Tooltip */}
      {cardPreview && (
        <div
          className="fixed z-50 border rounded-lg p-4 shadow-xl max-w-sm pointer-events-none"
          style={{
            backgroundColor: '#FFFBF0', 
            borderColor: '#D4AF37', 
            borderWidth: '2px',
            left: cardPreview.x + 15,
            top: cardPreview.y - 50,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="flex items-start gap-3">
            <img
              src={cardPreview.card.image}
              alt={cardPreview.card.label}
              className="w-16 h-24 object-cover rounded border"
              style={{ borderColor: '#D4AF37' }}
            />
            <div>
              <h3 className="font-bold mb-1" style={{ fontFamily: 'Cinzel, serif', color: '#654522' }}>
                {cardPreview.card.label}
              </h3>
              <p className="text-xs mb-1" style={{ color: '#8B6F47' }}>
                <span style={{ color: '#654522', fontWeight: 'bold' }}>Hebrew:</span> {cardPreview.card.hebrewLetter} ({cardPreview.card.hebrewName})
              </p>
              <p className="text-xs mb-1" style={{ color: '#8B6F47' }}>
                <span style={{ color: '#654522', fontWeight: 'bold' }}>Element:</span> {cardPreview.card.element}
              </p>
              <p className="text-xs mb-1" style={{ color: '#8B6F47' }}>
                <span style={{ color: '#654522', fontWeight: 'bold' }}>Path:</span> {cardPreview.card.pathNumber}
              </p>
              <p className="text-xs italic" style={{ color: '#8B6F47' }}>
                {cardPreview.card.note}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 text-center" style={{ color: '#654522' }}>
        <p>Hover over paths to see card details • Click paths to explore cards in detail</p>
      </div>
    </div>
  );
}