import React from 'react';
import Marquee from "react-fast-marquee"; // ✅ IMPORT IS NECESSARY

function Marque() {
  return (
    <div>
   
      <div className="relative py-2 bg-gray-100 shadow-lg">
        <Marquee pauseOnHover speed={50} gradient={false} className="w-full">
          <div className="flex items-center space-x-6 cursor-pointer">
            {[...Array(10)].map((_, index) => (
              <span
                key={index}
                className="flex items-center text-black space-x-2"
              >
                <img
                  src="/images/emoj1.png"
                  alt="emoji"
                  className="w-6 h-6"
                />
                <span>Watch all courses for just $12/month</span>
                <strong className="text-black">The Creative Pass</strong>
              </span>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
}

export default Marque;
