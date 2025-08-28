export type MinorCard = {
  id: string;
  label: string;
  suit: 'Wands' | 'Cups' | 'Swords' | 'Disks';
  rank: 'Ace' | 'Two' | 'Three' | 'Four' | 'Five' | 'Six' | 'Seven' | 'Eight' | 'Nine' | 'Ten';
  image?: string;
  nodeId: number; // Sephirah mapping: Ace->1 ... Ten->10
};

function nodeForRank(rank: MinorCard['rank']): number {
  const map: Record<MinorCard['rank'], number> = {
    Ace: 1, Two: 2, Three: 3, Four: 4, Five: 5,
    Six: 6, Seven: 7, Eight: 8, Nine: 9, Ten: 10,
  };
  return map[rank];
}

function make(suit: MinorCard['suit'], rank: MinorCard['rank'], image?: string): MinorCard {
  const id = `${suit.toLowerCase()}-${rank.toLowerCase()}`.replace(/\s+/g, '-');
  return { id, label: `${suit} ${rank}`, suit, rank, image, nodeId: nodeForRank(rank) };
}

export const MINOR_CARDS: MinorCard[] = [
  // Wands (Fire)
  make('Wands', 'Ace', '/cards/wands-01-ace.jpg'),
  make('Wands', 'Two', '/cards/wands-02-dominion.jpg'),
  make('Wands', 'Three', '/cards/wands-03-virtue.jpg'),
  make('Wands', 'Four', '/cards/wands-04-completion.jpg'),
  make('Wands', 'Five', '/cards/wands-05-strife.jpg'),
  make('Wands', 'Six', '/cards/wands-06-victory.jpg'),
  make('Wands', 'Seven', '/cards/wands-07-valour.jpg'),
  make('Wands', 'Eight', '/cards/wands-08-swiftness.jpg'),
  make('Wands', 'Nine', '/cards/wands-09-strength.jpg'),
  make('Wands', 'Ten', '/cards/wands-10-oppression.jpg'),
  // Cups (Water)
  make('Cups', 'Ace', '/cards/cups-01-ace.jpg'),
  make('Cups', 'Two', '/cards/cups-02-love.jpg'),
  make('Cups', 'Three', '/cards/cups-03-abundance.jpg'),
  make('Cups', 'Four', '/cards/cups-04-luxury.jpg'),
  make('Cups', 'Five', '/cards/cups-05-disappointment.jpg'),
  make('Cups', 'Six', '/cards/cups-06-pleasure.jpg'),
  make('Cups', 'Seven', '/cards/cups-07-debauch.jpg'),
  make('Cups', 'Eight', '/cards/cups-08-indolence.jpg'),
  make('Cups', 'Nine', '/cards/cups-09-happiness.jpg'),
  make('Cups', 'Ten', '/cards/cups-10-satiety.jpg'),
  // Swords (Air)
  make('Swords', 'Ace', '/cards/swords-01-ace.jpg'),
  make('Swords', 'Two', '/cards/swords-02-peace.jpg'),
  make('Swords', 'Three', '/cards/swords-03-sorrow.jpg'),
  make('Swords', 'Four', '/cards/swords-04-truce.jpg'),
  make('Swords', 'Five', '/cards/swords-05-defeat.jpg'),
  make('Swords', 'Six', '/cards/swords-06-science.jpg'),
  make('Swords', 'Seven', '/cards/swords-07-futility.jpg'),
  make('Swords', 'Eight', '/cards/swords-08-interference.jpg'),
  make('Swords', 'Nine', '/cards/swords-09-cruelty.jpg'),
  make('Swords', 'Ten', '/cards/swords-10-ruin.jpg'),
  // Disks (Earth)
  make('Disks', 'Ace', '/cards/disks-01-ace.jpg'),
  make('Disks', 'Two', '/cards/disks-02-change.jpg'),
  make('Disks', 'Three', '/cards/disks-03-works.jpg'),
  make('Disks', 'Four', '/cards/disks-04-power.jpg'),
  make('Disks', 'Five', '/cards/disks-05-worry.jpg'),
  make('Disks', 'Six', '/cards/disks-06-success.jpg'),
  make('Disks', 'Seven', '/cards/disks-07-failure.jpg'),
  make('Disks', 'Eight', '/cards/disks-08-prudence.jpg'),
  make('Disks', 'Nine', '/cards/disks-09-gain.jpg'),
  make('Disks', 'Ten', '/cards/disks-10-wealth.jpg'),
];


