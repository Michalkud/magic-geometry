// Consolidated data for Tree of Life with Thoth Tarot
import { TAROT_CARDS as CARDS } from './cards';

// Re-export TAROT_CARDS
export const TAROT_CARDS = CARDS;

// Sephiroth data
export const SEPHIROTH: { [key: number]: { name: string; hebrew: string } } = {
  1: { name: 'Kether', hebrew: 'כתר' },
  2: { name: 'Chokmah', hebrew: 'חכמה' },
  3: { name: 'Binah', hebrew: 'בינה' },
  4: { name: 'Chesed', hebrew: 'חסד' },
  5: { name: 'Geburah', hebrew: 'גבורה' },
  6: { name: 'Tiphareth', hebrew: 'תפארת' },
  7: { name: 'Netzach', hebrew: 'נצח' },
  8: { name: 'Hod', hebrew: 'הוד' },
  9: { name: 'Yesod', hebrew: 'יסוד' },
  10: { name: 'Malkuth', hebrew: 'מלכות' }
};

// Sephiroth positions on the Tree (expanded spacing to prevent card overlap)
export const SEPHIROTH_POSITIONS: { [key: number]: { x: number; y: number } } = {
  1: { x: 500, y: 100 },  // Kether - Crown (top center)
  2: { x: 720, y: 220 },  // Chokmah - Wisdom (right side, moved further out)
  3: { x: 280, y: 220 },  // Binah - Understanding (left side, moved further out)
  4: { x: 720, y: 380 },  // Chesed - Mercy (right side, moved further out)
  5: { x: 280, y: 380 },  // Geburah - Severity (left side, moved further out)
  6: { x: 500, y: 540 },  // Tiphareth - Beauty (center, heart of tree)
  7: { x: 720, y: 700 },  // Netzach - Victory (right side, moved further out)
  8: { x: 280, y: 700 },  // Hod - Splendor (left side, moved further out)
  9: { x: 500, y: 860 },  // Yesod - Foundation (center)
  10: { x: 500, y: 980 }  // Malkuth - Kingdom (bottom center)
};

// Sephiroth colors for gradients
export const SEPHIROTH_COLORS: { [key: number]: string } = {
  1: 'stop-white stop-gray-200',
  2: 'stop-gray-300 stop-gray-500',
  3: 'stop-gray-900 stop-black',
  4: 'stop-blue-400 stop-blue-600',
  5: 'stop-red-500 stop-red-700',
  6: 'stop-yellow-300 stop-yellow-500',
  7: 'stop-green-400 stop-green-600',
  8: 'stop-orange-400 stop-orange-600',
  9: 'stop-purple-400 stop-purple-600',
  10: 'stop-amber-600 stop-yellow-900'
};

// Path definitions with card associations
export const PATHS: Array<{
  from: number;
  to: number;
  card: string;
  pillar: 'left' | 'right' | 'middle' | 'horizontal';
}> = [
  // Pillar of Severity (Left)
  { from: 3, to: 5, card: 'the-chariot', pillar: 'left' },
  { from: 5, to: 8, card: 'adjustment', pillar: 'left' },
  { from: 1, to: 3, card: 'the-magus', pillar: 'left' },
  { from: 3, to: 6, card: 'the-lovers', pillar: 'left' },
  { from: 5, to: 6, card: 'the-hanged-man', pillar: 'left' },
  { from: 6, to: 8, card: 'the-devil', pillar: 'left' },
  { from: 8, to: 10, card: 'the-sun', pillar: 'left' },
  { from: 8, to: 9, card: 'the-aeon', pillar: 'left' },

  // Pillar of Mercy (Right)
  { from: 1, to: 2, card: 'the-fool', pillar: 'right' },
  { from: 2, to: 4, card: 'the-emperor', pillar: 'right' },
  { from: 4, to: 7, card: 'the-hierophant', pillar: 'right' },
  { from: 2, to: 6, card: 'the-hermit', pillar: 'right' },
  { from: 4, to: 6, card: 'fortune', pillar: 'right' },
  { from: 6, to: 7, card: 'death', pillar: 'right' },
  { from: 7, to: 9, card: 'the-star', pillar: 'right' },
  { from: 7, to: 10, card: 'the-moon', pillar: 'right' },

  // Middle Pillar (Balance)
  { from: 1, to: 6, card: 'the-priestess', pillar: 'middle' },
  { from: 6, to: 9, card: 'art', pillar: 'middle' },
  { from: 9, to: 10, card: 'the-universe', pillar: 'middle' },

  // Horizontal Paths
  { from: 2, to: 3, card: 'the-empress', pillar: 'horizontal' },
  { from: 4, to: 5, card: 'lust', pillar: 'horizontal' },
  { from: 7, to: 8, card: 'the-tower', pillar: 'horizontal' }
];

