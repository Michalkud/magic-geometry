/**
 * Symbol Graph Type Definitions
 * Core TypeScript types for the tarot symbol graph system
 */

/**
 * Categories of symbols found in tarot cards
 */
export type SymbolType = 
  | 'card'          // Tarot card itself
  | 'figure'        // Human figures, deities
  | 'animal'        // Animals, creatures  
  | 'plant'         // Flowers, trees, vegetation
  | 'celestial'     // Sun, moon, stars, planets
  | 'object'        // Tools, weapons, furniture
  | 'architectural' // Buildings, pillars, structures
  | 'geometric'     // Sacred geometry, patterns
  | 'color'         // Color symbolism
  | 'number'        // Numerical symbolism
  | 'element';      // Elemental associations

/**
 * Prominence level of a symbol within a card
 */
export type Prominence = 'primary' | 'secondary' | 'background';

/**
 * Where and how a symbol appears on cards
 */
export interface CardAppearance {
  cardId: string;           // ID of the card where symbol appears
  x?: number;              // X position (percentage, added via Symbol Mapping Tool)
  y?: number;              // Y position (percentage, added via Symbol Mapping Tool)
  prominence: Prominence;   // How prominent the symbol is
  variant?: string;        // Specific variant (e.g., "white rose" vs "red rose")
}

/**
 * Main symbol interface - represents any visual element in the tarot
 */
export interface Symbol {
  id: string;                    // Unique identifier
  label: string;                 // Display name
  type: SymbolType;             // Category of symbol
  description: string;           // Detailed description
  meanings: string[];            // Multiple interpretations
  traditions: string[];         // Associated traditions (Golden Dawn, Marseille, etc.)
  appearances: CardAppearance[]; // Where this symbol appears
}

/**
 * Types of relationships between symbols
 */
export type RelationType = 
  | 'contains'        // Card contains symbol
  | 'opposes'         // Sun opposes Moon
  | 'transforms_into' // Fool transforms into World
  | 'balances'        // Pillars balance each other
  | 'derives_from'    // Hierophant derives from High Priestess
  | 'corresponds'     // Astrological/elemental correspondence
  | 'evolution'       // Sequential evolution (Fool->Magician)
  | 'mirrors'         // Death mirrors Fool
  | 'complements'     // Emperor complements Empress
  | 'shares_element'  // Shares visual element
  | 'numerological'   // Number relationships
  | 'geometric'       // Sacred geometry connections
  | 'alchemical'      // Alchemical processes
  | 'kabbalistic';    // Tree of Life paths

/**
 * Relationship between two symbols in the graph
 */
export interface SymbolRelationship {
  id: string;                   // Unique relationship identifier
  sourceId: string;             // Source symbol ID
  targetId: string;             // Target symbol ID
  relationshipType: RelationType; // Type of relationship
  strength: number;             // Connection strength (0-1)
  description?: string;         // Optional description of the relationship
  bidirectional: boolean;       // Whether relationship works both ways
}

/**
 * Collection of symbols for easy management
 */
export type SymbolRegistry = Map<string, Symbol>;

/**
 * Collection of relationships for graph operations
 */
export type RelationshipCollection = SymbolRelationship[];