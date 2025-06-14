import React, { useState, useRef, useCallback } from 'react';

interface CustomScrollbarProps {
  children: React.ReactNode;
  className?: string;
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({ children, className = '' }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [scrollThumbTop, setScrollThumbTop] = useState(0);
  const [isThumbVisible, setIsThumbVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const content = contentRef.current;
    if (!content) return;

    const { scrollTop, scrollHeight, clientHeight } = content;

    if (!isThumbVisible) {
      setIsThumbVisible(true);
    }

    const newThumbHeight = (clientHeight / scrollHeight) * clientHeight;
    setThumbHeight(newThumbHeight);

    const scrollableHeight = scrollHeight - clientHeight;
    const thumbMaxTop = clientHeight - newThumbHeight;
    const newThumbTop = (scrollTop / scrollableHeight) * thumbMaxTop;
    setScrollThumbTop(newThumbTop);
  }, [isThumbVisible]);

  return (
    <div className={`relative h-full w-full bg-black ${className}`}>
      <div
        ref={contentRef}
        className="h-full w-full overflow-y-scroll no-scrollbar"
        onScroll={handleScroll}
      >
        <div className="pr-2">
          {children}
        </div>
      </div>

      {isThumbVisible && (
        <div className="absolute top-0 right-[2px] h-full w-[7px] py-1 pointer-events-none">
          <div className="absolute right-0 top-0 h-full w-px bg-blue-800 opacity-50"></div>
          <div
            className="absolute right-[1px] w-[5px] bg-gray-400 rounded-full opacity-70"
            style={{
              height: `${thumbHeight}px`,
              top: `${scrollThumbTop}px`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default CustomScrollbar;
