import React, { useState } from 'react';
import { useCart } from './CartContext';
import BuyNowForm from './BuyNowForm'; // Import the form component

const CartPopup = () => {
  const { cart, isPopupVisible, closePopup, decreaseQuantity } = useCart();
  const [showForm, setShowForm] = useState(false);

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (!isPopupVisible) return null;

  return (
    <>
      {showForm && <BuyNowForm onClose={() => setShowForm(false)} />}
      <div className="fixed inset-0 bg-black-300 bg-opacity-50 flex justify-center items-center z-40">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          <ul>
            {cart.length === 0 ? (
              <p>Your cart is empty!</p>
            ) : (
              cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center py-2">
                  <div className="flex gap-2 items-center">
                    <img src={item.thumbnail} alt="thumb" className="w-20 h-20 rounded-md" />
                    <span className="text-sm ml-8 text-green-600">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Qty: {item.quantity}</span>
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                    >
                      -
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>

          {/* Total */}
          <div className="mt-4 text-lg font-semibold">
            Total: ₹{getTotal()}
          </div>

          {/* Buttons */}
          <div className="mt-4 flex justify-between">
            <button
              onClick={closePopup}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>

            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            >
              🛍️ Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPopup;
