import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { TAROT_CARDS } from "@/data/cards";
import { CARD_MEANINGS } from "@/data/cardMeanings";
import { CARD_SYMBOLS } from "@/data/cardSymbols";
import { MAJORS_META, type MajorMeta } from "@/data/majorsMeta";
import { SEPHIROT, SEPHIROT_MEANINGS, type Sephirah } from "@/data/sephirot";
import { DECANS, type Decan } from "@/data/decans";
import { RWS_CARD_SYMBOLS } from "@/data/rwsCardSymbols";
import { MINOR_CARDS } from "@/data/minors";
import { getSymbolsWithImages } from "@/data/allSymbols";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Dark Mystical Thoth Death Card Page
 * Enhanced with shadcn/ui components and atmospheric dark theme
 */

const layerDefs = [
  { id: "animal", label: "Animals", color: "from-emerald-500 to-green-600" },
  { id: "mythic", label: "Mythic", color: "from-purple-500 to-violet-600" },
  { id: "alchemical", label: "Alchemical", color: "from-amber-500 to-orange-600" },
  { id: "object", label: "Objects", color: "from-blue-500 to-indigo-600" },
  { id: "celestial", label: "Celestial", color: "from-yellow-400 to-amber-500" },
  { id: "kabbalah", label: "Kabbalah", color: "from-rose-500 to-pink-600" },
  { id: "geometry", label: "Geometry", color: "from-cyan-500 to-teal-600" },
];

// Color schemes for different astrological elements
const colorMaps = {
  Air: { king: "bg-gradient-to-r from-yellow-400 to-amber-500", queen: "bg-gradient-to-r from-purple-400 to-violet-500", prince: "bg-gradient-to-r from-blue-400 to-indigo-500", princess: "bg-gradient-to-r from-emerald-400 to-green-500" },
  Water: { king: "bg-gradient-to-r from-blue-500 to-indigo-600", queen: "bg-gradient-to-r from-emerald-500 to-teal-600", prince: "bg-gradient-to-r from-amber-500 to-orange-600", princess: "bg-gradient-to-r from-rose-500 to-pink-600" },
  Fire: { king: "bg-gradient-to-r from-red-500 to-orange-600", queen: "bg-gradient-to-r from-blue-500 to-indigo-600", prince: "bg-gradient-to-r from-yellow-400 to-amber-500", princess: "bg-gradient-to-r from-emerald-500 to-green-600" },
  Earth: { king: "bg-gradient-to-r from-amber-600 to-yellow-600", queen: "bg-gradient-to-r from-emerald-600 to-green-600", prince: "bg-gradient-to-r from-red-600 to-rose-600", princess: "bg-gradient-to-r from-blue-600 to-indigo-600" },
  Scorpio: { king: "bg-gradient-to-r from-yellow-500 to-green-500", queen: "bg-gradient-to-r from-emerald-600 to-teal-600", prince: "bg-gradient-to-r from-yellow-300 to-amber-400", princess: "bg-gradient-to-r from-yellow-100 to-amber-200" },
};

function CardArtwork({ card }: { card: any }) {
  return (
    <div className="card-artwork aspect-[3/5] w-full">
      {/* Card Image */}
      <img 
        src={card.image} 
        alt={card.label}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Mystical Overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(120% 80% at 30% 20%, rgba(270, 100%, 70%, 0.1) 0%, rgba(45, 100%, 65%, 0.2) 45%, rgba(270, 100%, 70%, 0.05) 100%)",
        }}
      />

      {/* Hebrew Letter */}
      <div className="hebrew-letter absolute left-3 bottom-3 text-4xl leading-none">
        {card.hebrewLetter}
      </div>
      
      {/* Card Title */}
      <div className="absolute right-3 bottom-3 text-right">
        <div className="text-xs tracking-widest text-amber-300/90 drop-shadow">
          {card.trumpNumber}
        </div>
        <div className="card-title text-xl font-semibold">
          {card.label}
        </div>
      </div>
    </div>
  );
}

