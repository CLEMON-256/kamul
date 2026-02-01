//main application component with routing
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ReservationPage from './pages/ReservationPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AboutUsPage from './pages/AboutUsPage';
import BakeShopPage from './pages/BakeShopPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import WhatsAppWidget from './home/WhatsAppWidget';
import './App.css';




const AppShell = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const hideFooterPages = ['/about', '/menu', '/reservations', '/bakery', '/cart', '/checkout', '/order-success'];
  const shouldShowFooter = !hideFooterPages.includes(location.pathname);

  return (
    <div className={`app${isHome ? ' is-home' : ''}`}>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reservations" element={<ReservationPage />} />
          <Route path="/bakery" element={<BakeShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Routes>
      </main>
      {shouldShowFooter && <Footer />}
      <WhatsAppWidget />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppShell />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};
export default App;