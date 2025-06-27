import beemSvg from '../../../public/assets/svg/beem_pulse.svg';
import EclypseLogo from '../../../public/assets/icons/EclypseLogo.png';
import { motion, useScroll, useTransform } from "framer-motion";
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

export default function Beem_pulse() {



  const { scrollY } = useScroll();

  const rotation = useTransform(scrollY, [0, 210], [120, 0]);



  return (
    <div className='relative min-h-auto lg:mb-0 md:mb-16 mb-5 lg:min-h-screen w-full'>
      <div className='w-full h-full'>
        <div className='relative lg:absolute flex flex-col justify-start items-center w-full overflow-clip'>
          <div className="flex items-center justify-center w-full overflow-hidden relative mt-[-5px]">
            <img
              src={beemSvg}
              alt="beemSvg"
              className="centerBeam min-w-[1400px] sm:min-w-[1500px] 2xl:min-w-[120vw] max-w-full "
            />
            <img
              src={beemSvg}
              alt="beemSvg"
              className="min-w-[1400px] sm:min-w-[1500px] 2xl:min-w-[120vw] max-w-full absolute  top-1/2 left-1/2 transform -translate-y-1/2 z-[11] -translate-x-1/2"
            />
          </div>

          <div className='block h-28 w-2 rounded-full blur-md bg-[#fff] mx-auto absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 topDownAnimation'></div>
          <div className='block h-16 w-2 rounded-full blur-xl bg-[#fff] mx-auto absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 topDownAnimation2'></div>
          <div className='h-14 w-20  aspect-square blur-lg  rounded-full bg-[#ffffff] absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[-20px]  '></div>


          <motion.img
            src={EclypseLogo}
            alt="beemSvg"
            className="centerLogo min-w-[400px] 2xl:min-w-[600px] max-w-1/2 absolute mt-[-7px] 2xl:mt-[-13px] z-[9] top-1/2 ml-[5px] mb-0"
            style={{
              y: "-24%",
              rotate: window.innerWidth >= 768 ? rotation : 0,
            }}
          />
          <motion.img
            src={EclypseLogo}
            alt="beemSvg"
            className="max-w-1/2 min-w-[400px] 2xl:min-w-[600px] absolute mt-[-7px] 2xl:mt-[-13px] z-[10] top-1/2 ml-[5px]"
            style={{
              y: "-24%",
              rotate: window.innerWidth >= 768 ? rotation : 0,
            }} />
        </div>
      </div>
    </div >
  )
}

export { PageOverlay };