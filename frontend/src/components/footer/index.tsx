
import InstagramIcon from "./icons/InstagramIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import TwitterIcon from "./icons/TwitterIcon";
import OrbitFooter from "./OrbitFooter";
import type { OrbitIcon, Breakpoints } from "./types";




const iconList: OrbitIcon[] = [
  {
    icon: <InstagramIcon />,
    url: "https://instagram.com",
    delay: "0",
  },
  {
    icon: <TwitterIcon />,
    url: "https://twitter.com",
    delay: "4",
  },
  {
    icon: <LinkedInIcon />,
    url: "https://www.linkedin.com/company/eclypse-store/",
    delay: "8",
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
    <div className="w-full  relative flex items-end justify-center overflow-hidden z-[110]">
      <OrbitFooter icons={iconList} breakpoints={breakpoints} />
      <p className="absolute bottom-12 text-white  font-normal text-[14px] md:text-[16.25px] leading-[150%] tracking-[0] text-center w-full opacity-70">
        Aeza Innovations © Pvt. Ltd.
      </p>

      <div className="block w-full h-72 transform translate-y-1/2 blur-3xl rounded-[100%] rounded-b-0 bg-[#3d3d9a20] " />
    </div>
  );
};

export default Footer;
