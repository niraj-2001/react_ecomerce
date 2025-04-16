import React, {  useState} from 'react';

import { Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Header from './component/Header';
import ProductDetails from './component/ProductDetails';
import CartPopup from './component/CartPopup';
import { CartProvider } from './component/CartContext';
import Footer from './component/Footer';


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        {/* ✅ Pass setter to Navbar */}
        <Navbar onSearchChange={setSearchTerm} />
        <main className="flex-grow">
          <Routes>
            {/* ✅ Pass searchTerm to Header */}
            <Route path="/" element={<Header searchTerm={searchTerm} />} />

            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
          <CartPopup />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;

