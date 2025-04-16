import React, { useState } from 'react';
import axios from 'axios';

const BuyNowForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'phone') {
      const isValidPhone = /^[6-9]\d{9}$/.test(value);
      setErrors((prev) => ({
        ...prev,
        phone: isValidPhone ? '' : 'Enter a valid 10-digit phone number',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.phone) {
      alert('Please fix phone number error');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/submit-order', formData);
      alert('Order Placed Successfully!');
      onClose(); // Close the form
    } catch (err) {
      alert('Error submitting order');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">🛍️ Buy Now</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md w-full mb-3"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md w-full mb-3"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={`border px-3 py-2 rounded-md w-full mb-1 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {errors.phone && <p className="text-red-500 text-sm mb-2">{errors.phone}</p>}

          <textarea
            name="address"
            placeholder="Your Address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md w-full mb-4"
            rows="3"
            required
          />

          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-md">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyNowForm;
