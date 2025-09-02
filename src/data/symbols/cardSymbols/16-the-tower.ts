/**
 * The Tower Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const towerCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-16-the-tower',
    label: 'The Tower Card',
    type: 'card',
    description: 'The Tower Major Arcana card representing sudden change, revelation, and destruction of illusions',
    meanings: ['sudden change', 'revelation', 'destruction', 'awakening', 'liberation', 'divine intervention'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'primary' }
    ]
  },

  // The Tower structure
  {
    id: 'tall-tower',
    label: 'The Tall Tower',
    type: 'architectural',
    description: 'High stone tower representing false beliefs, ego structures, and material pride',
    meanings: ['false beliefs', 'ego structures', 'pride', 'material achievement', 'artificial constructs'],
    traditions: ['Tower of Babel', 'Ego symbolism', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'primary' }
    ]
  },

  {
    id: 'stone-blocks',
    label: 'Stone Building Blocks',
    type: 'architectural',
    description: 'Individual stone blocks of the tower representing rigid thinking and structured beliefs',
    meanings: ['rigid thinking', 'structured beliefs', 'mental constructs', 'fixed ideas', 'crystallized thoughts'],
    traditions: ['Building symbolism', 'Mental structures', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'secondary' }
    ]
  },

  {
    id: 'tower-foundation',
    label: 'Tower Foundation',
    type: 'architectural',
    description: 'Base of tower built on rocky ground representing unstable foundations',
    meanings: ['unstable foundation', 'false premise', 'weak base', 'illusory security', 'shaky ground'],
    traditions: ['Foundation symbolism', 'Biblical parable', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'secondary' }
    ]
  },

  // Crown on tower
  {
    id: 'golden-crown-top',
    label: 'Golden Crown on Tower Top',
    type: 'object',
    description: 'Crown-like structure at tower peak representing material authority and worldly power',
    meanings: ['material authority', 'worldly power', 'false crown', 'ego pride', 'temporal rulership'],
    traditions: ['Crown symbolism', 'False authority', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'primary' }
    ]
  },

  // Lightning bolt
  {
    id: 'lightning-bolt',
    label: 'Lightning Bolt from Heaven',
    type: 'celestial',
    description: 'Divine lightning striking the tower representing sudden illumination and divine intervention',
    meanings: ['divine intervention', 'sudden illumination', 'spiritual awakening', 'cosmic force', 'truth revealed'],
    traditions: ['Divine wrath', 'Illumination', 'Zeus/Jupiter', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'primary' }
    ]
  },

  {
    id: 'zigzag-pattern',
    label: 'Zigzag Lightning Pattern',
    type: 'geometric',
    description: 'Jagged zigzag pattern of lightning representing sudden, shocking change',
    meanings: ['sudden shock', 'unexpected change', 'disruptive force', 'breaking pattern', 'electric awakening'],
    traditions: ['Lightning symbolism', 'Shock patterns', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'primary' }
    ]
  },

  // Flames and fire
  {
    id: 'flames-from-windows',
    label: 'Flames from Tower Windows',
    type: 'element',
    description: 'Fire erupting from tower windows representing purifying destruction',
    meanings: ['purifying fire', 'destructive cleansing', 'burning away illusions', 'spiritual fire', 'transformative flames'],
    traditions: ['Fire symbolism', 'Purification', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'primary' }
    ]
  },

  {
    id: 'tower-windows',
    label: 'Tower Windows',
    type: 'architectural',
    description: 'Small windows in tower representing limited perception and narrow viewpoint',
    meanings: ['limited perception', 'narrow viewpoint', 'restricted vision', 'confined outlook', 'tunnel vision'],
    traditions: ['Window symbolism', 'Vision limitation', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'secondary' }
    ]
  },

  // Falling figures
  {
    id: 'falling-man',
    label: 'Falling Male Figure',
    type: 'figure',
    description: 'Man falling from tower head-first representing ego\'s sudden fall',
    meanings: ['ego fall', 'pride before fall', 'masculine principle overthrown', 'forced humility', 'loss of control'],
    traditions: ['Fall symbolism', 'Ego death', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'primary' }
    ]
  },

  {
    id: 'falling-woman',
    label: 'Falling Female Figure',
    type: 'figure',
    description: 'Woman falling from tower representing intuitive wisdom or false security falling',
    meanings: ['false security falling', 'illusion shattered', 'feminine principle disrupted', 'emotional upheaval', 'loss of comfort'],
    traditions: ['Fall symbolism', 'Security loss', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'primary' }
    ]
  },

  {
    id: 'head-first-fall',
    label: 'Head-First Falling Position',
    type: 'geometric',
    description: 'Figures falling head-first representing mental overthrow and ego dissolution',
    meanings: ['mental overthrow', 'ego dissolution', 'thinking patterns shattered', 'intellectual pride fallen', 'forced surrender'],
    traditions: ['Fall patterns', 'Ego death', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'primary' }
    ]
  },

  // Royal clothing
  {
    id: 'royal-garments',
    label: 'Royal/Noble Clothing on Figures',
    type: 'object',
    description: 'Rich clothing on falling figures representing loss of status and material position',
    meanings: ['status loss', 'material downfall', 'worldly position lost', 'external identity stripped', 'social fall'],
    traditions: ['Status symbolism', 'Material loss', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'secondary' }
    ]
  },

  // Falling debris
  {
    id: 'falling-stones',
    label: 'Falling Stone Blocks',
    type: 'architectural',
    description: 'Stone blocks falling from destroyed tower representing breakdown of false structures',
    meanings: ['structure breakdown', 'false beliefs crumbling', 'mental constructs falling', 'illusions shattered', 'systematic collapse'],
    traditions: ['Destruction symbolism', 'Structure collapse', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'secondary' }
    ]
  },

  {
    id: 'crown-falling',
    label: 'Crown Falling from Tower',
    type: 'object',
    description: 'Crown knocked off and falling representing loss of false authority',
    meanings: ['false authority lost', 'ego crown removed', 'pride destroyed', 'material power gone', 'humiliation'],
    traditions: ['Crown symbolism', 'Authority loss', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'primary' }
    ]
  },

  // Cloud and sky
  {
    id: 'dark-stormy-sky',
    label: 'Dark Stormy Sky',
    type: 'element',
    description: 'Dark, turbulent sky background representing chaos and divine wrath',
    meanings: ['divine wrath', 'chaos', 'storm of change', 'turbulent times', 'spiritual upheaval'],
    traditions: ['Storm symbolism', 'Divine anger', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'background' }
    ]
  },

  {
    id: 'heavy-clouds',
    label: 'Heavy Storm Clouds',
    type: 'element',
    description: 'Thick, heavy clouds representing oppression and gathering forces',
    meanings: ['oppressive forces', 'gathering storm', 'heavy atmosphere', 'impending change', 'pressure building'],
    traditions: ['Cloud symbolism', 'Weather omens', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'background' }
    ]
  },

  // Fire drops/sparks
  {
    id: 'fire-sparks',
    label: 'Fire Sparks/Drops',
    type: 'element',
    description: 'Fiery sparks or drops falling around the scene representing scattered inspiration',
    meanings: ['scattered inspiration', 'sparks of truth', 'burning fragments', 'divine fire bits', 'enlightenment pieces'],
    traditions: ['Fire symbolism', 'Divine sparks', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'secondary' }
    ]
  },

  {
    id: 'yod-flames',
    label: 'Yod-Shaped Flames',
    type: 'geometric',
    description: 'Flame shapes resembling Hebrew letter Yod representing divine creative force',
    meanings: ['divine creative force', 'god\'s hand', 'creative sparks', 'divine intervention', 'spiritual fire'],
    traditions: ['Kabbalistic', 'Hebrew Yod', 'Divine creativity', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'secondary' }
    ]
  },

  // Rocky ground below
  {
    id: 'rocky-ground',
    label: 'Rocky Ground Below',
    type: 'architectural',
    description: 'Harsh rocky terrain at base representing hard reality and difficult landing',
    meanings: ['hard reality', 'difficult truth', 'harsh landing', 'solid ground', 'foundation of truth'],
    traditions: ['Ground symbolism', 'Reality check', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'background' }
    ]
  },

  // Mars correspondence
  {
    id: 'mars-correspondence',
    label: 'Mars Planetary Correspondence',
    type: 'celestial',
    description: 'Card\'s correspondence to Mars representing destruction, war, and forceful change',
    meanings: ['destructive force', 'warfare', 'forceful change', 'martial energy', 'aggressive transformation'],
    traditions: ['Astrological', 'Planetary', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'primary' }
    ]
  },

  // Hebrew letter
  {
    id: 'letter-peh',
    label: 'Hebrew Letter Peh',
    type: 'number',
    description: 'Association with Hebrew letter Peh meaning mouth, representing speech and revelation',
    meanings: ['divine speech', 'revelation', 'word of god', 'prophetic voice', 'truth spoken'],
    traditions: ['Kabbalistic', 'Hebrew alphabet', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'secondary' }
    ]
  },

  // Tower of Babel reference
  {
    id: 'babel-reference',
    label: 'Tower of Babel Reference',
    type: 'architectural',
    description: 'Connection to biblical Tower of Babel story representing human pride and divine judgment',
    meanings: ['human pride', 'divine judgment', 'overreach punished', 'confusion of tongues', 'unity destroyed'],
    traditions: ['Biblical', 'Tower of Babel', 'Divine judgment', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'primary' }
    ]
  },

  // Liberation theme
  {
    id: 'liberation-through-destruction',
    label: 'Liberation Through Destruction',
    type: 'geometric',
    description: 'Overall theme of freedom gained through destruction of false structures',
    meanings: ['liberation', 'freedom through destruction', 'breaking free', 'release from bondage', 'spiritual freedom'],
    traditions: ['Liberation symbolism', 'Spiritual freedom', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'primary' }
    ]
  },

  // Overall composition
  {
    id: 'tower-composition',
    label: 'The Tower Card Composition',
    type: 'geometric',
    description: 'Overall dramatic composition showing divine intervention destroying false structures',
    meanings: ['divine intervention', 'false structures destroyed', 'sudden awakening', 'truth revealed', 'liberation achieved'],
    traditions: ['Divine drama', 'Truth revelation', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-16-the-tower', prominence: 'primary' }
    ]
  }
];

// Export individual symbols for easy access
export const TOWER_CARD = towerCardSymbols.find(s => s.id === 'card-16-the-tower')!;
export const TALL_TOWER = towerCardSymbols.find(s => s.id === 'tall-tower')!;
export const LIGHTNING_BOLT = towerCardSymbols.find(s => s.id === 'lightning-bolt')!;
export const FALLING_FIGURES = [
  towerCardSymbols.find(s => s.id === 'falling-man')!,
  towerCardSymbols.find(s => s.id === 'falling-woman')!
];