function ColorBar({ element }: { element: string }) {
  const scales = colorMaps[element as keyof typeof colorMaps] || colorMaps.Air;
  const entries = [
    ["King", scales.king],
    ["Queen", scales.queen],
    ["Prince", scales.prince],
    ["Princess", scales.princess],
  ];
  
  return (
    <div className="space-y-3">
      {entries.map(([label, colorClass]) => (
        <div key={label} className="flex items-center gap-4">
          <div className="w-20 text-sm text-muted-foreground font-medium">
            {label}
          </div>
          <div className="flex-1 h-4 rounded-full overflow-hidden bg-secondary/30">
            <div className={cn("h-full w-full color-scale", colorClass)} />
          </div>
        </div>
      ))}
    </div>
  );
}

function SymbolLayers() {
  const [visible, setVisible] = useState(() => 
    Object.fromEntries(layerDefs.map(l => [l.id, true]))
  );

  return (
    <div className="flex flex-wrap gap-2">
      {layerDefs.map((layer) => (
        <Badge
          key={layer.id}
          variant={visible[layer.id] ? "mystical" : "outline"}
          className={cn(
            "mystical-badge cursor-pointer transition-all duration-300",
            visible[layer.id] && "animate-mystical-glow"
          )}
          onClick={() => setVisible(v => ({ ...v, [layer.id]: !v[layer.id] }))}
        >
          ● {layer.label}
        </Badge>
      ))}
    </div>
  );
}

// Helper functions to cross-reference data
function getCardMajorMeta(cardId: string): MajorMeta | undefined {
  return MAJORS_META[cardId];
}

function getCardSephirothConnections(card: any): { from?: any, to?: any } {
  if (!card.path) return {};
  const from = SEPHIROT_MEANINGS[card.path.a];
  const to = SEPHIROT_MEANINGS[card.path.b];
  return { from, to };
}

function getRelatedDecan(cardId: string): Decan | undefined {
  return DECANS.find(decan => decan.cardId === cardId);
}

function getCardRWSSymbols(cardId: string): any[] {
  return RWS_CARD_SYMBOLS[cardId] || [];
}

function getAllCardSymbols(cardId: string): any[] {
  const thothSymbols = CARD_SYMBOLS[cardId] || [];
  const rwsSymbols = getCardRWSSymbols(cardId);
  return [...thothSymbols, ...rwsSymbols];
}

