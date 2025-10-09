import React, { useState } from 'react';

const AnimatedAccordion = ({ items, animationType = "slide" }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Animation configurations
  const animations = {
    slide: {
      container: "overflow-hidden",
      transition: "transition-all duration-500 ease-in-out",
      open: "max-h-[500px] opacity-100",
      closed: "max-h-0 opacity-0"
    },
    fade: {
      container: "overflow-hidden",
      transition: "transition-all duration-700 ease-out",
      open: "max-h-[500px] opacity-100 translate-y-0",
      closed: "max-h-0 opacity-0 -translate-y-4"
    },
    scale: {
      container: "overflow-hidden",
      transition: "transition-all duration-600 ease-in-out",
      open: "max-h-[500px] opacity-100 scale-100",
      closed: "max-h-0 opacity-0 scale-95"
    }
  };

  const currentAnim = animations[animationType] || animations.slide;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={`
            border border-gray-200 rounded-xl shadow-sm
            transition-all duration-300 ease-in-out
            hover:shadow-md
            ${openIndex === index 
              ? 'ring-2 ring-blue-500 ring-opacity-20 shadow-md bg-white' 
              : 'bg-white hover:bg-gray-50'
            }
          `}
        >
          {/* Header */}
          <button
            className={`
              flex justify-between items-center w-full py-5 px-6 text-left
              transition-all duration-300 ease-out
              ${openIndex === index 
                ? 'bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl' 
                : 'rounded-xl hover:bg-gray-50'
              }
            `}
            onClick={() => toggleItem(index)}
          >
            <span className={`
              font-semibold text-lg
              transition-colors duration-300
              ${openIndex === index ? 'text-blue-700' : 'text-gray-800'}
            `}>
              {item.title}
            </span>
            
            {/* Animated Icon */}
            <div className={`
              relative w-6 h-6
              transition-transform duration-500 ease-out
              ${openIndex === index ? 'rotate-180' : 'rotate-0'}
            `}>
              <div className={`
                absolute inset-0 bg-blue-500 rounded-full
                transition-all duration-300
                ${openIndex === index 
                  ? 'scale-100 opacity-20' 
                  : 'scale-0 opacity-0'
                }
              `} />
              <svg
                className={`
                  w-6 h-6 relative
                  transition-colors duration-300
                  ${openIndex === index ? 'text-blue-600' : 'text-gray-500'}
                `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </div>
          </button>

          {/* Content with animations */}
          <div
            className={`
              ${currentAnim.container}
              ${currentAnim.transition}
              ${openIndex === index ? currentAnim.open : currentAnim.closed}
            `}
          >
            <div className={`
              py-5 px-6
              transition-all duration-500 ease-out
              ${openIndex === index 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-4 opacity-0'
              }
            `}>
              <div className="text-gray-700 leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedAccordion;