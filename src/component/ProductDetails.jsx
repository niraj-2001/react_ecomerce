import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { useCart } from './CartContext';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImg(data.images[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#3b82f6" size={80} />
      </div>
    );
  }

  if (!product) {
    return <div className="text-center text-red-500 mt-10">Product not found</div>;
  }

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
      {/* Left Section */}
      <div className="md:w-1/2">
        <img src={mainImg} alt={product.title} className="w-full h-80 object-contain rounded shadow" />
        <div className="flex gap-3 mt-4 flex-wrap">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setMainImg(img)}
              className={`w-16 h-16 object-cover border-2 rounded-lg cursor-pointer ${
                mainImg === img ? 'border-blue-500' : 'border-gray-300'
              }`}
              alt="thumb"
            />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600">
              ⬅ Back
            </button>
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="mt-2 text-gray-700">{product.description}</p>

        <div className="inline-block bg-yellow-100 text-yellow-800 font-bold text-2xl px-4 py-2 rounded-lg shadow-md border border-yellow-300 mt-4">
          ₹{product.price}
        </div>

        <div className="mt-3 text-sm text-gray-600">
          ⭐ Rating: <span className="font-semibold">{product.rating}</span>
        </div>

        <div className="mt-1 text-sm text-green-700">
          Stock: <span className="font-semibold">{product.stock}</span> available
        </div>

        <div className="mt-4">
          <span className="text-sm text-gray-600">Category: </span>
          <span className="font-medium text-blue-900">{product.category}</span>
        </div>

        <div className="p-4 bg-white rounded-lg w-64 mt-4 h-8 text-center">
          <button
            onClick={() => addToCart(product)}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4  mt-20 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
