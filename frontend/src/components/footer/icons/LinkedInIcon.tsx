import { useEffect, useState } from "react";

export default function LinkedInIcon() {
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
      <path d="M21.7972 10.4302C24.023 10.4302 26.1576 11.3144 27.7315 12.8883C29.3054 14.4621 30.1896 16.5968 30.1896 18.8225V28.6136H24.5947V18.8225C24.5947 18.0806 24.2999 17.3691 23.7753 16.8445C23.2507 16.3198 22.5391 16.0251 21.7972 16.0251C21.0553 16.0251 20.3437 16.3198 19.8191 16.8445C19.2945 17.3691 18.9998 18.0806 18.9998 18.8225V28.6136H13.4049V18.8225C13.4049 16.5968 14.2891 14.4621 15.8629 12.8883C17.4368 11.3144 19.5714 10.4302 21.7972 10.4302Z" stroke="#BFBFBF" stroke-width="2.79745" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M7.80996 11.8289H2.21506V28.6136H7.80996V11.8289Z" stroke="#BFBFBF" stroke-width="2.79745" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M5.01251 7.63274C6.5575 7.63274 7.80996 6.38028 7.80996 4.83529C7.80996 3.2903 6.5575 2.03784 5.01251 2.03784C3.46752 2.03784 2.21506 3.2903 2.21506 4.83529C2.21506 6.38028 3.46752 7.63274 5.01251 7.63274Z" stroke="#BFBFBF" stroke-width="2.79745" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}
