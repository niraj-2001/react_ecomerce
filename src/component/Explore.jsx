import React, { forwardRef } from "react";

const Explore = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="absolute top-[100%] left-20 w-[90%]  bg-white z-40 shadow-lg  h-96 p-6"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Explore Section</h2>
        <p>
          Bhai yaha tera explore content hai, ab bahar click karega to close hoga
          properly 😎
        </p> 
      </div>
    </div>
  );
});

export default Explore;
