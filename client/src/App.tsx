import { Router, Routes, Route } from '@lib/router';
import {
  Home,
  Menu,
  Receipt,
  PageNotFound,
  Payment,
  PaymentCard,
  PaymentCash,
  PaymentCashInsert,
} from '@pages';
import { AnimationLayer, ModalLayer } from '@components';
import '@style/App.scss';

function App() {
  return (
    <main className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/card" element={<PaymentCard />} />
          <Route path="/payment/cash" element={<PaymentCash />} />
          <Route path="/payment/cash-insert" element={<PaymentCashInsert />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <ModalLayer />
        <AnimationLayer />
      </Router>
    </main>
  );
}

export default App;
