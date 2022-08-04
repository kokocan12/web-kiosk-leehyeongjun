import React from 'react';
import { Router, Routes, Route } from '@lib/router';
import { Home, Menu, Receipt, PageNotFount } from '@pages';
import '@style/App.scss';

function App() {
  return (
    <div className="App">
      <h1>hi</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="*" element={<PageNotFount />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
