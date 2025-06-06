import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import RootLayout from './components/RootLayout';
import Cart from './pages/Cart';

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
