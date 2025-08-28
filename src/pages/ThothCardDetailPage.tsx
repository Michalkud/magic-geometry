import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { TAROT_CARDS } from "@/data/cards";
import { CARD_MEANINGS } from "@/data/cardMeanings";
import { CARD_SYMBOLS } from "@/data/cardSymbols";
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

export default function ThothCardDetailPageNew() {
  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();

  const card = useMemo(() => 
    TAROT_CARDS.find(c => c.id === cardId), [cardId]
  );

  const meaning = useMemo(() => 
    cardId ? CARD_MEANINGS[cardId as keyof typeof CARD_MEANINGS] : undefined, [cardId]
  );

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
          className="mb-8 flex items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="mystical"
            onClick={() => navigate('/')}
            className="shrink-0"
          >
            ← Back to Tree
          </Button>
          <div>
            <h1 className="section-header text-2xl md:text-3xl">
              {card.label}
            </h1>
            <p className="text-muted-foreground">
              Thoth • Major Arcana • Path {card.pathNumber}
            </p>
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
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Element</div>
                    <div className="font-medium text-foreground">{card.element}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Hebrew</div>
                    <div className="font-medium text-foreground">
                      {card.hebrewLetter} ({card.hebrewName})
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Path</div>
                    <div className="font-medium text-foreground">#{card.pathNumber}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Connects</div>
                    <div className="font-medium text-foreground">
                      Tiferet ↔ Netzach
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Study Materials */}
            <Card className="mystical-card">
              <CardHeader>
                <CardTitle className="section-header">Study Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="meaning" className="mystical-tabs">
                  <TabsList className="w-full">
                    <TabsTrigger value="meaning" className="flex-1">Meaning</TabsTrigger>
                    <TabsTrigger value="symbolism" className="flex-1">Symbolism</TabsTrigger>
                    <TabsTrigger value="path-notes" className="flex-1">Path Notes</TabsTrigger>
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
                      {meaning.symbolDetails?.map((detail: any, index: number) => (
                        <div key={index} className="border-l-2 border-primary/30 pl-4">
                          <h5 className="font-medium text-foreground mb-1">
                            {detail.name}
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            {detail.note}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="path-notes" className="mt-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-secondary/30 rounded-lg border border-border/30">
                        <h5 className="font-medium text-foreground mb-2">
                          Path of {card.hebrewName} (נ)
                        </h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          The path of Nun connects Beauty (Tiferet) with Victory (Netzach), 
                          representing the flow of creative energy from the heart center into 
                          manifestation through emotion and desire. This is the path of transformation 
                          through the waters of the unconscious.
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