export default function ThothCardDetailPageNew() {
  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();

  const card = useMemo(() => 
    TAROT_CARDS.find(c => c.id === cardId), [cardId]
  );

  const meaning = useMemo(() => 
    cardId ? CARD_MEANINGS[cardId as keyof typeof CARD_MEANINGS] : undefined, [cardId]
  );

  // Enhanced data sources
  const majorMeta = useMemo(() => 
    cardId ? getCardMajorMeta(cardId) : undefined, [cardId]
  );

  const sephirothConnections = useMemo(() => 
    card ? getCardSephirothConnections(card) : {}, [card]
  );

  const relatedDecan = useMemo(() => 
    cardId ? getRelatedDecan(cardId) : undefined, [cardId]
  );

  const allSymbols = useMemo(() => 
    cardId ? getAllCardSymbols(cardId) : [], [cardId]
  );

  // Navigation helpers - all cards in TAROT_CARDS are Major Arcana
  const majorCards = useMemo(() => 
    TAROT_CARDS.sort((a, b) => (a.trumpNumber || 0) - (b.trumpNumber || 0)), 
    []
  );
  
  const currentIndex = useMemo(() => 
    majorCards.findIndex(c => c.id === cardId), 
    [majorCards, cardId]
  );
  
  const prevCard = currentIndex > 0 ? majorCards[currentIndex - 1] : null;
  const nextCard = currentIndex < majorCards.length - 1 ? majorCards[currentIndex + 1] : null;

  if (!card || !meaning) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="mystical-card max-w-md">
          <CardContent className="text-center p-8">
            <p className="text-muted-foreground">Card not found</p>
            <Button 
              variant="mystical" 
              onClick={() => navigate('/')}
              className="mt-4"
            >
              Return to Tree of Life
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div 
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Navigation Bar */}
          <div className="flex items-center justify-between">
            <Button
              variant="mystical"
              onClick={() => navigate('/')}
              className="shrink-0"
            >
              ← Back to Tree
            </Button>
            <div className="flex items-center gap-2">
              {prevCard && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/card/${prevCard.id}`)}
                  className="text-xs"
                >
                  ← {prevCard.label}
                </Button>
              )}
              <div className="text-sm text-muted-foreground px-3">
                {currentIndex + 1} of {majorCards.length}
              </div>
              {nextCard && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/card/${nextCard.id}`)}
                  className="text-xs"
                >
                  {nextCard.label} →
                </Button>
              )}
            </div>
          </div>
          
          {/* Title Section */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="section-header text-2xl md:text-3xl">
                {card.label}
              </h1>
              {majorMeta?.hebrew && (
                <div className="text-3xl font-bold text-amber-600">
                  {majorMeta.hebrew}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
              <span>Thoth • Major Arcana</span>
              {card.pathNumber && <span>• Path {card.pathNumber}</span>}
              {majorMeta?.attribution && (
                <Badge variant="outline" className="ml-2">
                  {majorMeta.attribution}
                </Badge>
              )}
            </div>
            {majorMeta?.pathTitle && (
              <div className="mt-2 text-sm text-amber-700 italic">
                {majorMeta.pathTitle}
              </div>
            )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Artwork Only */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="mystical-card overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="section-header text-xl">Artwork</CardTitle>
              </CardHeader>
              <CardContent>
                <CardArtwork card={card} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Information */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Overview */}
            <Card className="mystical-card">
              <CardHeader>
                <CardTitle className="section-header">Overview</CardTitle>
                <CardDescription>{meaning.meaning}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Element</div>
                    <Badge variant="mystical">{majorMeta?.attribution || card.element}</Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Hebrew</div>
                    <div className="font-medium text-foreground text-lg">
                      {majorMeta?.hebrew || card.hebrewLetter} <span className="text-sm">({card.hebrewName})</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Path</div>
                    <div className="font-medium text-foreground">#{card.pathNumber}</div>
                  </div>
                  <div className="space-y-1 md:col-span-2 lg:col-span-3">
                    <div className="text-muted-foreground">Sephiroth Connection</div>
                    <div className="font-medium text-foreground">
                      {sephirothConnections.from?.title || 'Unknown'} ↔ {sephirothConnections.to?.title || 'Unknown'}
                    </div>
                    {sephirothConnections.from && sephirothConnections.to && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {sephirothConnections.from.meaning} connecting to {sephirothConnections.to.meaning}
                      </div>
                    )}
                  </div>
                </div>
                {allSymbols.length > 0 && (
                  <div className="border-t pt-4">
                    <div className="text-muted-foreground text-sm mb-2">Key Symbols ({allSymbols.length})</div>
                    <div className="flex flex-wrap gap-2">
                      {allSymbols.slice(0, 6).map((symbol, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {symbol.label}
                        </Badge>
                      ))}
                      {allSymbols.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{allSymbols.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Study Materials */}
            <Card className="mystical-card">
              <CardHeader>
                <CardTitle className="section-header">Study Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="meaning" className="mystical-tabs">
                  <TabsList className="w-full grid grid-cols-6 gap-1">
                    <TabsTrigger value="meaning" className="text-xs">Meaning</TabsTrigger>
                    <TabsTrigger value="symbolism" className="text-xs">Symbols</TabsTrigger>
                    <TabsTrigger value="correspondences" className="text-xs">Correspond.</TabsTrigger>
                    <TabsTrigger value="astrology" className="text-xs">Astrology</TabsTrigger>
                    <TabsTrigger value="alchemy" className="text-xs">Alchemy</TabsTrigger>
                    <TabsTrigger value="path-notes" className="text-xs">Path</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="meaning" className="mt-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Card Meaning</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {meaning.essay}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Key Symbols</h4>
                      <div className="flex flex-wrap gap-2">
                        {meaning.symbols.map((symbol: string, index: number) => (
                          <Badge key={index} variant="mystical">
                            {symbol}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="symbolism" className="mt-6">
                    <div className="space-y-4">
                      {allSymbols.length > 0 ? (
                        <>
                          <h4 className="font-semibold text-foreground mb-3">Interactive Symbols</h4>
                          {allSymbols.map((symbol: any, index: number) => (
                            <div key={index} className="p-3 bg-amber-50 border-l-4 border-amber-400 rounded">
                              <div className="flex justify-between items-start mb-1">
                                <h5 className="font-medium text-amber-900">
                                  {symbol.label}
                                </h5>
                                <Badge className="mystical-badge text-xs">
                                  {symbol.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-amber-700">
                                {symbol.meaning}
                              </p>
                              {symbol.x && symbol.y && (
                                <div className="text-xs text-amber-600 mt-1">
                                  Position: {symbol.x}, {symbol.y}
                                </div>
                              )}
                            </div>
                          ))}
                        </>
                      ) : (
                        meaning.symbolDetails?.map((detail: any, index: number) => (
                          <div key={index} className="border-l-2 border-primary/30 pl-4">
                            <h5 className="font-medium text-foreground mb-1">
                              {detail.name}
                            </h5>
                            <p className="text-sm text-muted-foreground">
                              {detail.note}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="correspondences" className="mt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h5 className="font-medium text-foreground">Hebrew Letter</h5>
                          <div className="p-3 bg-secondary/30 rounded">
                            <div className="text-2xl mb-1">{majorMeta?.hebrew || card.hebrewLetter}</div>
                            <div className="text-sm text-muted-foreground">{card.hebrewName}</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-medium text-foreground">Attribution</h5>
                          <div className="p-3 bg-secondary/30 rounded">
                            <Badge variant="mystical">{majorMeta?.attribution || card.element}</Badge>
                          </div>
                        </div>
                      </div>
                      {majorMeta?.pathTitle && (
                        <div className="p-3 bg-amber-50 rounded border border-amber-200">
                          <h5 className="font-medium text-amber-900 mb-1">Path Title</h5>
                          <p className="text-sm text-amber-700">{majorMeta.pathTitle}</p>
                        </div>
                      )}
                      <div className="space-y-2">
                        <h5 className="font-medium text-foreground">Sephiroth Connection</h5>
                        <div className="p-3 bg-secondary/30 rounded space-y-2">
                          {sephirothConnections.from && (
                            <div>
                              <div className="font-medium">{sephirothConnections.from.title}</div>
                              <div className="text-sm text-muted-foreground">{sephirothConnections.from.meaning}</div>
                            </div>
                          )}
                          <div className="text-center text-muted-foreground">↕</div>
                          {sephirothConnections.to && (
                            <div>
                              <div className="font-medium">{sephirothConnections.to.title}</div>
                              <div className="text-sm text-muted-foreground">{sephirothConnections.to.meaning}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="astrology" className="mt-6">
                    <div className="space-y-4">
                      {relatedDecan ? (
                        <>
                          <h4 className="font-semibold text-foreground mb-3">Associated Decan</h4>
                          <div className="p-4 bg-secondary/30 rounded-lg border border-border/30">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h5 className="font-medium text-foreground">
                                  {relatedDecan.sign} {relatedDecan.signSymbol} - Decan {relatedDecan.decanNumber}
                                </h5>
                                <div className="text-sm text-muted-foreground">
                                  {relatedDecan.dates.start} - {relatedDecan.dates.end}
                                </div>
                              </div>
                              <Badge variant="outline">{relatedDecan.element}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                              Ruler: {relatedDecan.ruler} {relatedDecan.rulerSymbol}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {relatedDecan.description}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="p-4 bg-secondary/30 rounded-lg">
                          <h5 className="font-medium text-foreground mb-2">Astrological Attribution</h5>
                          <Badge variant="mystical">{majorMeta?.attribution || card.element}</Badge>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="alchemy" className="mt-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground mb-3">Alchemical Correspondences</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-secondary/30 rounded">
                          <h5 className="font-medium text-foreground mb-2">Element</h5>
                          <Badge variant="mystical">{card.element}</Badge>
                        </div>
                        {card.pathNumber && (
                          <div className="p-3 bg-secondary/30 rounded">
                            <h5 className="font-medium text-foreground mb-2">Path Number</h5>
                            <div className="font-medium">{card.pathNumber}</div>
                          </div>
                        )}
                      </div>
                      {majorMeta?.sources && (
                        <div className="space-y-2">
                          <h5 className="font-medium text-foreground">References</h5>
                          {majorMeta.sources.map((source, index) => (
                            <div key={index} className="p-2 bg-amber-50 rounded border border-amber-200">
                              <a 
                                href={source.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-amber-700 hover:text-amber-900 underline"
                              >
                                {source.label}
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="path-notes" className="mt-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-secondary/30 rounded-lg border border-border/30">
                        <h5 className="font-medium text-foreground mb-2">
                          Path of {card.hebrewName} ({card.hebrewLetter})
                        </h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {majorMeta?.pathTitle || `The path connecting ${sephirothConnections.from?.title || 'Unknown'} with ${sephirothConnections.to?.title || 'Unknown'}.`}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {meaning.keywords?.map((keyword: string, index: number) => (
                          <Badge key={index} variant="outline" className="mystical-badge">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Related Cards Section */}
        {(prevCard || nextCard) && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="mystical-card">
              <CardHeader>
                <CardTitle className="section-header">Journey Navigation</CardTitle>
                <CardDescription>Explore the Fool's Journey through the Major Arcana</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  {prevCard ? (
                    <button
                      onClick={() => navigate(`/card/${prevCard.id}`)}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-18 bg-amber-200 rounded flex items-center justify-center text-xs font-bold">
                        {prevCard.trumpNumber}
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{prevCard.label}</div>
                        <div className="text-xs text-muted-foreground">{MAJORS_META[prevCard.id]?.attribution}</div>
                      </div>
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  <div className="text-center px-4">
                    <div className="text-2xl font-bold text-amber-600">{card.trumpNumber}</div>
                    <div className="text-sm text-muted-foreground">Current</div>
                  </div>
                  
                  {nextCard ? (
                    <button
                      onClick={() => navigate(`/card/${nextCard.id}`)}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                    >
                      <div className="text-right">
                        <div className="font-medium">{nextCard.label}</div>
                        <div className="text-xs text-muted-foreground">{MAJORS_META[nextCard.id]?.attribution}</div>
                      </div>
                      <div className="w-12 h-18 bg-amber-200 rounded flex items-center justify-center text-xs font-bold">
                        {nextCard.trumpNumber}
                      </div>
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        
        {/* Bottom Section - Technical References */}
        <motion.div 
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Golden Dawn Color Scales */}
          <Card className="mystical-card">
            <CardHeader>
              <CardTitle className="section-header">Golden Dawn Color Scales</CardTitle>
              <CardDescription>
                Traditional correspondences for meditation and ritual work
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ColorBar element={card.element || 'Air'} />
            </CardContent>
          </Card>

          {/* Symbol Layers */}
          <Card className="mystical-card">
            <CardHeader>
              <CardTitle className="section-header">Symbol Layers</CardTitle>
              <CardDescription>
                Explore the mystical symbolism woven into the card
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SymbolLayers />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}