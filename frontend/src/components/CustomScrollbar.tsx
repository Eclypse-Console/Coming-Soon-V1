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

        if (scrollHeight <= clientHeight) {
            setIsThumbVisible(false);
            return;
        }

        if (!isThumbVisible) {
            setIsThumbVisible(true);
        }

        const newThumbHeight = (clientHeight / scrollHeight) * clientHeight / 2;
        const scrollableHeight = scrollHeight - clientHeight;
        const thumbMaxTop = clientHeight - newThumbHeight;
        const newThumbTop = (scrollTop / scrollableHeight) * thumbMaxTop;

        setThumbHeight(newThumbHeight);
        setScrollThumbTop(newThumbTop);
    }, [isThumbVisible]);

    const handleRef = (el: HTMLDivElement | null) => {
        contentRef.current = el;
        if (el) handleScroll();
    };

    return (
        <div className={`relative h-full w-full ${className}`}>
            <div
                ref={handleRef}
                className="h-full w-full overflow-y-scroll no-scrollbar"
                onScroll={handleScroll}
            >
                <div className="pr-1">
                    {children}
                </div>
            </div>

            {isThumbVisible && (
                <div className="pointer-events-none absolute top-0 right-0 h-full w-[7px] z-10 bg-transparent">
                    <div
                        className="absolute right-[1px] w-[5px] rounded-full bg-gray-400 opacity-70"
                        style={{
                            height: `${thumbHeight}px`,
                            top: `${scrollThumbTop}px`,
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default CustomScrollbar;