// Card meanings for modal display
export const CARD_MEANINGS: { [key: string]: { meaning: string; symbols?: string[] } } = {
  'the-fool': {
    meaning: 'Innocent leap into manifestation; creative chaos; divine madness; trust in the process.',
    symbols: ['Green child/spirit', 'Crocodile of primal waters', 'Dove and butterflies', 'Vulture and tiger', 'Caduceus, grapes, coins']
  },
  'the-magus': {
    meaning: 'Will, concentration, communication; the messenger of the gods; skill and cunning.',
    symbols: ['Winged disk', 'Caduceus', 'Ape of Thoth', 'Scroll and stylus', 'Coins and cup']
  },
  'the-priestess': {
    meaning: 'Intuition, hidden knowledge, the subconscious mind; spiritual enlightenment and inner illumination.',
    symbols: ['Bow of Artemis', 'Camel', 'Crystals', 'Net veil', 'Fruit and grain']
  },
  'the-empress': {
    meaning: 'Love, beauty, fertility, creative imagination; the door of life.',
    symbols: ['Pelican', 'White eagle', 'Sparrow and dove', 'Lotus', 'Venus girdle']
  },
  'the-emperor': {
    meaning: 'Authority, structure, father figure; pioneering energy and leadership.',
    symbols: ['Ram heads', 'Bees', 'Fleur-de-lis', 'Eagle shield', 'Lamb and flag']
  },
  'the-hierophant': {
    meaning: 'Teaching, tradition, conformity; hearing the inner voice.',
    symbols: ['Elephant', 'Bull', 'Pentagram', 'Scroll', 'Four cherubim']
  },
  'the-lovers': {
    meaning: 'Love, union, relationships; choice and discrimination.',
    symbols: ['Cupid', 'King and queen', 'White and red lion', 'Eagle and egg', 'Orphic egg']
  },
  'the-chariot': {
    meaning: 'Willpower, control, victory; triumph through maintaining focus.',
    symbols: ['Four sphinxes', 'Crab', 'Grail', 'Ten stars', 'Geomantic symbols']
  },
  'adjustment': {
    meaning: 'Balance, justice, karma; precise adjustment of life to maintain equilibrium.',
    symbols: ['Scales', 'Sword', 'Feather of Maat', 'Alpha and Omega', 'Diamond shapes']
  },
  'the-hermit': {
    meaning: 'Introspection, soul searching, inner guidance; the light of wisdom.',
    symbols: ['Cerberus', 'Wheat', 'Orphic egg', 'Sperm cell', 'Lantern']
  },
  'fortune': {
    meaning: 'Cycles, destiny, turning point; the wheel of karma.',
    symbols: ['Sphinx', 'Hermanubis', 'Typhon', 'Wheel', 'Stars']
  },
  'lust': {
    meaning: 'Passion, energy, joy; courage and strength through ecstasy.',
    symbols: ['Woman and beast', 'Seven heads', 'Grail', 'Serpent tail', 'Saints in background']
  },
  'the-hanged-man': {
    meaning: 'Surrender, new perspective, sacrifice; redemption through renunciation.',
    symbols: ['Ankh', 'Serpent', 'Grid', 'Nails', 'Green wood']
  },
  'death': {
    meaning: 'Transformation, endings, transition; regeneration and putrefaction.',
    symbols: ['Skeleton', 'Scythe', 'Fish', 'Eagle', 'Scorpion']
  },
  'art': {
    meaning: 'Integration, alchemy, tempering; the marriage of opposites.',
    symbols: ['Arrow', 'Fire and water', 'Lion and eagle', 'Cauldron', 'Rainbow']
  },
  'the-devil': {
    meaning: 'Materialism, bondage, sexuality; creative energy in its most material form.',
    symbols: ['Goat of Mendes', 'Third eye', 'Inverted pentagram', 'Male and female figures', 'Rings']
  },
  'the-tower': {
    meaning: 'Sudden change, destruction, revelation; breaking down false structures.',
    symbols: ['Eye of Horus', 'Dove and serpent', 'Lightning', 'Falling figures', 'Broken crown']
  },
  'the-star': {
    meaning: 'Hope, inspiration, serenity; the interaction of the macrocosm and microcosm.',
    symbols: ['Seven-pointed stars', 'Water bearer', 'Butterflies', 'Spiral', 'Globe']
  },
  'the-moon': {
    meaning: 'Illusion, fear, subconscious; the path through the darkness.',
    symbols: ['Scarab', 'Two towers', 'Jackals', 'Blood drops', 'Path']
  },
  'the-sun': {
    meaning: 'Success, vitality, enlightenment; the complete realization of oneself.',
    symbols: ['Twin children', 'Green mound', 'Wall', 'Roses', 'Zodiac signs']
  },
  'the-aeon': {
    meaning: 'Judgment, rebirth, inner calling; the new aeon of Horus.',
    symbols: ['Nuit', 'Hadit', 'Ra-Hoor-Khuit', 'Eye and triangle', 'Letter Shin']
  },
  'the-universe': {
    meaning: 'Completion, accomplishment, travel; the return to the source.',
    symbols: ['Dancing figure', 'Serpent', 'Eye', 'Four cherubim', 'Geometric web']
  }
};