/**
 * Death Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const deathCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-13-death',
    label: 'Death Card',
    type: 'card',
    description: 'The Death Major Arcana card representing transformation, endings, and rebirth',
    meanings: ['transformation', 'endings', 'rebirth', 'renewal', 'letting go', 'spiritual death'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille'],
    appearances: [
      { cardId: 'card-13-death', prominence: 'primary' }
    ]
  },

  // Main figure
  {
    id: 'death-skeleton',
    label: 'Death Skeleton',
    type: 'figure',
    description: 'Skeleton figure in black armor representing the universal force of transformation',
    meanings: ['inevitable change', 'universal force', 'impartial transformation', 'renewal through endings'],
    traditions: ['Medieval', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-13-death', prominence: 'primary' }
    ]
  },

  {
    id: 'black-armor',
    label: 'Black Armor',
    type: 'object',
    description: 'Dark armor worn by Death, representing protection during transformation',
    meanings: ['protection during change', 'strength in transition', 'divine armor', 'necessary boundaries'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-13-death', prominence: 'primary' }
    ]
  },

  // The banner and its symbol
  {
    id: 'black-flag',
    label: 'Black Flag',
    type: 'object',
    description: 'Black banner carried by Death representing the mystery of transformation',
    meanings: ['mystery', 'unknown realm', 'transition space', 'surrender', 'void'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-13-death', prominence: 'primary' }
    ]
  },

  {
    id: 'white-rose-on-flag',
    label: 'White Rose on Flag',
    type: 'plant',
    description: 'Five-petaled white rose on Death\'s banner, symbol of spiritual rebirth and purity',
    meanings: ['spiritual rebirth', 'purity through transformation', 'hope in darkness', 'mystic rose', 'divine love'],
    traditions: ['Christian', 'Rosicrucian', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-13-death', prominence: 'primary' }
    ]
  },

  // Mount
  {
    id: 'pale-horse',
    label: 'Pale Horse',
    type: 'animal',
    description: 'White/pale horse representing spiritual power and purification',
    meanings: ['spiritual power', 'purification', 'divine mount', 'apocalyptic force', 'conquest over death'],
    traditions: ['Biblical (Revelation)', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-13-death', prominence: 'primary' }
    ]
  },

  // Figures affected by transformation
  {
    id: 'fallen-king',
    label: 'Fallen King',
    type: 'figure',
    description: 'Crowned figure lying on ground, representing the fall of earthly power',
    meanings: ['fall of ego', 'end of earthly authority', 'humbling', 'equality in death', 'crown removed'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-13-death', prominence: 'secondary' }
    ]
  },

  {
    id: 'pleading-bishop',
    label: 'Pleading Bishop',
    type: 'figure',
    description: 'Religious figure in robes pleading with Death, representing spiritual authority facing change',
    meanings: ['spiritual authority challenged', 'dogma questioned', 'faith tested', 'institutional change'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-13-death', prominence: 'secondary' }
    ]
  },

  {
    id: 'mourning-woman',
    label: 'Mourning Woman',
    type: 'figure',
    description: 'Woman turning away in grief, representing emotional response to loss',
    meanings: ['grief', 'emotional response to loss', 'mourning process', 'feminine receptivity to change'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-13-death', prominence: 'secondary' }
    ]
  },

  {
    id: 'innocent-child',
    label: 'Innocent Child',
    type: 'figure',
    description: 'Small child offering flowers to Death, representing innocence and acceptance',
    meanings: ['innocence', 'acceptance of change', 'natural wisdom', 'gift to transformation', 'fearlessness'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-13-death', prominence: 'secondary' }
    ]
  },

  // Landscape and journey
  {
    id: 'flowing-river',
    label: 'Flowing River',
    type: 'element',
    description: 'River representing the flow of life and passage to the other side',
    meanings: ['flow of life', 'passage to other side', 'life current', 'purification waters', 'Styx river'],
    traditions: ['Greek mythology', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-13-death', prominence: 'background' }
    ]
  },

  {
    id: 'distant-boat',
    label: 'Distant Boat',
    type: 'object',
    description: 'Solitary boat on the river representing passage to the afterlife',
    meanings: ['passage to afterlife', 'spiritual journey', 'Charon\'s boat', 'crossing over', 'soul\'s voyage'],
    traditions: ['Greek mythology', 'Egyptian', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-13-death', prominence: 'background' }
    ]
  },

  // Architectural elements
  {
    id: 'twin-towers',
    label: 'Twin Towers',
    type: 'architectural',
    description: 'Two watchtowers representing the pillars of existence and threshold passage',
    meanings: ['threshold passage', 'pillars of existence', 'gateway to other realm', 'guardians of transition'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-13-death', prominence: 'background' }
    ]
  },

  // Rising sun
  {
    id: 'rising-sun',
    label: 'Rising Sun',
    type: 'celestial',
    description: 'Sun rising between the towers, representing rebirth and new life after death',
    meanings: ['rebirth', 'new life', 'resurrection', 'hope', 'dawn after darkness', 'spiritual resurrection'],
    traditions: ['Christian', 'Solar symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-13-death', prominence: 'background' }
    ]
  },

  // Overall scene composition
  {
    id: 'procession-of-transformation',
    label: 'Procession of Transformation',
    type: 'geometric',
    description: 'The entire scene showing Death\'s procession affecting all levels of society',
    meanings: ['universal transformation', 'equality before change', 'inevitable process', 'democratic death'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-13-death', prominence: 'primary' }
    ]
  },

  // Additional symbolic elements
  {
    id: 'scattered-petals',
    label: 'Scattered Flower Petals',
    type: 'plant',
    description: 'Petals scattered around the scene representing beauty in letting go',
    meanings: ['beauty in release', 'petals of remembrance', 'scattered blessings', 'fragments of beauty'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-13-death', prominence: 'background' }
    ]
  },

  {
    id: 'yellow-sky',
    label: 'Golden Yellow Sky',
    type: 'color',
    description: 'Bright yellow sky representing consciousness and mental clarity in transformation',
    meanings: ['conscious transformation', 'mental clarity', 'illumination', 'awareness in change'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-13-death', prominence: 'background' }
    ]
  }
];

// Export individual symbols for easy access
export const DEATH_CARD = deathCardSymbols.find(s => s.id === 'card-13-death')!;
export const WHITE_ROSE_ON_FLAG = deathCardSymbols.find(s => s.id === 'white-rose-on-flag')!;
export const PALE_HORSE = deathCardSymbols.find(s => s.id === 'pale-horse')!;
export const RISING_SUN = deathCardSymbols.find(s => s.id === 'rising-sun')!;