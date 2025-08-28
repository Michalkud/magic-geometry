export type CardMeaning = {
  id: string;
  title: string;
  meaning: string;
  symbols: string[];
  keywords?: string[];
  sources?: { label: string; url: string }[];
  // Extended write-up fields
  essay?: string; // detailed explanation
  symbolDetails?: { name: string; note: string }[]; // symbol annotations
};

// Concise Thoth-centric notes; adapt/expand as needed.
export const CARD_MEANINGS: Record<string, CardMeaning> = {
  'the-fool': {
    id: 'the-fool',
    title: '0 The Fool',
    meaning: 'Innocent leap into manifestation; creative chaos; divine madness; trust in the process.',
    symbols: ['Green child/spirit', 'Crocodile of primal waters', 'Dove and butterflies', 'Vulture and tiger', 'Caduceus, grapes, coins'],
    keywords: ['beginnings', 'spontaneity', 'trust', 'potential', 'risk'],
    sources: [
      { label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' },
    ],
    essay: 'The Fool, attributed to Air and letter Aleph, is the unformed creative breath that precedes deliberate direction. It expresses radical openness to experience and the willingness to incarnate, accepting risk for the sake of discovery. Its innocence is not ignorance but a conscious trust that life supports emergence. In practice, this card invites experiments, beginner’s mind, and a sacred playfulness that magnetizes opportunities.',
    symbolDetails: [
      { name: 'Green child/spirit', note: 'Emergent life-force; the vital innocence entering the world.' },
      { name: 'Crocodile of primal waters', note: 'Nun/abyssal waters receiving the first impulse; raw survival.' },
      { name: 'Dove and butterflies', note: 'Spirit descending and psyche transforming through stages.' },
      { name: 'Vulture and tiger', note: 'Primal mother and untamed desire flanking innocence with power.' },
      { name: 'Caduceus', note: 'Mercurial equilibrium of currents; health through harmonized polarity.' },
      { name: 'Grapes and coins', note: 'Material abundance as a byproduct of creative play, not the aim.' },
    ],
  },
  'the-magus': {
    id: 'the-magus',
    title: 'I The Magus',
    meaning: 'Will and word; Mercury’s dexterity; directing elements through focused intention.',
    symbols: ['Caduceus', 'Winged sandals', 'Wand, cup, sword, disk', 'Apes of Thoth'],
    keywords: ['will', 'communication', 'skill', 'focus', 'manifestation'],
    sources: [
      { label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' },
    ],
    essay: 'Mercury mediates between inspiration and expression. The Magus names realities into being by aligning attention, speech, and breath. This card calls for deliberate practice, message clarity, and adaptable strategy. Mastery here is not domination but skillful relationship with forces, directing rather than suppressing them.',
    symbolDetails: [
      { name: 'Caduceus', note: 'Balanced currents; healing via integration of opposites; mercurial equilibrium.' },
      { name: 'Winged sandals', note: 'Swiftness of thought; mobility across realms; messenger function.' },
      { name: 'Wand, cup, sword, disk', note: 'All suits under conscious direction; tool-competence precedes artistry.' },
      { name: 'Apes of Thoth', note: 'Mimicry vs. mastery; the danger of cleverness without wisdom.' },
    ],
  },
  'the-priestess': {
    id: 'the-priestess',
    title: 'II The Priestess',
    meaning: 'Veiled gnosis; lunar intuition; the silent path between crown and beauty.',
    symbols: ['Veil', 'Bow', 'Camel (Gimel)', 'Pomegranates', 'Moon'],
    keywords: ['intuition', 'mystery', 'silence', 'inner-voice', 'lunar'],
    sources: [
      { label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' },
    ],
  },
  'the-empress': {
    id: 'the-empress',
    title: 'III The Empress',
    meaning: 'Venusian fertility; harmony and attraction; creative matrix of forms.',
    symbols: ['Dove', 'Bee', 'Shield with eagle', 'Flowing wheat'],
    keywords: ['fertility', 'nurture', 'abundance', 'beauty', 'creativity'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  'the-emperor': {
    id: 'the-emperor',
    title: 'IV The Emperor',
    meaning: 'Aries power structured; initiative, leadership, law and form.',
    symbols: ['Ram', 'Red/orange armor', 'Sceptre and orb'],
    keywords: ['structure', 'authority', 'discipline', 'leadership', 'stability'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  'the-hierophant': {
    id: 'the-hierophant',
    title: 'V The Hierophant',
    meaning: 'Taurus tradition; initiation mysteries; articulation of inner law.',
    symbols: ['Bull', 'Nine nails', 'Priest and acolytes', 'Pentagram'],
    keywords: ['tradition', 'teaching', 'initiation', 'values', 'ritual'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  'the-lovers': {
    id: 'the-lovers',
    title: 'VI The Lovers',
    meaning: 'Alchemical wedding; analysis and union; choice that integrates opposites.',
    symbols: ['Bride and bridegroom', 'Alchemical symbols', 'Cupid'],
    keywords: ['union', 'choice', 'integration', 'partnership', 'alchemy'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  'the-chariot': {
    id: 'the-chariot',
    title: 'VII The Chariot',
    meaning: 'Cancer’s shell of victory; devotion protects purpose; motion through discipline.',
    symbols: ['Graäl', 'Crab', 'Sphinxes', 'Star canopy'],
    keywords: ['victory', 'determination', 'direction', 'devotion', 'control'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  adjustment: {
    id: 'adjustment',
    title: 'VIII Adjustment',
    meaning: 'Libra; equilibrium in motion; karma, exact balance and correction.',
    symbols: ['Scales', 'Sword', 'Feather of Maat', 'Emerald backdrop'],
    keywords: ['balance', 'justice', 'truth', 'karma', 'precision'],
    sources: [{ label: 'Faithful Intelligence (path 22)', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
    essay: 'Adjustment is not static fairness but living alignment. On the path between Geburah and Tiphareth, each act is weighed in the heart. The sword cuts illusion; the feather measures truth. This card invites rigorous self-honesty, course correction, and the poise to move precisely through complexity.',
    symbolDetails: [
      { name: 'Scales', note: 'Dynamic equilibrium; continual calibration rather than fixed symmetry.' },
      { name: 'Sword', note: 'Discernment; clear boundaries; ability to sever falsehood.' },
      { name: 'Feather of Maat', note: 'Lightness of heart; truth as a standard beyond preference.' },
      { name: 'Emerald backdrop', note: 'Venusian harmony tinting the scene of rigorous balance.' },
    ],
  },
  'the-hermit': {
    id: 'the-hermit',
    title: 'IX The Hermit',
    meaning: 'Virgo; solitary synthesis; inner light that guides refinement.',
    symbols: ['Lamp', 'Wheat', 'Spermatozoon', 'Cerberus'],
    keywords: ['solitude', 'wisdom', 'search', 'guidance', 'refinement'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  fortune: {
    id: 'fortune',
    title: 'X Fortune',
    meaning: 'Jupiter; cycles and expansion; turn of fate invites wise response.',
    symbols: ['Sphinx', 'Anubis', 'Typhon', 'Wheel'],
    keywords: ['cycles', 'change', 'expansion', 'luck', 'destiny'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  lust: {
    id: 'lust',
    title: 'XI Lust',
    meaning: 'Leo ecstasy; Babalon’s courage; wholehearted union with will.',
    symbols: ['Babalon on the Beast', 'Seven heads', 'Cup of abominations'],
    keywords: ['courage', 'ecstasy', 'desire', 'vitality', 'wholeness'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  'the-hanged-man': {
    id: 'the-hanged-man',
    title: 'XII The Hanged Man',
    meaning: 'Waters of surrender; reversal births new sight; sacrifice that liberates.',
    symbols: ['Ankh cross', 'Serpent', 'Nimbus'],
    keywords: ['surrender', 'perspective', 'sacrifice', 'pause', 'release'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  death: {
    id: 'death',
    title: 'XIII Death',
    meaning: 'The Dance of Death - Osiris conducting the eternal cycle of putrefaction and regeneration. Scorpio transformation through three sacred forms: scorpion, serpent, eagle.',
    symbols: ['Osiris Skeleton', 'Scythe of Time', 'Fish (Nun)', 'Scorpion', 'Eagle', 'Serpent', 'Bubbles of Incarnation', 'Crown of Osiris'],
    keywords: ['transformation', 'putrefaction', 'regeneration', 'dance-of-death', 'scorpio-trinity', 'osiris-mystery'],
    sources: [
      { label: 'Book of Thoth - Aleister Crowley', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_cards/Tarot_13_Death.html' },
      { label: 'Thoth Death Card Analysis', url: 'https://www.esotericmeanings.com/thoth-death-tarot-card-tutorial/' }
    ],
    essay: 'Death in the Thoth system represents the Dance of Death - not mere ending, but the ecstatic rhythm of transformation itself. Osiris, the black skeleton crowned with Upper Egypt, dances at the bottom of the ocean where he died and was reborn. This is Saturn in Binah, the essential structure that persists through all change. The Hebrew letter Nun (fish) reveals life continuing in deep waters of unconscious transformation. The three Scorpio symbols - scorpion (poison), serpent (kundalini), eagle (spirit) - show the alchemical process of putrefaction becoming regeneration. Bubbles of incarnation rise through threads of time, carrying souls from death into new manifestation.',
    symbolDetails: [
      { name: 'Osiris Skeleton', note: 'Saturn in Binah - essential structure dancing through all transformation; black represents the invisible foundation.' },
      { name: 'Scythe of Time', note: 'Harvesting tool that both destroys and creates; crosses lower figure\'s neck representing ego death.' },
      { name: 'Fish (Nun)', note: 'Hebrew letter meaning "fish" and 50; Oannes the teacher; life in unconscious waters of transformation.' },
      { name: 'Scorpion', note: 'Lowest Scorpio form between dead swamp flowers; poison becoming medicine through alchemical mastery.' },
      { name: 'Serpent', note: 'Middle Scorpio form - Lord of Life and Death; kundalini transformation shedding old forms.' },
      { name: 'Eagle', note: 'Highest Scorpio form - spiritual ecstasy, ego death, unity with divine consciousness.' },
      { name: 'Bubbles of Incarnation', note: 'Souls in manifestation stages connected by Osiris\'s creative threads; the eternal return.' },
      { name: 'Crown of Osiris', note: 'Upper Egypt crown with Maat feathers; divine authority transcending personal identity.' },
      { name: 'Eagle', note: 'Transmuted Scorpio; vision from altitude after descent.' },
    ],
  },
  art: {
    id: 'art',
    title: 'XIV Art',
    meaning: 'Sagittarius alchemy; integration of opposites; tempering into gold.',
    symbols: ['Lion and eagle conjoined', 'Cauldron', 'Rainbow'],
    keywords: ['alchemy', 'integration', 'temperance', 'synthesis', 'healing'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  'the-devil': {
    id: 'the-devil',
    title: 'XV The Devil',
    meaning: 'Capricorn form and desire; creative bondage; illuminate the root of attachment.',
    symbols: ['Goat', 'Rings/links', 'Third eye radiance'],
    keywords: ['materiality', 'bondage', 'shadow', 'attachment', 'power'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  'the-tower': {
    id: 'the-tower',
    title: 'XVI The Tower',
    meaning: 'Mars shock; false structures collapse; awakening through lightning truth.',
    symbols: ['Lightning', 'Dove and serpent', 'Eye'],
    keywords: ['upheaval', 'revelation', 'shock', 'breakthrough', 'liberation'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  'the-star': {
    id: 'the-star',
    title: 'XVII The Star',
    meaning: 'Aquarius inspiration; subtle guidance and replenishment; clear night of soul.',
    symbols: ['Water-bearer', 'Seven-pointed star', 'Ibis'],
    keywords: ['hope', 'inspiration', 'healing', 'guidance', 'clarity'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  'the-moon': {
    id: 'the-moon',
    title: 'XVIII The Moon',
    meaning: 'Pisces dreaming; trials of the night; navigating by inner tide.',
    symbols: ['Scarab', 'Jackals/towers', 'Path to distant peaks'],
    keywords: ['dreams', 'fear', 'intuition', 'trial', 'uncertainty'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  'the-sun': {
    id: 'the-sun',
    title: 'XIX The Sun',
    meaning: 'Solar clarity; joy and vitality; simple truth illuminates.',
    symbols: ['Twin children', 'Wall and garland', 'Sunflowers'],
    keywords: ['joy', 'success', 'vitality', 'clarity', 'warmth'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  'the-aeon': {
    id: 'the-aeon',
    title: 'XX The Aeon',
    meaning: 'Crowned & Conquering Child; formula of the new aeon; rebirth beyond judgement.',
    symbols: ['Hoor-paar-kraat child', 'Nuit arch', 'Hadit globe'],
    keywords: ['rebirth', 'evolution', 'awakening', 'judgement', 'vision'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  'the-universe': {
    id: 'the-universe',
    title: 'XXI The Universe',
    meaning: 'Saturnine completion; dance of manifestation; whole cycle realized.',
    symbols: ['Dancing figure', 'Bull, lion, eagle, man', 'Ouroboros'],
    keywords: ['completion', 'wholeness', 'mastery', 'cosmos', 'integration'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
};


