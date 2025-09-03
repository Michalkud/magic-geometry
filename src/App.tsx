import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TreeOfLifeMystical from './components/TreeOfLifeMystical';
import SymbolQuizPage from './pages/SymbolQuizPage';
import SymbolSystemDemo from './pages/SymbolSystemDemo';
import SymbolHotspotEditor from './pages/SymbolHotspotEditor';
import SymbolAssociationPage from './pages/SymbolAssociationPage';
import DatabaseDemo from './pages/DatabaseDemo';
import DatabaseSchemaPage from './pages/DatabaseSchemaPage';
import { initializeDatabase } from './db/db';

export default function App() {
  const [dbReady, setDbReady] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    initializeDatabase()
      .then(() => {
        setDbReady(true);
        console.log('Database initialized successfully');
      })
      .catch((error) => {
        console.error('Failed to initialize database:', error);
        setDbError(error.message);
        setDbReady(true);
      });
  }, []);

  if (!dbReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="text-center">
          <div className="text-2xl mb-4">Initializing Tarot Database...</div>
          <div className="animate-pulse">Loading mystical knowledge</div>
        </div>
      </div>
    );
  }

  if (dbError) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-red-500">
        <div className="text-center">
          <div className="text-2xl mb-4">Database Error</div>
          <div>{dbError}</div>
          <div className="mt-4 text-white">The app will continue with limited functionality</div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TreeOfLifeMystical />}></Route>
        <Route path="/quiz" element={<SymbolQuizPage />}></Route>
        <Route path="/symbols" element={<SymbolSystemDemo />}></Route>
        <Route path="/editor" element={<SymbolHotspotEditor />}></Route>
        <Route path="/association" element={<SymbolAssociationPage />}></Route>
        <Route path="/database" element={<DatabaseDemo />}></Route>
        <Route path="/schema" element={<DatabaseSchemaPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}



