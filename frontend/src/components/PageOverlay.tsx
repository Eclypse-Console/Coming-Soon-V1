import React, { useEffect, useRef } from "react";

const PageOverlay: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setOverlayHeight = () => {
      if (overlayRef.current) {
        const height = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
        overlayRef.current.style.height = `${height}px`;
      }
    };

    setOverlayHeight();
    window.addEventListener("resize", setOverlayHeight);
    window.addEventListener("scroll", setOverlayHeight);

    return () => {
      window.removeEventListener("resize", setOverlayHeight);
      window.removeEventListener("scroll", setOverlayHeight);
    };
  }, []);

  return <div className="page-overlay" ref={overlayRef} />;
};

export default PageOverlay;
 