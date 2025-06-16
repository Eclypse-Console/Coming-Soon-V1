
import InstagramIcon from "./icons/InstagramIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import TwitterIcon from "./icons/TwitterIcon";
import StraightLineFooter from "./straightLineFooter";

import type { OrbitIcon, Breakpoints } from "./types";

const iconList: OrbitIcon[] = [
  {
    icon: <InstagramIcon />,
    url: "",
    delay: "0",
  },
  {
    icon: <TwitterIcon />,
    url: "https://x.com/Eclypse_in",
    delay: "1",
  },
  {
    icon: <LinkedInIcon />,
    url: "https://www.linkedin.com/company/eclypse-store/",
    delay: "2",
  },
];

const breakpoints: Breakpoints = {
  defaultRadiusXRatio: 0.502,
  defaultRadiusYRatio: 0.7,
  mobileHeight: 150,
  desktopHeight: 450,
  responsiveThreshold: 1025,
};

const Footer = () => {
  return (
    <div className="w-full relative flex flex-col items-center justify-center overflow-hidden z-[110] py-8 sm:py-12 md:py-16">
      <StraightLineFooter 
        icons={iconList} 
        breakpoints={breakpoints} 
        className="mb-8 sm:mb-12 md:mb-16"
      />
      
      <p className="text-white font-normal text-sm sm:text-base md:text-lg leading-[150%] tracking-[0] text-center w-full opacity-70 px-4">
        Aeza Innovations © Pvt. Ltd.
      </p>

      <div className="absolute bottom-0 w-full h-32 sm:h-40 md:h-48 lg:h-72 transform translate-y-1/2 blur-3xl rounded-[100%] rounded-b-0 bg-[#3d3d9a20]" />
    </div>
  );
};

export default Footer;