import React, { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';


  function Header() {
  // searchTerm already aa raha hai prop ke through


  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [digital, clothes, laptops, groceries] = await Promise.all([
          fetch('https://dummyjson.com/products/category/smartphones').then(res => res.json()),
          fetch('https://dummyjson.com/products/category/mens-shirts').then(res => res.json()),
          fetch('https://dummyjson.com/products/category/laptops').then(res => res.json()),
          fetch('https://dummyjson.com/products/category/groceries').then(res => res.json())
        ]);
        const combined = [
          ...digital.products,
          ...clothes.products,
          ...laptops.products,
          ...groceries.products
        ];
        setProducts(combined);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchAllData();
  }, []);

  const updateSearchTerm = useCallback(debounce((val) => {
    setSearchTerm(val);
  }, 500), []);

  const handleSearchChange = (e) => {
    updateSearchTerm(e.target.value);

  };

  useEffect(() => {
    let filtered = products;
  
    if (category) {
      filtered = filtered.filter(product => product.category.toLowerCase() === category.toLowerCase());
    }
  
    if (searchTerm) {
      filtered = filtered.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  
    setFilteredProducts(filtered);
  }, [category, products, searchTerm]); // ✅ Already correct dependencies
  

  return (
    <div className="p-4">
    

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <div className="relative p-4 bg-white rounded-lg shadow-lg hover:scale-105 duration-300">
              <div className="overflow-hidden rounded-lg mb-4">
              <img
  src={product.images && product.images.length > 0 ? product.images[0] : product.thumbnail}
  alt={product.title}
  className="h-64 w-full object-contain bg-white"
/>

              </div>
              <div className="px-2">
                <h2 className="text-titlexl font-semibold text-gray-800 line-clamp-2">{product.title}</h2>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-green-600 font-bold">₹{product.price}</p>
                  <button className="btn btn-secondary">More Details</button>
                </div>
              </div>
              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-40 transition-all duration-300 rounded-lg"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Header;
