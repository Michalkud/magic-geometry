import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { TAROT_CARDS, PATHS, CARD_MEANINGS } from '../data/tarotData';
import { Button } from './ui/button';

interface TravelModeProps {
  isOpen: boolean;
  onClose: () => void;
  initialCardId?: string;
}

const TravelMode: React.FC<TravelModeProps> = ({ isOpen, onClose, initialCardId }) => {
  // Create ordered list of cards based on paths
  const cardOrder = PATHS.map(path => path.card);
  
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (initialCardId) {
      const index = cardOrder.findIndex(cardId => cardId === initialCardId);
      return index >= 0 ? index : 0;
    }
    return 0;
  });

  const currentCard = TAROT_CARDS.find(card => card.id === cardOrder[currentIndex]);
  const currentMeaning = currentCard ? CARD_MEANINGS[currentCard.id] : null;
  const currentPath = PATHS[currentIndex];

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % cardOrder.length);
  }, [cardOrder.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + cardOrder.length) % cardOrder.length);
  }, [cardOrder.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, goToNext, goToPrevious, onClose]);

  // Swipe detection
  const handleDragEnd = (event: any, { offset, velocity }: any) => {
    const swipeThreshold = 50;
    const velocityThreshold = 500;
    
    if (offset.x > swipeThreshold || velocity.x > velocityThreshold) {
      goToPrevious();
    } else if (offset.x < -swipeThreshold || velocity.x < -velocityThreshold) {
      goToNext();
    }
  };

  if (!currentCard || !currentMeaning) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-amber-200 hover:text-amber-100 hover:bg-amber-400/20"
          >
            <X size={20} />
          </Button>

          {/* Card counter */}
          <div className="absolute top-4 left-4 z-10 text-amber-200 text-sm font-medium">
            {currentIndex + 1} of {cardOrder.length}
          </div>

          {/* Navigation hints */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 text-amber-200/60 text-xs text-center">
            <div>Swipe or use arrow keys to navigate</div>
            <div className="flex items-center justify-center gap-4 mt-1">
              <ChevronLeft size={16} />
              <span>Navigate</span>
              <ChevronRight size={16} />
            </div>
          </div>

          {/* Main card display area */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div
              className="relative max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              whileTap={{ cursor: "grabbing" }}
              style={{ cursor: "grab" }}
            >
              {/* Card Image */}
              <motion.div
                key={`card-${currentIndex}`}
                className="relative"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="relative aspect-[3/5] max-w-sm mx-auto lg:max-w-none">
                  <img
                    src={currentCard.image}
                    alt={currentCard.label}
                    className="w-full h-full object-cover rounded-lg border-2 border-amber-400/50 shadow-2xl"
                    style={{
                      filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 0.3))'
                    }}
                  />
                  
                  {/* Hebrew letter overlay */}
                  <div className="absolute bottom-4 left-4 text-4xl text-amber-200 font-bold drop-shadow-lg">
                    {currentCard.hebrewLetter}
                  </div>
                  
                  {/* Trump number */}
                  <div className="absolute top-4 right-4 text-amber-300/90 text-sm font-medium">
                    Trump {currentCard.trumpNumber}
                  </div>
                </div>
              </motion.div>

              {/* Card Information */}
              <motion.div
                key={`info-${currentIndex}`}
                className="space-y-6"
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
              >
                {/* Card Title */}
                <div>
                  <h1 className="text-3xl lg:text-4xl font-mystical text-amber-300 mystical-glow mb-2">
                    {currentCard.label}
                  </h1>
                  <p className="text-amber-200/80 text-lg">
                    {currentCard.hebrewName} • {currentCard.element}
                  </p>
                </div>

                {/* Path Connection */}
                <div className="bg-black/40 rounded-lg p-4 border border-amber-400/30">
                  <h3 className="text-amber-400 font-semibold mb-2">Path Connection</h3>
                  <p className="text-amber-200 text-sm">
                    Connects Sephirah {currentPath.from} to Sephirah {currentPath.to}
                  </p>
                  <p className="text-amber-200/80 text-xs mt-1">
                    Pillar: {currentPath.pillar.charAt(0).toUpperCase() + currentPath.pillar.slice(1)}
                  </p>
                </div>

                {/* Card Meaning */}
                <div className="bg-black/40 rounded-lg p-4 border border-amber-400/30">
                  <h3 className="text-amber-400 font-semibold mb-3">Meaning</h3>
                  <p className="text-amber-100 text-sm leading-relaxed mb-4">
                    {currentMeaning.meaning}
                  </p>
                  
                  {/* Key Symbols */}
                  {currentMeaning.symbols && (
                    <div>
                      <h4 className="text-amber-400 text-sm font-semibold mb-2">Key Symbols</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentMeaning.symbols.slice(0, 4).map((symbol, i) => (
                          <span
                            key={i}
                            className="bg-amber-400/20 text-amber-200 px-3 py-1 rounded-full text-xs"
                          >
                            {symbol}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Controls */}
                <div className="flex justify-between items-center pt-4">
                  <Button
                    onClick={goToPrevious}
                    variant="outline"
                    size="sm"
                    className="border-amber-400/50 text-amber-200 hover:bg-amber-400/20 hover:text-amber-100"
                  >
                    <ChevronLeft size={16} className="mr-1" />
                    Previous
                  </Button>
                  
                  <div className="text-center">
                    <div className="text-amber-400 text-sm font-medium">
                      Path {currentIndex + 1}
                    </div>
                    <div className="text-amber-200/60 text-xs">
                      of {cardOrder.length}
                    </div>
                  </div>
                  
                  <Button
                    onClick={goToNext}
                    variant="outline"
                    size="sm"
                    className="border-amber-400/50 text-amber-200 hover:bg-amber-400/20 hover:text-amber-100"
                  >
                    Next
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TravelMode;