import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Dropdown Component
const Dropdown = ({ title, options, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative inline-block text-left w-full sm:w-[48%] md:w-auto" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full shadow-lg bg-white text-black px-3 py-[10px] rounded-md m-2 flex items-center justify-between md:justify-start gap-1"
      >
        <span>{title}</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg z-10 p-2">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
            >
              <input
                type="radio"
                name={title}
                value={option}
                checked={selected === option}
                onChange={() => setSelected(option)}
                className="w-4 h-4 appearance-none border border-gray-400 rounded-full checked:bg-blue-500 checked:border-transparent focus:outline-none"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  const [selected1, setSelected1] = useState("");
  const [selected2, setSelected2] = useState("");
  const [selected3, setSelected3] = useState("");
  const [selected4, setSelected4] = useState("");
  const [selected5, setSelected5] = useState("");

  const options1 = ["HTML", "CSS", "JavaScript"];
  const options2 = ["React", "Vue", "Angular"];
  const options3 = ["Node.js", "Django", "Laravel"];
  const options4 = ["MongoDB", "MySQL", "PostgreSQL"];
  const options5 = ["MongoDB"];

  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap mt-3 items-start justify-between w-[93%] ml-14 shadow-lg bg-gray-200 p-3">

        {/* Menus 1 to 4 - responsive wrap */}
        {/* Menus 1 to 4 - responsive grid on mobile, flex on desktop */}
<div className="grid grid-cols-2 gap-2 w-full md:flex md:flex-wrap md:w-auto">
  <Dropdown title="Menu 1" options={options1} selected={selected1} setSelected={setSelected1} />
  <Dropdown title="Menu 2" options={options2} selected={selected2} setSelected={setSelected2} />
  <Dropdown title="Menu 3" options={options3} selected={selected3} setSelected={setSelected3} />
  <Dropdown title="Menu 4" options={options4} selected={selected4} setSelected={setSelected4} />
</div>


        {/* Menu 5 + Reset Button (hidden on small screens) */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <Dropdown title="Menu 5" options={options5} selected={selected5} setSelected={setSelected5} />
          <button className="text-black w-40 font-semibold shadow-lg hover:text-white py-2 px-4 border border-black hover:border-transparent rounded bg-white hover:bg-black transition">
            Reset Filter
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
