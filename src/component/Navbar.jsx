import { useEffect, useRef, useState } from "react";
import Marque from "../component/Marque";
import Explore from "../component/Explore";
import Filter from "../component/Filter";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ onSearchChange }) {
  const [showComponent,setShowComponent]=useState(false)
  const [showExplore, setShowExplore] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // Debounced value
  const exploreRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce delay

    // Cleanup on component unmount or searchTerm change
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      if (onSearchChange) onSearchChange(debouncedSearchTerm); // Pass debounced value to parent component
    }
  }, [debouncedSearchTerm, onSearchChange]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        exploreRef.current &&
        !exploreRef.current.contains(e.target) &&
        !e.target.closest("#explore-btn")
      ) {
        setShowExplore(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    console.log("Search Term in Navbar:", value); // Debug line
    setSearchTerm(value);
  };
  

  const handleClick = () => {
    setShowComponent(prev => !prev); // toggle karega
  };
  

  return (
    <>
      <Marque />
      <div className="relative px-6 md:px-16">
        <nav className="py-3 flex items-center justify-between z-50 relative">
          <Link to="/">
            <div className="text-2xl font-bold text-gray-800">All.</div>
          </Link>

          <div className="hidden md:flex gap-6 items-center w-full justify-end">
            <button
              id="explore-btn"
              className="border border-gray-300 rounded px-3 py-1"
              onClick={() => setShowExplore(!showExplore)}
            >
              Explore
            </button>

            <ul className="flex gap-4 text-gray-700 font-medium">
              <Link to="/?category=groceries" className="hover:text-yellow-400 px-2 py-1 rounded-md">Groceries</Link>
              <Link to="/?category=laptops" className="hover:text-yellow-400 px-2 py-1 rounded-md">Laptop</Link>
              <Link to="/?category=mens-shirts" className="hover:text-yellow-400 px-2 py-1 rounded-md">Shirts</Link>
              <Link to="/?category=smartphones" className="hover:text-yellow-400 px-2 py-1 rounded-md">Smartphones</Link>
            </ul>

            <form onSubmit={(e) => e.preventDefault()} className="relative max-w-[600px] mx-auto mt-6">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search Products"
                className="w-full h-12 pl-10 pr-4 text-base rounded-lg border border-gray-300 focus:outline-none"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
                </svg>
              </div>
            </form>

            <div className="flex space-x-4 items-start">
  {/* Login Button */}
  <button className="text-black font-bold px-6 py-3 w-32 h-12 bg-white rounded shadow-md hover:shadow-lg transition-all duration-300">
    Login
  </button>

  {/* Filter Button + Component */}
  <div>
    <button
      className="text-black font-bold px-6 py-3 w-32 h-12 bg-white rounded shadow-md hover:shadow-lg transition-all duration-300"
      onClick={handleClick}
    >
      Filter
    </button>

    {/* Filter component dikhega ya nahi */}
    <div className="mt-4 w-[300px] h-auto shadow-lg p-4 bg-gray-100 rounded">
      {showComponent && <Filter />}
    </div>
  </div>
</div>


          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="md:hidden bg-white w-full px-6 py-4 space-y-4 shadow-md text-center">
            <button
              id="explore-btn"
              className="border border-gray-300 rounded px-3 py-1 w-full text-center"
              onClick={() => setShowExplore(!showExplore)}
            >
              Explore
            </button>

            <ul className="flex flex-col gap-3 text-gray-700 font-medium items-center">
              <Link to="/?category=groceries">Groceries</Link>
              <Link to="/?category=laptops">Laptop</Link>
              <Link to="/?category=smartphones">Smartphones</Link>
            </ul>

            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search Website"
              className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none"
            />

            <div className="flex flex-col gap-2">
              <button className="text-black px-4 border font-bold py-1 rounded">Login</button>
              <button className="text-black px-4 border font-bold py-1 rounded">Sign Up</button>
              <button className="border border-black text-black px-4 py-1 font-bold rounded bg-white">Submit Website</button>
            </div>
          </div>
        )}

        {showExplore && (
          <div ref={exploreRef} className="absolute top-[100%] left-0 w-full z-40 bg-white shadow-lg">
            <Explore />
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
