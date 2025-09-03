import { TarotDatabase } from './schema';

export const db = new TarotDatabase();

let isInitialized = false;
let initializationPromise: Promise<void> | null = null;

export async function initializeDatabase(): Promise<void> {
  if (isInitialized) return;
  if (initializationPromise) return initializationPromise;

  initializationPromise = (async () => {
    try {
      const cardCount = await db.cards.count();
      
      if (cardCount === 0) {
        console.log('Database empty, populating with seed data...');
        const { seedDatabase } = await import('./migrations');
        await seedDatabase();
        console.log('Database seeded successfully');
      } else {
        console.log(`Database already populated with ${cardCount} cards`);
      }
      
      isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  })();

  return initializationPromise;
}

if (typeof window !== 'undefined') {
  (window as any).tarotDB = db;
}