import { db } from './db';
import { TAROT_CARDS } from '../data/cards';
import { SEPHIROT, SEPHIROT_MEANINGS } from '../data/sephirot';
import { MINOR_CARDS } from '../data/minors';
import { CARD_MEANINGS } from '../data/cardMeanings';
import { UNIVERSAL_SYMBOLS } from '../data/universalSymbols';
import { symbolRelationships } from '../data/symbols/relationships';
import { RWS_CARD_SYMBOLS } from '../data/rwsCardSymbols';
import { CARD_SYMBOLS } from '../data/cardSymbols';
import { CARD_HOTSPOTS } from '../data/symbolHotspots';
import { DECANS } from '../data/decans';
import { MAJORS_META } from '../data/majorsMeta';
import geometriesData from '../data/geometries.json';
import type { DBCard, DBSephirah, DBMinorCard, DBCardMeaning, DBSymbolDetail, DBSymbol, DBRelationship, DBCardAppearance, DBHotspot, DBDecan, DBGeometry } from './types';

export async function seedDatabase(): Promise<void> {
  await seedMajorArcana();
  await seedSephirot();
  await seedMinorArcana();
  await seedCardMeanings();
  await seedUniversalSymbols();
  await seedCardSymbols();
  await seedRelationships();
  await seedCardAppearances();
  await seedHotspots();
  await seedDecans();
  await seedGeometries();
}

async function seedMajorArcana(): Promise<void> {
  const cards: DBCard[] = TAROT_CARDS.map(card => {
    const meta = MAJORS_META[card.id];
    return {
      id: card.id,
      label: card.label,
      trumpNumber: card.trumpNumber,
      image: card.image,
      pathA: card.path?.a,
      pathB: card.path?.b,
      hebrewLetter: meta?.hebrew || card.hebrewLetter,
      hebrewName: card.hebrewName,
      element: meta?.attribution || card.element,
      pathNumber: card.pathNumber,
      note: meta?.pathTitle || card.note
    };
  });

  await db.cards.bulkAdd(cards);
  console.log(`Added ${cards.length} major arcana cards with enhanced metadata`);
}

async function seedSephirot(): Promise<void> {
  const sephirot: DBSephirah[] = SEPHIROT.map(s => {
    const meaning = SEPHIROT_MEANINGS[s.id];
    return {
      id: s.id,
      key: s.key,
      title: s.title,
      meaning: meaning?.meaning,
      symbols: meaning?.symbols,
      sources: meaning?.sources
    };
  });

  await db.sephirot.bulkAdd(sephirot);
  console.log(`Added ${sephirot.length} sephirot`);
}

async function seedMinorArcana(): Promise<void> {
  const minorCards: DBMinorCard[] = MINOR_CARDS.map(card => ({
    id: card.id,
    label: card.label,
    suit: card.suit,
    rank: card.rank,
    image: card.image,
    nodeId: card.nodeId
  }));

  await db.minorCards.bulkAdd(minorCards);
  console.log(`Added ${minorCards.length} minor arcana cards`);
}

async function seedCardMeanings(): Promise<void> {
  const meanings: DBCardMeaning[] = [];
  const symbolDetails: DBSymbolDetail[] = [];

  for (const [cardId, meaning] of Object.entries(CARD_MEANINGS)) {
    const cardMeaning: DBCardMeaning = {
      cardId,
      title: meaning.title,
      meaning: meaning.meaning,
      keywords: meaning.keywords,
      essay: meaning.essay,
      sources: meaning.sources
    };
    
    meanings.push(cardMeaning);
  }

  const meaningIds = await db.cardMeanings.bulkAdd(meanings, { allKeys: true });

  let detailIndex = 0;
  for (const [cardId, meaning] of Object.entries(CARD_MEANINGS)) {
    const meaningId = meaningIds[detailIndex++];
    if (meaning.symbolDetails) {
      for (const detail of meaning.symbolDetails) {
        symbolDetails.push({
          cardMeaningId: meaningId as number,
          name: detail.name,
          note: detail.note
        });
      }
    }
  }

  if (symbolDetails.length > 0) {
    await db.symbolDetails.bulkAdd(symbolDetails);
    console.log(`Added ${symbolDetails.length} symbol details`);
  }
  
  console.log(`Added ${meanings.length} card meanings`);
}

async function seedUniversalSymbols(): Promise<void> {
  const symbols: DBSymbol[] = UNIVERSAL_SYMBOLS.map(symbol => ({
    id: symbol.id,
    label: symbol.label,
    type: 'object' as const,
    description: symbol.meaning,
    meanings: [symbol.meaning],
    traditions: ['universal'],
    category: symbol.category,
    difficulty: symbol.difficulty,
    source: symbol.source
  }));

  await db.symbols.bulkAdd(symbols);
  console.log(`Added ${symbols.length} universal symbols`);
}

