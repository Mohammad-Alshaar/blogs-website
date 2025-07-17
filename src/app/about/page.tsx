import Image from "next/image";
import aboutHeroOne from "../../../public/about-hero-01.jpg";
import aboutHeroTwo from "../../../public/about-hero-02.jpg";
import plane from "../../../public/plane.png";
import AboutSecOne from "@/components/about/AboutSecOne";
import AboutSecTwo from "@/components/about/AboutSecTwo";
import AboutSecThree from "@/components/about/AboutSecThree";
import AboutSecFour from "@/components/about/AboutSecFour";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About",
  description: "About me page",
};
export default function AboutPage() {
  return (
    <>
      <AboutSecOne />
      <AboutSecTwo>
        <Image src={aboutHeroOne} alt="img" priority />
        <Image src={aboutHeroTwo} alt="img" priority />
      </AboutSecTwo>
      <AboutSecThree />
      <AboutSecFour>
        <Image src={plane} alt="plane" priority />
      </AboutSecFour>
    </>
  );
}
