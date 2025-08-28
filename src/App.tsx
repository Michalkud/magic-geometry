import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TreeOfLifeMystical from './components/TreeOfLifeMystical';
import ThothCardDetailPage from './pages/ThothCardDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TreeOfLifeMystical />}></Route>
        <Route path="/card/:cardId" element={<ThothCardDetailPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}



