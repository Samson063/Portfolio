import React, { useState } from 'react';

const PremiumAccordion = ({ 
  items, 
  theme = 'default',
  animation = 'slide',
  allowMultiple = false 
}) => {
  const [openIndices, setOpenIndices] = useState([]);

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenIndices(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndices(prev => prev.includes(index) ? [] : [index]);
    }
  };

  const isOpen = (index) => openIndices.includes(index);

  // Theme configurations
  const themes = {
    default: {
      header: 'bg-white hover:bg-gray-50 border-gray-200',
      headerOpen: 'bg-blue-50 border-blue-200',
      text: 'text-gray-800',
      textOpen: 'text-blue-700',
      icon: 'text-gray-500',
      iconOpen: 'text-blue-600',
      content: 'bg-white text-gray-700'
    },
    dark: {
      header: 'bg-gray-800 hover:bg-gray-700 border-gray-600',
      headerOpen: 'bg-blue-900 border-blue-500',
      text: 'text-gray-200',
      textOpen: 'text-blue-300',
      icon: 'text-gray-400',
      iconOpen: 'text-blue-400',
      content: 'bg-gray-800 text-gray-300'
    },
    gradient: {
      header: 'bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border-gray-200',
      headerOpen: 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200',
      text: 'text-gray-800',
      textOpen: 'text-blue-700',
      icon: 'text-gray-500',
      iconOpen: 'text-purple-600',
      content: 'bg-white text-gray-700'
    }
  };

  // Animation configurations
  const animations = {
    slide: {
      container: 'transition-all duration-500 ease-out',
      open: 'max-h-[500px] opacity-100',
      closed: 'max-h-0 opacity-0'
    },
    fade: {
      container: 'transition-all duration-700 ease-in-out',
      open: 'max-h-[500px] opacity-100 translate-y-0',
      closed: 'max-h-0 opacity-0 -translate-y-2'
    },
    scale: {
      container: 'transition-all duration-600 ease-out',
      open: 'max-h-[500px] opacity-100 scale-100',
      closed: 'max-h-0 opacity-0 scale-95'
    },
    elastic: {
      container: 'transition-all duration-800 ease-out',
      open: 'max-h-[500px] opacity-100',
      closed: 'max-h-0 opacity-0'
    }
  };

  const currentTheme = themes[theme] || themes.default;
  const currentAnim = animations[animation] || animations.slide;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className={`
            border rounded-xl shadow-sm
            transition-all duration-500 ease-out
            hover:shadow-lg
            ${isOpen(index) 
              ? `${currentTheme.headerOpen} ring-2 ring-blue-500 ring-opacity-20 shadow-lg` 
              : `${currentTheme.header} hover:shadow-md`
            }
          `}
        >
          <button
            className={`
              flex justify-between items-center w-full py-5 px-6
              transition-all duration-500 ease-out
              ${isOpen(index) ? 'rounded-t-xl' : 'rounded-xl'}
            `}
            onClick={() => toggleItem(index)}
          >
            <span className={`
              font-semibold text-lg
              transition-all duration-500 ease-out
              ${isOpen(index) ? currentTheme.textOpen : currentTheme.text}
            `}>
              {item.title}
            </span>
            
            {/* Advanced animated icon */}
            <div className="relative">
              <div className={`
                absolute inset-0 bg-blue-500 rounded-full
                transition-all duration-500 ease-out
                ${isOpen(index) 
                  ? 'scale-150 opacity-10' 
                  : 'scale-0 opacity-0'
                }
              `} />
              
              <svg
                className={`
                  w-6 h-6 relative
                  transition-all duration-700 ease-out
                  ${isOpen(index) 
                    ? `${currentTheme.iconOpen} rotate-180 scale-110` 
                    : `${currentTheme.icon} rotate-0 scale-100`
                  }
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

          <div
            className={`
              ${currentAnim.container}
              ${isOpen(index) ? currentAnim.open : currentAnim.closed}
            `}
          >
            <div className={`
              py-5 px-6
              transition-all duration-700 ease-out
              ${isOpen(index) 
                ? 'translate-y-0 opacity-100 delay-150' 
                : 'translate-y-4 opacity-0'
              }
              ${currentTheme.content}
            `}>
              <div className="leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PremiumAccordion;