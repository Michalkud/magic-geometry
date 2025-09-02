/**
 * Judgement Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const judgementCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-20-judgement',
    label: 'Judgement Card',
    type: 'card',
    description: 'Judgement Major Arcana card representing rebirth, awakening, and final judgment',
    meanings: ['rebirth', 'awakening', 'resurrection', 'judgment', 'redemption', 'spiritual calling'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille', 'Christian'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'primary' }
    ]
  },

  // Archangel Gabriel
  {
    id: 'archangel-gabriel',
    label: 'Archangel Gabriel',
    type: 'figure',
    description: 'Archangel Gabriel blowing trumpet representing divine messenger and announcement',
    meanings: ['divine messenger', 'holy announcement', 'resurrection call', 'judgment day', 'spiritual awakening'],
    traditions: ['Christian angelology', 'Islamic Jibril', 'Jewish Gabriel', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'primary' }
    ]
  },

  // Angel's wings
  {
    id: 'gabriel-wings',
    label: 'Gabriel\'s Large Wings',
    type: 'geometric',
    description: 'Massive wings of Archangel Gabriel representing divine power and spiritual elevation',
    meanings: ['divine power', 'spiritual elevation', 'heavenly protection', 'angelic presence', 'cosmic flight'],
    traditions: ['Angel wings', 'Divine protection', 'Heavenly power', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'primary' }
    ]
  },

  // The trumpet
  {
    id: 'golden-trumpet',
    label: 'Golden Trumpet',
    type: 'object',
    description: 'Golden trumpet blown by Gabriel representing the last trumpet and divine call',
    meanings: ['last trumpet', 'divine call', 'resurrection sound', 'awakening blast', 'judgment announcement'],
    traditions: ['Biblical trumpet', 'Last judgment', 'Resurrection call', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'primary' }
    ]
  },

  {
    id: 'trumpet-banner',
    label: 'Banner on Trumpet',
    type: 'object',
    description: 'Flag or banner hanging from trumpet with cross symbol representing Christian salvation',
    meanings: ['Christian cross', 'salvation banner', 'resurrection flag', 'victory over death', 'divine triumph'],
    traditions: ['Christian symbolism', 'Cross banner', 'Victory flag', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'secondary' }
    ]
  },

  {
    id: 'cross-on-banner',
    label: 'Cross Symbol on Banner',
    type: 'geometric',
    description: 'Red cross symbol on white banner representing Christ and redemption',
    meanings: ['Christ symbol', 'redemption', 'salvation', 'divine sacrifice', 'spiritual victory'],
    traditions: ['Christian cross', 'Redemption symbol', 'Christ victory', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'secondary' }
    ]
  },

  // Cloud platform
  {
    id: 'heavenly-cloud',
    label: 'Heavenly Cloud Platform',
    type: 'element',
    description: 'Cloud on which Gabriel stands representing heavenly realm and divine throne',
    meanings: ['heavenly realm', 'divine throne', 'celestial platform', 'cloud of glory', 'spiritual elevation'],
    traditions: ['Biblical clouds', 'Divine throne', 'Heavenly realm', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'primary' }
    ]
  },

  // Rising figures
  {
    id: 'man-rising',
    label: 'Man Rising from Tomb',
    type: 'figure',
    description: 'Adult male figure rising from coffin with arms raised in praise and wonder',
    meanings: ['resurrection', 'spiritual awakening', 'renewed life', 'divine response', 'rebirth'],
    traditions: ['Christian resurrection', 'Spiritual awakening', 'Renewal', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'primary' }
    ]
  },

  {
    id: 'woman-rising',
    label: 'Woman Rising from Tomb',
    type: 'figure',
    description: 'Adult female figure emerging from coffin representing feminine resurrection',
    meanings: ['feminine resurrection', 'soul awakening', 'spiritual renewal', 'divine grace', 'restored life'],
    traditions: ['Resurrection symbolism', 'Soul renewal', 'Divine grace', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'primary' }
    ]
  },

  {
    id: 'child-figure',
    label: 'Child Figure Between Adults',
    type: 'figure',
    description: 'Small child figure between the adults representing innocent soul and new life',
    meanings: ['innocent soul', 'new life', 'pure spirit', 'child consciousness', 'fresh beginning'],
    traditions: ['Innocent soul', 'New life', 'Pure spirit', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'primary' }
    ]
  },

  // Arms raised gesture
  {
    id: 'arms-raised-praise',
    label: 'Arms Raised in Praise',
    type: 'geometric',
    description: 'All figures with arms raised toward heaven in praise and surrender',
    meanings: ['praise', 'surrender', 'worship', 'divine response', 'spiritual joy'],
    traditions: ['Worship gesture', 'Praise position', 'Divine surrender', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'primary' }
    ]
  },

  // The coffins/tombs
  {
    id: 'gray-coffins',
    label: 'Gray Stone Coffins',
    type: 'architectural',
    description: 'Gray stone coffins from which figures emerge representing death overcome',
    meanings: ['death overcome', 'past buried', 'old life ended', 'tomb victory', 'resurrection containers'],
    traditions: ['Death symbolism', 'Resurrection victory', 'Tomb imagery', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'primary' }
    ]
  },

  {
    id: 'coffin-lids',
    label: 'Open Coffin Lids',
    type: 'architectural',
    description: 'Opened stone lids of coffins representing liberation from death',
    meanings: ['liberation from death', 'breaking free', 'opening to life', 'freedom from past', 'resurrection breakthrough'],
    traditions: ['Liberation symbolism', 'Breaking free', 'Resurrection breakthrough', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'secondary' }
    ]
  },

  // Nakedness of figures
  {
    id: 'naked-resurrection',
    label: 'Naked Resurrected Figures',
    type: 'geometric',
    description: 'Figures emerging naked representing pure souls free from earthly attachments',
    meanings: ['pure souls', 'spiritual nakedness', 'freedom from attachments', 'essential being', 'natural state'],
    traditions: ['Spiritual purity', 'Essential being', 'Soul nakedness', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'secondary' }
    ]
  },

  // Water and mountains
  {
    id: 'distant-mountains',
    label: 'Distant Mountains',
    type: 'architectural',
    description: 'Mountains in background representing eternal and unchanging spiritual principles',
    meanings: ['eternal principles', 'unchanging truth', 'spiritual peaks', 'divine stability', 'mountain wisdom'],
    traditions: ['Mountain symbolism', 'Eternal truth', 'Divine stability', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'background' }
    ]
  },

  {
    id: 'calm-waters',
    label: 'Calm Waters',
    type: 'element',
    description: 'Still water in foreground representing peace, reflection, and emotional calm',
    meanings: ['peaceful emotions', 'spiritual reflection', 'calm after storm', 'cleansed consciousness', 'still waters'],
    traditions: ['Water symbolism', 'Peace representation', 'Calm waters', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'background' }
    ]
  },

  // Divine light
  {
    id: 'divine-radiance',
    label: 'Divine Radiance from Above',
    type: 'celestial',
    description: 'Bright light emanating from above representing divine presence and blessing',
    meanings: ['divine presence', 'heavenly blessing', 'spiritual illumination', 'grace from above', 'celestial light'],
    traditions: ['Divine light', 'Heavenly blessing', 'Spiritual illumination', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'primary' }
    ]
  },

  // Pluto correspondence
  {
    id: 'pluto-correspondence',
    label: 'Pluto Astrological Correspondence',
    type: 'celestial',
    description: 'Card\'s correspondence to Pluto representing transformation, death, and rebirth',
    meanings: ['transformation', 'death and rebirth', 'deep change', 'regeneration', 'phoenix rising'],
    traditions: ['Astrological', 'Plutonian transformation', 'Death-rebirth cycle', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'primary' }
    ]
  },

  // Hebrew letter
  {
    id: 'letter-shin',
    label: 'Hebrew Letter Shin',
    type: 'number',
    description: 'Association with Hebrew letter Shin representing divine fire and spirit',
    meanings: ['divine fire', 'holy spirit', 'spiritual flame', 'consuming fire', 'purification'],
    traditions: ['Kabbalistic', 'Hebrew alphabet', 'Divine fire', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'secondary' }
    ]
  },

  // Sound waves
  {
    id: 'trumpet-sound-waves',
    label: 'Sound Waves from Trumpet',
    type: 'geometric',
    description: 'Invisible sound waves emanating from trumpet affecting all creation',
    meanings: ['cosmic vibration', 'creative word', 'divine sound', 'universal awakening', 'transformative frequency'],
    traditions: ['Sound creation', 'Cosmic vibration', 'Divine word', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'secondary' }
    ]
  },

  // Family reunion theme
  {
    id: 'family-reunion',
    label: 'Family Reunion Theme',
    type: 'geometric',
    description: 'Three figures representing family unit reunited in spiritual awakening',
    meanings: ['family unity', 'spiritual reunion', 'ancestral connection', 'generational healing', 'collective awakening'],
    traditions: ['Family symbolism', 'Ancestral healing', 'Collective awakening', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'primary' }
    ]
  },

  // Call and response
  {
    id: 'divine-call-response',
    label: 'Divine Call and Human Response',
    type: 'geometric',
    description: 'Gabriel\'s call from above met by human response from below',
    meanings: ['divine-human dialogue', 'call and response', 'spiritual communication', 'heaven-earth connection', 'answering the call'],
    traditions: ['Divine calling', 'Spiritual response', 'Heaven-earth dialogue', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'primary' }
    ]
  },

  // Resurrection theme
  {
    id: 'resurrection-scene',
    label: 'Resurrection Scene',
    type: 'geometric',
    description: 'Overall scene depicting resurrection and awakening to new spiritual life',
    meanings: ['spiritual resurrection', 'awakening to truth', 'new life', 'divine calling', 'soul evolution'],
    traditions: ['Christian resurrection', 'Spiritual awakening', 'Soul evolution', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'primary' }
    ]
  },

  // Forgiveness and redemption
  {
    id: 'divine-forgiveness',
    label: 'Divine Forgiveness Theme',
    type: 'geometric',
    description: 'Overall theme of divine forgiveness and redemption of souls',
    meanings: ['divine forgiveness', 'redemption', 'second chance', 'grace', 'spiritual mercy'],
    traditions: ['Divine mercy', 'Redemption theology', 'Second chance', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'primary' }
    ]
  },

  // Overall composition
  {
    id: 'judgement-composition',
    label: 'Judgement Card Composition',
    type: 'geometric',
    description: 'Overall composition showing divine judgment leading to spiritual awakening and rebirth',
    meanings: ['divine judgment', 'spiritual awakening', 'collective rebirth', 'final calling', 'ultimate truth'],
    traditions: ['Divine judgment', 'Spiritual awakening', 'Last judgment', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-20-judgement', prominence: 'primary' }
    ]
  }
];

// Export individual symbols for easy access
export const JUDGEMENT_CARD = judgementCardSymbols.find(s => s.id === 'card-20-judgement')!;
export const ARCHANGEL_GABRIEL = judgementCardSymbols.find(s => s.id === 'archangel-gabriel')!;
export const GOLDEN_TRUMPET = judgementCardSymbols.find(s => s.id === 'golden-trumpet')!;
export const RISING_FIGURES = [
  judgementCardSymbols.find(s => s.id === 'man-rising')!,
  judgementCardSymbols.find(s => s.id === 'woman-rising')!,
  judgementCardSymbols.find(s => s.id === 'child-figure')!
];