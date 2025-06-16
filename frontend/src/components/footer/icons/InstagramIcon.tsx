import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function InstagramIcon() {
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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    e.stopPropagation(); // Stop event from bubbling up

    toast.success("Page launching Soon", {
      // description: "Opening Instagram profile...",
    });
  };

  return (
    <svg
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="transition-all duration-300 cursor-pointer hover:scale-110"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick}
    >
      <path
        d="M23.8953 8.50935H23.9093M9.20865 2.21509H23.1959C27.0584 2.21509 30.1895 5.34624 30.1895 9.20872V23.196C30.1895 27.0584 27.0584 30.1896 23.1959 30.1896H9.20865C5.34618 30.1896 2.21503 27.0584 2.21503 23.196V9.20872C2.21503 5.34624 5.34618 2.21509 9.20865 2.21509ZM21.7972 15.3211C21.9698 16.4852 21.771 17.6741 21.229 18.7187C20.687 19.7632 19.8294 20.6103 18.7782 21.1394C17.727 21.6685 16.5358 21.8526 15.3739 21.6657C14.2121 21.4787 13.1387 20.9302 12.3066 20.098C11.4745 19.2659 10.9259 18.1926 10.739 17.0307C10.552 15.8688 10.7362 14.6776 11.2652 13.6264C11.7943 12.5752 12.6414 11.7177 13.686 11.1757C14.7305 10.6337 15.9194 10.4348 17.0835 10.6074C18.2709 10.7835 19.3702 11.3368 20.219 12.1856C21.0678 13.0344 21.6211 14.1337 21.7972 15.3211Z"
        stroke="#BFBFBF"
        strokeWidth="2.79745"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}