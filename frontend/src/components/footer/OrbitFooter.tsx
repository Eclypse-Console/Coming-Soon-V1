import React, { useEffect, useState } from "react";
import type { OrbitIcon, Breakpoints } from "./types";


interface Props {
  icons: OrbitIcon[];
  breakpoints: Breakpoints;
  className?: string;
}

const OrbitFooter: React.FC<Props> = ({ icons, breakpoints, className }) => {
  const [svgWidth, setSvgWidth] = useState(0);
  const [activeIcons, setActiveIcons] = useState<number[]>([]);


  useEffect(() => {
    icons.forEach((icon, index) => {
      const delayInMs = parseFloat(icon.delay) * 1000;
      setTimeout(() => {
        setActiveIcons((prev) => [...prev, index]);
      }, delayInMs);
    });
  }, [icons]);


  const pathId = "orbitPath";
  const svgHeight =
    svgWidth < breakpoints.responsiveThreshold
      ? breakpoints.mobileHeight
      : breakpoints.desktopHeight;

  useEffect(() => {
    const updateSize = () => setSvgWidth(window.innerWidth);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);



  const getSafeRadius = (value: number, min: number) => (value < min ? min : value);

  const arcPath =
    svgWidth < breakpoints.responsiveThreshold
      ? `M${-svgWidth * 0.1},${svgHeight} A${svgWidth * 0.9},${svgHeight * 2} 0 0,1 ${svgWidth},${svgHeight}`
      : `M0,${svgHeight} A${svgWidth * getSafeRadius(breakpoints.defaultRadiusXRatio, 0.45)},${(svgHeight) * getSafeRadius(breakpoints.defaultRadiusYRatio, 0.4)} 0 0,1 ${svgWidth},${svgHeight}`;



  return (
    <svg
      width={svgWidth}
      height={svgHeight + 120}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className={`absolute bottom-24 lg:bottom-0 px-0 lg:px-[15%] ${className ?? ""}`}
    >
      <path className="pb-98" id={pathId} d={arcPath} fill="none" stroke={svgWidth < breakpoints.responsiveThreshold ? "#41417C" : "#686868"} strokeWidth={1} />

      {icons.map((iconObj, i) => (
        <g key={i} className={`${activeIcons.includes(i) ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
          <animateMotion
            dur="12s"
            begin={iconObj.delay}
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href={`#${pathId}`} />
          </animateMotion>

          <foreignObject width="100px" height="100px" className=" size-28 flex items-center justify-center rounded-full" y={-45}>
            <a target="_blank" key={iconObj.url} href={iconObj.url}
              className={`h-[80px] md:h-[90px] lg:h-[100px] w-[80px] md:w-[90px] lg:w-[100px] footor-icons rounded-full flex items-center justify-center mt-[25px] md:mt-[20px] lg:mt-[15px] mx-auto hover:scale-150`}
            >
              {iconObj.icon}
            </a>
          </foreignObject>
        </g>
      ))}
    </svg>
  );
};

export default OrbitFooter;
