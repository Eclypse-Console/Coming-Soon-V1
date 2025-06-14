import type { ReactElement } from "react";

export interface OrbitIcon {
  icon: ReactElement;
  url: string;
  delay: string;
}

export interface Breakpoints {
  defaultRadiusXRatio: number;
  defaultRadiusYRatio: number;
  mobileHeight: number;
  desktopHeight: number;
  responsiveThreshold: number;
}

export interface IconProps {
  height?: number;
  width?: number;
  className?: string;
}
export const LogoIconsDefaultSize = 27;
