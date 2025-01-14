import { Facebook, Twitter, Download } from "lucide-react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { Button } from "./ui/button";

const interBlack = Inter({
  weight: ["900"],
  subsets: ["latin"],
});

const interRegular = Inter({
  weight: ["300"],
  subsets: ["latin"],
});

const AboutMe = () => {
  return (
    <section className="container h-screen mx-auto px-8">
      <div className="h-full flex flex-col gap-8 items-start justify-center">
        <div className="text-left">
          <h2 className={`${interBlack.className} text-[3em]`}>About me</h2>
          <Image
            src="/profile.jpg"
            width={350}
            height={350}
            alt="profile image"
          />
          <p className={`${interRegular.className} text-[1em] w-[500px] mt-4`}>
            I am a skilled multimedia artist with over 10 years of experience in
            the field. My expertise spans graphic design, video editing, email
            newsletter designs, and logo animations. I excel in both actual and
            digital animation and am proficient in using Adobe applications, and
            various other multimedia software. My passion for creativity and
            attention to detail drives me to deliver high-quality work in every
            project I undertake.
          </p>
          <div className="mt-4">
            <Button variant={"default"} className="flex items-center">
              <Download className="w-4" />
              Resume
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Facebook className="w-4" />
          <Twitter className="w-4" />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
