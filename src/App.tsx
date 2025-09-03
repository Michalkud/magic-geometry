import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TreeOfLifeMystical from './components/TreeOfLifeMystical';
import ThothCardDetailPage from './pages/ThothCardDetailPage';
import SymbolQuizPage from './pages/SymbolQuizPage';
import SymbolSystemDemo from './pages/SymbolSystemDemo';
import SymbolHotspotEditor from './pages/SymbolHotspotEditor';
import SymbolAssociationPage from './pages/SymbolAssociationPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TreeOfLifeMystical />}></Route>
        <Route path="/quiz" element={<SymbolQuizPage />}></Route>
        <Route path="/symbols" element={<SymbolSystemDemo />}></Route>
        <Route path="/editor" element={<SymbolHotspotEditor />}></Route>
        <Route path="/association" element={<SymbolAssociationPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}



