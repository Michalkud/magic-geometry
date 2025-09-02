/**
 * The Devil Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const devilCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-15-the-devil',
    label: 'The Devil Card',
    type: 'card',
    description: 'The Devil Major Arcana card representing bondage, temptation, and material illusion',
    meanings: ['bondage', 'temptation', 'materialism', 'illusion', 'shadow self', 'false beliefs'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille', 'Christian'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'primary' }
    ]
  },

  // Main figure - Baphomet/The Devil
  {
    id: 'baphomet-figure',
    label: 'Baphomet/Devil Figure',
    type: 'figure',
    description: 'Goat-headed figure with bat wings representing the material world and base desires',
    meanings: ['material world', 'base desires', 'shadow self', 'temptation', 'primal instincts', 'false god'],
    traditions: ['Baphomet tradition', 'Goetic', 'Medieval', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'primary' }
    ]
  },

  // Head and horns
  {
    id: 'goat-head',
    label: 'Goat Head',
    type: 'animal',
    description: 'Goat head representing stubbornness, materialism, and connection to earth element',
    meanings: ['stubbornness', 'materialism', 'earth connection', 'carnal nature', 'persistence', 'capricorn energy'],
    traditions: ['Goat symbolism', 'Capricorn', 'Pan mythology', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'primary' }
    ]
  },

  {
    id: 'curved-horns',
    label: 'Curved Horns',
    type: 'geometric',
    description: 'Curved horns extending from head representing power and dominance',
    meanings: ['power', 'dominance', 'masculine force', 'aggressive energy', 'earth power'],
    traditions: ['Horn symbolism', 'Fertility cults', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'primary' }
    ]
  },

  // Wings
  {
    id: 'bat-wings',
    label: 'Bat Wings',
    type: 'animal',
    description: 'Dark bat wings representing association with darkness and night realm',
    meanings: ['darkness', 'night realm', 'shadow world', 'blind flight', 'underground forces'],
    traditions: ['Bat symbolism', 'Dark creatures', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'primary' }
    ]
  },

  // Torso symbols
  {
    id: 'inverted-pentagram',
    label: 'Inverted Pentagram on Forehead',
    type: 'geometric',
    description: 'Five-pointed star pointing downward representing spirit dominated by matter',
    meanings: ['spirit dominated by matter', 'material over spiritual', 'inverted values', 'fallen star', 'corrupted spirit'],
    traditions: ['Pentagram symbolism', 'Occult', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'primary' }
    ]
  },

  {
    id: 'torch-raised',
    label: 'Raised Torch',
    type: 'object',
    description: 'Flaming torch held in left hand representing false light and destructive fire',
    meanings: ['false light', 'destructive fire', 'illusion of knowledge', 'deceptive illumination', 'material flame'],
    traditions: ['Torch symbolism', 'False prometheus', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'primary' }
    ]
  },

  // Right hand gesture
  {
    id: 'blessing-mockery-gesture',
    label: 'Blessing/Mockery Hand Gesture',
    type: 'geometric',
    description: 'Right hand raised in blessing gesture, mocking divine authority',
    meanings: ['false blessing', 'mockery of divine', 'corrupted authority', 'inverted spirituality', 'deceptive guidance'],
    traditions: ['Hand gesture symbolism', 'Inverted Christianity', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'primary' }
    ]
  },

  // Lower body
  {
    id: 'hairy-legs',
    label: 'Hairy Goat Legs',
    type: 'animal',
    description: 'Goat-like hairy legs representing animal nature and earth connection',
    meanings: ['animal nature', 'earth connection', 'instinctual base', 'primitive urges', 'physical realm'],
    traditions: ['Pan mythology', 'Satyr symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'secondary' }
    ]
  },

  {
    id: 'cloven-hooves',
    label: 'Cloven Hooves',
    type: 'animal',
    description: 'Split hooves representing connection to earth and material realm',
    meanings: ['earth connection', 'material realm', 'split nature', 'grounded in matter', 'divided path'],
    traditions: ['Hoof symbolism', 'Cloven creatures', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'secondary' }
    ]
  },

  // The chained figures
  {
    id: 'chained-man',
    label: 'Chained Male Figure',
    type: 'figure',
    description: 'Naked man with chain around neck representing masculine soul in bondage',
    meanings: ['masculine bondage', 'material slavery', 'false security', 'spiritual imprisonment', 'ego captivity'],
    traditions: ['Soul bondage', 'Spiritual slavery', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'primary' }
    ]
  },

  {
    id: 'chained-woman',
    label: 'Chained Female Figure',
    type: 'figure',
    description: 'Naked woman with chain around neck representing feminine soul in bondage',
    meanings: ['feminine bondage', 'emotional slavery', 'material attachment', 'spiritual captivity', 'desire chains'],
    traditions: ['Soul bondage', 'Spiritual slavery', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'primary' }
    ]
  },

  // Chains and bondage
  {
    id: 'loose-chains',
    label: 'Loose Chains Around Necks',
    type: 'object',
    description: 'Loose chains that could be removed, representing self-imposed limitations',
    meanings: ['self-imposed limitations', 'chosen bondage', 'false imprisonment', 'illusion of captivity', 'mental chains'],
    traditions: ['Chain symbolism', 'Psychological bondage', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'primary' }
    ]
  },

  {
    id: 'chain-rings',
    label: 'Chain Ring Attachments',
    type: 'object',
    description: 'Rings connecting chains to figures, representing binding contracts or agreements',
    meanings: ['binding contracts', 'soul agreements', 'karmic bonds', 'material attachments', 'false commitments'],
    traditions: ['Binding symbolism', 'Soul contracts', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'secondary' }
    ]
  },

  // Horns on human figures
  {
    id: 'small-horns-humans',
    label: 'Small Horns on Human Figures',
    type: 'geometric',
    description: 'Tiny horns growing from human figures representing corruption and material influence',
    meanings: ['spiritual corruption', 'material influence', 'growing evil', 'moral degradation', 'lost innocence'],
    traditions: ['Corruption symbolism', 'Moral degradation', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'secondary' }
    ]
  },

  // Tails on human figures
  {
    id: 'fruit-tails',
    label: 'Fruit-Tipped Tails on Humans',
    type: 'plant',
    description: 'Tails ending in fruit representing temptation and material desires',
    meanings: ['temptation', 'material desires', 'forbidden fruit', 'sensual appetite', 'worldly attachments'],
    traditions: ['Temptation symbolism', 'Fruit of knowledge', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'secondary' }
    ]
  },

  // The pedestal/cube
  {
    id: 'black-cube-throne',
    label: 'Black Cubic Throne/Pedestal',
    type: 'architectural',
    description: 'Black cube on which the devil sits representing material foundation and earth element',
    meanings: ['material foundation', 'earth element', 'solid matter', 'cubic perfection', 'material throne'],
    traditions: ['Cube symbolism', 'Material realm', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'primary' }
    ]
  },

  // Background
  {
    id: 'dark-background',
    label: 'Dark Background',
    type: 'color',
    description: 'Dark, shadowy background representing ignorance and spiritual darkness',
    meanings: ['spiritual darkness', 'ignorance', 'shadow realm', 'unconscious depths', 'hidden fears'],
    traditions: ['Darkness symbolism', 'Shadow work', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'background' }
    ]
  },

  // Fire elements
  {
    id: 'torch-flame',
    label: 'Torch Flame',
    type: 'element',
    description: 'Fire from the raised torch representing material passion and destructive energy',
    meanings: ['material passion', 'destructive fire', 'consuming desire', 'false illumination', 'burning attachments'],
    traditions: ['Fire symbolism', 'Destructive flames', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'secondary' }
    ]
  },

  // Capricorn correspondence
  {
    id: 'capricorn-correspondence',
    label: 'Capricorn Astrological Correspondence',
    type: 'celestial',
    description: 'Card\'s correspondence to Capricorn representing earthly ambition and material achievement',
    meanings: ['earthly ambition', 'material achievement', 'worldly power', 'status seeking', 'cardinal earth'],
    traditions: ['Astrological', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'primary' }
    ]
  },

  // Hebrew letter
  {
    id: 'letter-ayin',
    label: 'Hebrew Letter Ayin',
    type: 'number',
    description: 'Association with Hebrew letter Ayin meaning eye, representing perception and material sight',
    meanings: ['physical sight', 'material perception', 'surface vision', 'worldly view', 'limited perspective'],
    traditions: ['Kabbalistic', 'Hebrew alphabet', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'secondary' }
    ]
  },

  // False power symbols
  {
    id: 'false-authority',
    label: 'False Authority Display',
    type: 'geometric',
    description: 'Overall display of false power and authority over material realm',
    meanings: ['false power', 'material authority', 'worldly dominion', 'ego inflation', 'deceptive control'],
    traditions: ['Power symbolism', 'False authority', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'primary' }
    ]
  },

  // Illusion theme
  {
    id: 'bondage-illusion',
    label: 'Illusion of Bondage',
    type: 'geometric',
    description: 'Overall theme showing that bondage is largely self-imposed illusion',
    meanings: ['self-imposed bondage', 'illusory chains', 'false imprisonment', 'mental captivity', 'chosen limitations'],
    traditions: ['Illusion symbolism', 'Maya doctrine', 'Psychological bondage', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'primary' }
    ]
  },

  // Material temptation
  {
    id: 'material-temptation',
    label: 'Material Temptation Scene',
    type: 'geometric',
    description: 'Overall scene representing temptation by material pleasures and worldly power',
    meanings: ['material temptation', 'worldly seduction', 'false promises', 'earthly desires', 'sensual bondage'],
    traditions: ['Temptation mythology', 'Material seduction', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'primary' }
    ]
  },

  // Overall composition
  {
    id: 'devil-composition',
    label: 'The Devil Card Composition',
    type: 'geometric',
    description: 'Overall composition showing the bondage of souls to material illusion and false authority',
    meanings: ['soul bondage', 'material illusion', 'false authority', 'spiritual imprisonment', 'ego dominance'],
    traditions: ['Spiritual allegory', 'Material bondage', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-15-the-devil', prominence: 'primary' }
    ]
  }
];

// Export individual symbols for easy access
export const DEVIL_CARD = devilCardSymbols.find(s => s.id === 'card-15-the-devil')!;
export const BAPHOMET_FIGURE = devilCardSymbols.find(s => s.id === 'baphomet-figure')!;
export const INVERTED_PENTAGRAM = devilCardSymbols.find(s => s.id === 'inverted-pentagram')!;
export const LOOSE_CHAINS = devilCardSymbols.find(s => s.id === 'loose-chains')!;