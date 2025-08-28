import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TAROT_CARDS, PATHS, SEPHIROTH, SEPHIROTH_POSITIONS, SEPHIROTH_COLORS, CARD_MEANINGS } from '../data/tarotData';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import TravelMode from './TravelMode';


export default function TreeOfLifeMystical() {
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [showCardsMode, setShowCardsMode] = useState(false);
  const [travelMode, setTravelMode] = useState(false);
  const [travelModeStartCard, setTravelModeStartCard] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  
  // Window size tracking for responsive layout
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Ref for SVG element to enable coordinate transformations
  const svgRef = React.useRef<SVGSVGElement>(null);

  // Calculate responsive Sephiroth positions and scale factors
  const { responsiveSephirothPositions, scaleX, scaleY } = useMemo(() => {
    const availableWidth = windowSize.width;
    const availableHeight = windowSize.height - 120;
    const TREE_CENTER_X = availableWidth / 2;
    const TREE_CENTER_Y = availableHeight / 2;
    
    // Scale the tree appropriately for expanded coordinates
    const treeWidth = Math.min(availableWidth * 1.2, availableHeight * 0.8);
    const treeHeight = treeWidth * 1.3; // Tree is taller than wide
    
    // Scale factor from expanded coordinate system
    const scaleX = treeWidth / 440; // Original tree width now spans ~440 units (720-280)
    const scaleY = treeHeight / 880; // Original tree height spans ~880 units (980-100)
    
    // Generate responsive positions based on original proportions
    const responsivePositions: { [key: number]: { x: number; y: number } } = {};
    
    Object.entries(SEPHIROTH_POSITIONS).forEach(([id, pos]) => {
      // Convert from original 1000x1000 coordinate system to responsive
      const originalCenterX = 500;
      const originalCenterY = 500;
      
      // Calculate relative position from original center
      const relativeX = (pos.x - originalCenterX) * scaleX;
      const relativeY = (pos.y - originalCenterY) * scaleY;
      
      // Position relative to new tree center
      responsivePositions[parseInt(id)] = {
        x: TREE_CENTER_X + relativeX,
        y: TREE_CENTER_Y + relativeY
      };
    });
    
    return { 
      responsiveSephirothPositions: responsivePositions, 
      scaleX, 
      scaleY 
    };
  }, [windowSize]);

  // Handle path click to navigate to card detail page or start travel mode
  const handlePathClick = (cardId: string) => {
    if (travelMode) {
      // If travel mode is active, start from this card
      setTravelModeStartCard(cardId);
    } else {
      // Normal navigation to detail page
      navigate(`/card/${cardId}`);
    }
  };

  // Start travel mode from the first card
  const startTravelMode = () => {
    setTravelMode(true);
    setTravelModeStartCard(undefined); // Start from beginning
  };

  // Close travel mode
  const closeTravelMode = () => {
    setTravelMode(false);
    setTravelModeStartCard(undefined);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative text-center py-1 backdrop-blur-sm bg-background/50 border-b border-border/30">
        <h1 className="text-xl font-mystical text-foreground mystical-glow">
          Tree of Life
        </h1>
        
        {/* Display Mode Toggle */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="cards-mode"
              checked={showCardsMode}
              onCheckedChange={(checked) => setShowCardsMode(checked === true)}
              className="data-[state=checked]:bg-amber-400/90 data-[state=checked]:border-amber-400"
            />
            <label 
              htmlFor="cards-mode" 
              className="text-sm text-amber-200 font-medium cursor-pointer hover:text-amber-100 transition-colors"
            >
              Show Cards
            </label>
          </div>
          
          {/* Travel Mode Button */}
          <Button
            onClick={startTravelMode}
            size="sm"
            variant="outline"
            className="border-amber-400/50 text-amber-200 hover:bg-amber-400/20 hover:text-amber-100 text-xs"
          >
            Travel Mode
          </Button>
        </div>
      </div>

      {/* Main Content - Allow scrolling for large tree */}
      <div className="relative w-full h-full p-2 overflow-auto">
        <div className="relative w-full h-full min-h-screen">
          
          {/* Tree SVG - Responsive Full Screen */}
          <div className="w-full h-full">
            <svg 
              ref={svgRef}
              width="100%" 
              height="100%" 
              viewBox={`0 0 ${windowSize.width} ${windowSize.height - 120}`}
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                  {/* Define patterns for card images */}
                  {TAROT_CARDS.map((card) => (
                    <pattern
                      key={`pattern-${card.id}`}
                      id={`pattern-${card.id}`}
                      patternUnits="userSpaceOnUse"
                      width="60"
                      height="110"
                      x="0"
                      y="0"
                    >
                      <image
                        href={card.image}
                        x="-20"
                        y="-20"
                        width="100"
                        height="150"
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </pattern>
                  ))}

                  {/* Gradient definitions for Sephiroth */}
                  {Object.entries(SEPHIROTH_COLORS).map(([id, gradient]) => (
                    <linearGradient key={`grad-${id}`} id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" className={`${gradient.split(' ')[0]}`} />
                      <stop offset="100%" className={`${gradient.split(' ')[2]}`} />
                    </linearGradient>
                  ))}
                </defs>

                {/* Draw Paths */}
                {PATHS.map((path) => {
                  const from = responsiveSephirothPositions[path.from];
                  const to = responsiveSephirothPositions[path.to];
                  const card = TAROT_CARDS.find(c => c.id === path.card);
                  const midX = (from.x + to.x) / 2;
                  const midY = (from.y + to.y) / 2;
                  const isHovered = hoveredPath === path.card;
                  const pathKey = `${path.from}-${path.to}`;
                  
                  // Calculate rotation angle for card placement
                  const angle = Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI;
                  
                  // Calculate card dimensions based on tree scale (ensure minimum size)
                  const cardWidth = Math.max(50, 45 * (scaleX + scaleY) / 2);
                  const cardHeight = cardWidth * 1.6; // Tarot card aspect ratio
                  
                  return (
                    <g key={`path-${pathKey}`}>
                      {showCardsMode && card ? (
                        /* Card Mode: Show actual card image */
                        <g 
                          transform={`translate(${midX}, ${midY})`}
                          className="cursor-pointer transition-all duration-500"
                          style={{ 
                            opacity: showCardsMode ? 1 : 0,
                            transform: `translate(${midX}px, ${midY}px) ${isHovered ? 'scale(1.05)' : 'scale(1)'}` 
                          }}
                          onMouseEnter={() => setHoveredPath(path.card)}
                          onMouseLeave={() => setHoveredPath(null)}
                          onClick={() => handlePathClick(path.card)}
                        >
                          {/* Connecting line (thin) */}
                          <line
                            x1={from.x - midX}
                            y1={from.y - midY}
                            x2={to.x - midX}
                            y2={to.y - midY}
                            stroke="rgba(251, 191, 36, 0.2)"
                            strokeWidth="1"
                            className="transition-all duration-300"
                          />
                          
                          {/* Card background/border */}
                          <rect
                            x={-cardWidth / 2}
                            y={-cardHeight / 2}
                            width={cardWidth}
                            height={cardHeight}
                            fill="rgba(0, 0, 0, 0.8)"
                            stroke="#fbbf24"
                            strokeWidth={isHovered ? "3" : "2"}
                            rx="4"
                            className="transition-all duration-300"
                            style={{
                              filter: isHovered 
                                ? 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.8))' 
                                : 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.4))'
                            }}
                          />
                          
                          {/* Card image */}
                          <image
                            href={card.image}
                            x={-cardWidth / 2 + 2}
                            y={-cardHeight / 2 + 2}
                            width={cardWidth - 4}
                            height={cardHeight - 4}
                            preserveAspectRatio="xMidYMid slice"
                            rx="2"
                            className="transition-all duration-300"
                            style={{
                              opacity: isHovered ? 0.95 : 0.85
                            }}
                          />
                          
                          {/* Card label below */}
                          <text
                            x={0}
                            y={cardHeight / 2 + 15}
                            textAnchor="middle"
                            className={`text-xs font-semibold drop-shadow-lg transition-all duration-300 ${
                              isHovered ? 'fill-yellow-100' : 'fill-amber-200'
                            }`}
                            style={{
                              filter: isHovered 
                                ? 'drop-shadow(2px 2px 4px rgba(0,0,0,0.9))' 
                                : 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'
                            }}
                          >
                            {card.label}
                          </text>
                        </g>
                      ) : (
                        /* Line Mode: Show paths as lines */
                        <g 
                          className="transition-all duration-500"
                          style={{ opacity: !showCardsMode ? 1 : 0 }}
                        >
                          {/* Path with card image background */}
                          <line
                            x1={from.x}
                            y1={from.y}
                            x2={to.x}
                            y2={to.y}
                            stroke={card ? `url(#pattern-${card.id})` : 'rgba(251, 191, 36, 0.6)'}
                            strokeWidth={isHovered ? "35" : "25"}
                            className="transition-all duration-300 cursor-pointer"
                            style={{
                              filter: isHovered ? 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.8))' : 'none'
                            }}
                            onMouseEnter={() => setHoveredPath(path.card)}
                            onMouseLeave={() => setHoveredPath(null)}
                            onClick={() => handlePathClick(path.card)}
                          />
                          
                          {/* Path stroke outline */}
                          <line
                            x1={from.x}
                            y1={from.y}
                            x2={to.x}
                            y2={to.y}
                            stroke={isHovered ? "rgba(251, 191, 36, 0.6)" : "rgba(251, 191, 36, 0.3)"}
                            strokeWidth={isHovered ? "37" : "27"}
                            fill="none"
                            className="pointer-events-none transition-all duration-300"
                          />
                          
                          {/* Card name label */}
                          {card && (
                            <text
                              x={midX}
                              y={midY}
                              textAnchor="middle"
                              className={`text-xs font-semibold drop-shadow-lg transition-all duration-300 cursor-pointer ${
                                isHovered ? 'fill-yellow-100 text-sm' : 'fill-amber-200'
                              }`}
                              style={{
                                filter: isHovered 
                                  ? 'drop-shadow(2px 2px 4px rgba(0,0,0,0.9))' 
                                  : 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'
                              }}
                              onMouseEnter={() => setHoveredPath(path.card)}
                              onMouseLeave={() => setHoveredPath(null)}
                              onClick={() => handlePathClick(path.card)}
                            >
                              {card.label}
                            </text>
                          )}
                        </g>
                      )}
                    </g>
                  );
                })}


                {/* Draw Sephiroth */}
                {Object.entries(responsiveSephirothPositions).map(([id, pos]) => {
                  const sephirah = SEPHIROTH[id as any];
                  return (
                    <g key={id} transform={`translate(${pos.x}, ${pos.y})`}>
                      {/* Glow effect */}
                      <circle
                        r="42"
                        fill={`url(#grad-${id})`}
                        opacity="0.3"
                        filter="blur(8px)"
                      />
                      
                      {/* Main circle */}
                      <circle
                        r="38"
                        fill={`url(#grad-${id})`}
                        stroke="#fbbf24"
                        strokeWidth="2"
                        className="drop-shadow-lg"
                      />
                      
                      {/* Number */}
                      <text
                        y={-18}
                        textAnchor="middle"
                        className="text-sm font-bold fill-white drop-shadow"
                      >
                        {id}
                      </text>

                      {/* Hebrew */}
                      <text
                        y={0}
                        textAnchor="middle"
                        className="text-xl font-bold fill-white drop-shadow"
                      >
                        {sephirah.hebrew}
                      </text>

                      {/* Name */}
                      <text
                        y={18}
                        textAnchor="middle"
                        className="text-xs fill-amber-200 font-mystical"
                      >
                        {sephirah.name}
                      </text>
                    </g>
                  );
                })}

              </svg>
            </div>
          </div>

          {/* Card Preview Overlay */}
          {hoveredPath && (
            <div className="absolute top-4 right-4 z-50 animate-in fade-in-0 slide-in-from-right-2 duration-300">
              {(() => {
                const card = TAROT_CARDS.find(c => c.id === hoveredPath);
                const cardMeaning = CARD_MEANINGS[hoveredPath];
                
                if (!card || !cardMeaning) return null;
                
                return (
                  <div className="bg-black/90 backdrop-blur-sm border border-amber-400/30 rounded-lg p-4 max-w-sm shadow-2xl">
                    {/* Card Image */}
                    <div className="mb-3">
                      <img 
                        src={card.image} 
                        alt={card.label}
                        className="w-20 h-32 object-cover mx-auto rounded-md border border-amber-400/50"
                      />
                    </div>
                    
                    {/* Card Title */}
                    <h3 className="text-amber-400 font-mystical text-lg text-center mb-2 mystical-glow">
                      {card.label}
                    </h3>
                    
                    {/* Card Details */}
                    <div className="space-y-2 text-sm">
                      <div className="text-amber-200">
                        <span className="text-amber-400 font-semibold">Path:</span> {card.hebrewLetter} ({card.hebrewName})
                      </div>
                      <div className="text-amber-200">
                        <span className="text-amber-400 font-semibold">Element:</span> {card.element}
                      </div>
                      <div className="text-amber-200">
                        <span className="text-amber-400 font-semibold">Trump:</span> {card.trumpNumber}
                      </div>
                    </div>
                    
                    {/* Card Meaning */}
                    <div className="mt-3 pt-3 border-t border-amber-400/30">
                      <p className="text-amber-100 text-xs leading-relaxed">
                        {cardMeaning.meaning}
                      </p>
                    </div>
                    
                    {/* Key Symbols */}
                    {cardMeaning.symbols && (
                      <div className="mt-3 pt-3 border-t border-amber-400/30">
                        <div className="text-amber-400 text-xs font-semibold mb-1">Key Symbols:</div>
                        <div className="flex flex-wrap gap-1">
                          {cardMeaning.symbols.slice(0, 3).map((symbol, i) => (
                            <span key={i} className="bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded-full text-xs">
                              {symbol}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

      </div>

      {/* Travel Mode */}
      <TravelMode
        isOpen={travelMode}
        onClose={closeTravelMode}
        initialCardId={travelModeStartCard}
      />

    </div>
  );
}