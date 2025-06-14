import { useEffect, useState } from "react";

export default function TwitterIcon() {
  const [size, setSize] = useState(20);
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSize(27);
      } else if (width >= 768) {
        setSize(23.5);
      } else {
        setSize(20);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <svg
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="transition-all duration-300"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M30.1896 1.69614C28.9719 2.55505 27.6237 3.21199 26.1969 3.64164C25.4311 2.76109 24.4133 2.13698 23.2812 1.85372C22.1491 1.57045 20.9574 1.64171 19.8671 2.05784C18.7768 2.47397 17.8407 3.2149 17.1852 4.18042C16.5298 5.14594 16.1867 6.28947 16.2023 7.45634V8.72791C13.9677 8.78585 11.7535 8.29025 9.75677 7.28525C7.76007 6.28024 6.04291 4.79703 4.75823 2.9677C4.75823 2.9677 -0.32805 14.4118 11.1161 19.4981C8.49731 21.2757 5.37768 22.167 2.21509 22.0412C13.6592 28.3991 27.6465 22.0412 27.6465 7.41819C27.6453 7.064 27.6112 6.71069 27.5447 6.36279C28.8425 5.08295 29.7583 3.46707 30.1896 1.69614Z" stroke="#BFBFBF" stroke-width="2.79745" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}