async function seedCardSymbols(): Promise<void> {
  try {
    if (typeof import.meta.glob === 'function') {
      const modules = import.meta.glob('../data/symbols/cardSymbols/*.ts');
      const symbolsToAdd: DBSymbol[] = [];
      
      for (const path in modules) {
        const module: any = await modules[path]();
        if (module.symbols && Array.isArray(module.symbols)) {
          for (const symbol of module.symbols) {
            if (!await db.symbols.get(symbol.id)) {
              symbolsToAdd.push({
                id: symbol.id,
                label: symbol.label,
                type: symbol.type,
                description: symbol.description || '',
                meanings: symbol.meanings || [],
                traditions: symbol.traditions || []
              });
            }
          }
        }
      }
      
      if (symbolsToAdd.length > 0) {
        await db.symbols.bulkAdd(symbolsToAdd);
        console.log(`Added ${symbolsToAdd.length} card-specific symbols`);
      }
    } else {
      console.log('Dynamic import not available, skipping card symbols');
    }
  } catch (error) {
    console.warn('Could not load card symbols:', error);
  }
}

export async function clearDatabase(): Promise<void> {
  await db.cards.clear();
  await db.sephirot.clear();
  await db.minorCards.clear();
  await db.symbols.clear();
  await db.cardAppearances.clear();
  await db.relationships.clear();
  await db.cardMeanings.clear();
  await db.symbolDetails.clear();
  await db.hotspots.clear();
  await db.geometries.clear();
  await db.decans.clear();
  
  console.log('Database cleared');
}

export async function resetDatabase(): Promise<void> {
  await clearDatabase();
  await seedDatabase();
  console.log('Database reset complete');
}

async function seedRelationships(): Promise<void> {
  const relationships: DBRelationship[] = symbolRelationships.map(rel => ({
    sourceId: rel.sourceId,
    targetId: rel.targetId,
    type: rel.relationshipType,
    strength: rel.strength,
    description: rel.description,
    bidirectional: rel.bidirectional
  }));

  await db.relationships.bulkAdd(relationships);
  console.log(`Added ${relationships.length} symbol relationships`);
}

async function seedCardAppearances(): Promise<void> {
  const appearances: DBCardAppearance[] = [];
  
  // Process RWS symbols
  Object.entries(RWS_CARD_SYMBOLS).forEach(([cardId, symbols]) => {
    symbols.forEach(symbol => {
      appearances.push({
        symbolId: `rws-${symbol.id}`,
        cardId: cardId,
        x: symbol.x,
        y: symbol.y,
        prominence: 'primary' as const,
        variant: 'rws'
      });
    });
  });
  
  // Process Thoth symbols  
  Object.entries(CARD_SYMBOLS).forEach(([cardId, symbols]) => {
    symbols.forEach(symbol => {
      appearances.push({
        symbolId: `thoth-${symbol.id}`,
        cardId: cardId,
        x: symbol.x,
        y: symbol.y,
        prominence: 'primary' as const,
        variant: 'thoth'
      });
    });
  });

  await db.cardAppearances.bulkAdd(appearances);
  console.log(`Added ${appearances.length} card-symbol appearances`);
}

async function seedHotspots(): Promise<void> {
  const hotspots: DBHotspot[] = [];
  
  Object.entries(CARD_HOTSPOTS).forEach(([cardId, cardHotspots]) => {
    cardHotspots.forEach(hotspot => {
      // Convert polygon to bounding box
      const xCoords = hotspot.polygon.map(p => p[0]);
      const yCoords = hotspot.polygon.map(p => p[1]);
      const minX = Math.min(...xCoords);
      const maxX = Math.max(...xCoords);
      const minY = Math.min(...yCoords);
      const maxY = Math.max(...yCoords);
      
      hotspots.push({
        cardId: cardId,
        symbolId: hotspot.key,
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
        label: hotspot.key,
        meaning: hotspot.meanings.join('; ')
      });
    });
  });

  await db.hotspots.bulkAdd(hotspots);
  console.log(`Added ${hotspots.length} card hotspots`);
}

async function seedDecans(): Promise<void> {
  const decans: DBDecan[] = DECANS.map(decan => ({
    id: decan.id,
    position: decan.number,
    sign: decan.sign,
    degreeRange: `${decan.degrees.start}-${decan.degrees.end}°`,
    planet: decan.ruler,
    minorCard: decan.cardId,
    dates: `${decan.dates.start} - ${decan.dates.end}`
  }));

  await db.decans.bulkAdd(decans);
  console.log(`Added ${decans.length} decans`);
}

async function seedGeometries(): Promise<void> {
  const geometries: DBGeometry[] = geometriesData.geometries.map((geo: any) => ({
    id: geo.id,
    data: geo
  }));

  await db.geometries.bulkAdd(geometries);
  console.log(`Added ${geometries.length} sacred geometry patterns`);
}