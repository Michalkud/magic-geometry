import React, { useState } from 'react';
import { useCards, useSephirot, useMinorCards, useCardMeaning, useSearchCards } from '../db/hooks';
import { db } from '../db/db';
import { resetDatabase } from '../db/migrations';

export default function DatabaseDemo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCardId, setSelectedCardId] = useState<string>('the-fool');
  
  const cards = useCards();
  const sephirot = useSephirot();
  const minorCards = useMinorCards();
  const searchResults = useSearchCards(searchQuery);
  const cardMeaning = useCardMeaning(selectedCardId);

  const handleReset = async () => {
    if (confirm('This will reset the entire database. Are you sure?')) {
      await resetDatabase();
      alert('Database reset complete!');
    }
  };

  const handleAddCustomCard = async () => {
    const id = `custom-${Date.now()}`;
    await db.cards.add({
      id,
      label: 'Custom Card',
      trumpNumber: 99,
      image: '/placeholder.jpg',
      hebrewLetter: 'צ',
      element: 'Custom'
    });
    alert(`Added custom card with ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Database Integration Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Major Arcana ({cards?.length || 0})</h2>
          <div className="max-h-64 overflow-y-auto space-y-2">
            {cards?.map(card => (
              <div 
                key={card.id}
                className={`p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 ${selectedCardId === card.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedCardId(card.id)}
              >
                <div className="font-semibold">{card.label}</div>
                <div className="text-sm text-gray-400">
                  {card.hebrewLetter} - {card.element}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Sephirot ({sephirot?.length || 0})</h2>
          <div className="max-h-64 overflow-y-auto space-y-2">
            {sephirot?.map(s => (
              <div key={s.id} className="p-2 bg-gray-700 rounded">
                <div className="font-semibold">{s.title}</div>
                <div className="text-sm text-gray-400">{s.key}</div>
                {s.meaning && (
                  <div className="text-xs mt-1">{s.meaning.substring(0, 50)}...</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Minor Arcana ({minorCards?.length || 0})</h2>
          <div className="max-h-64 overflow-y-auto space-y-2">
            {minorCards?.slice(0, 10).map(card => (
              <div key={card.id} className="p-2 bg-gray-700 rounded">
                <div className="font-semibold">{card.label}</div>
                <div className="text-sm text-gray-400">
                  Node: {card.nodeId}
                </div>
              </div>
            ))}
            {minorCards && minorCards.length > 10 && (
              <div className="text-sm text-gray-500 italic">
                ...and {minorCards.length - 10} more
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg col-span-full">
          <h2 className="text-2xl font-semibold mb-4">Selected Card Meaning</h2>
          {cardMeaning ? (
            <div>
              <h3 className="text-xl font-semibold mb-2">{cardMeaning.title}</h3>
              <p className="text-gray-300 mb-4">{cardMeaning.meaning}</p>
              {cardMeaning.keywords && (
                <div className="mb-4">
                  <span className="font-semibold">Keywords: </span>
                  {cardMeaning.keywords.join(', ')}
                </div>
              )}
              {cardMeaning.essay && (
                <div className="text-sm text-gray-400">
                  <span className="font-semibold">Essay: </span>
                  {cardMeaning.essay.substring(0, 200)}...
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500">Select a card to see its meaning</div>
          )}
        </div>

        <div className="bg-gray-800 p-6 rounded-lg col-span-full">
          <h2 className="text-2xl font-semibold mb-4">Search Cards</h2>
          <input
            type="text"
            placeholder="Search by name, hebrew, element..."
            className="w-full p-2 bg-gray-700 rounded mb-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchResults && searchResults.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {searchResults.map(card => (
                <div key={card.id} className="p-2 bg-gray-700 rounded">
                  <div className="font-semibold text-sm">{card.label}</div>
                  <div className="text-xs text-gray-400">{card.element}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-800 p-6 rounded-lg col-span-full">
          <h2 className="text-2xl font-semibold mb-4">Database Actions</h2>
          <div className="flex gap-4">
            <button
              onClick={handleAddCustomCard}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Add Custom Card
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
            >
              Reset Database
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}