import { Inter } from "next/font/google";
import { ContactForm } from "./ContactForm";

const interBlack = Inter({
  weight: ["900"],
  subsets: ["latin"],
});

const interRegular = Inter({
  weight: ["300"],
  subsets: ["latin"],
});

const Contact = () => {
  return (
    <section className="container h-screen mx-auto px-8 ">
      <div className="h-full flex items-center justify-start">
        <div className="flex flex-col gap-3 w-[400px]">
          <div>
            <h2 className={`${interBlack.className} text-[3em]`}>Contact</h2>
            <p className={`${interRegular.className} text-[1.5em]`}>
              Get in touch with me.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
