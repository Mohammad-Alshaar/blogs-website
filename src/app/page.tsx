import SectionOne from "@/components/home/SectionOne";
import SectionThree from "@/components/home/SectionThree";
import SectionTwo from "@/components/home/SectionTwo";
import heroImageOne from "../../public/hero-img-01.jpg";
import heroImageTwo from "../../public/hero-img-02.jpg";
import heroImageThree from "../../public/hero-img-03.jpg";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <SectionOne />
      <SectionTwo>
        <Image src={heroImageOne} alt="Hero Image" priority />
        <Image src={heroImageTwo} alt="Hero Image" priority />
        <Image src={heroImageThree} alt="Hero Image" priority />
      </SectionTwo>
      <SectionThree />
    </>
  );
}
