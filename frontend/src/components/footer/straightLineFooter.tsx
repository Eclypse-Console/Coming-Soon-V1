import React, { useEffect, useState } from "react";
import type { Breakpoints, OrbitIcon } from "./types";
import { toast } from "sonner";
interface Props {
  icons: OrbitIcon[];
  breakpoints: Breakpoints;
  className?: string;
}
const handleClick = (e: React.MouseEvent) => {
  e.preventDefault(); // Prevent default link behavior
  e.stopPropagation(); // Stop event from bubbling up

  toast.success("Page launching Soon", {
    // description: "Opening Instagram profile...",
  });
};
const StraightLineFooter: React.FC<Props> = ({ icons, className }) => {
  const [activeIcons, setActiveIcons] = useState<number[]>([]);

  useEffect(() => {
    icons.forEach((icon, index) => {
      const delayInMs = parseFloat(icon.delay) * 1000;
      setTimeout(() => {
        setActiveIcons((prev) => [...prev, index]);
      }, delayInMs);
    });
  }, [icons]);

  const tooltipMessages = [
    "Coming Soon", // Instagram
    "Tweet About Us", // Twitter
    "Connect With Us", // LinkedIn
  ];

  return (
    <div
      className={`flex items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 mt-10 ${className ?? ""
        }`}

    >
      {icons.map((iconObj, i) => (
        <div
          key={i}
          className={`${activeIcons.includes(i) ? "opacity-100" : "opacity-0"
            } transition-opacity duration-500 relative group`}
        >
          <a

            href={iconObj.url}
            className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-14 lg:w-14 xl:h-16 xl:w-16 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 footor-icons"
            onClick={handleClick}
          >
            {iconObj.icon}
          </a>

          <div className="absolute bottom-full mb-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs sm:text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-50">
            {tooltipMessages[i]}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StraightLineFooter;
