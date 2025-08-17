import { StaticImageData } from "next/image";

export type PortfolioItem = {
  title: string;
  link: string;
  description?: string;
  thumbnail: StaticImageData;
};
