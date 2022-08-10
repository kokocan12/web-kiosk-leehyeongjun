import { Router, Routes, Route } from '@lib/router';
import { Home, Menu, Receipt, PageNotFound } from '@pages';
import { AnimationLayer, ModalLayer } from '@components';
import '@style/App.scss';
import { WidthBoundary } from './components/WidthBoundary';

function App() {
  return (
    <main className="App">
      <WidthBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/receipt" element={<Receipt />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <ModalLayer />
          <AnimationLayer />
        </Router>
      </WidthBoundary>
    </main>
  );
}

export default App;
