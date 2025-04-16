import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);

  // Add item to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setPopupVisible(true);  // Show the popup after adding to the cart
  };

  // Decrease the quantity of a product
  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity }
          : item
      );
      // If quantity is 0, remove item from the cart
      return updatedCart.filter((item) => item.quantity > 0);
    });
  };

  // Close the popup
  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, isPopupVisible, closePopup }}>
      {children}
    </CartContext.Provider>
  );
};
