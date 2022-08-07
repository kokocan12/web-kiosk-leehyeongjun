import React from 'react';
import { Router, Routes, Route } from '@lib/router';
import { Home, Menu, Receipt, PageNotFound } from '@pages';
import '@style/App.scss';

function App() {
  return (
    <main className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
