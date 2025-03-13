import { Inter } from "next/font/google";
import ExperienceList from "./ExperienceList";

const interBlack = Inter({
  weight: ["900"],
  subsets: ["latin"],
});

const interRegular = Inter({
  weight: ["300"],
  subsets: ["latin"],
});

const Experience = () => {
  return (
    <section className="container mx-auto px-8 ">
      <div className="h-full flex items-center justify-start">
        <div className="flex flex-col gap-4">
          <div className="text-left sticky top-0 bg-slate-100">
            <div>
              <h2
                className={`${interBlack.className} text-[3em] text-gray-800`}
              >
                Skills & Experience
              </h2>
              <p
                className={`${interRegular.className} text-[1.5em] text-gray-800`}
              >
                Work experience & skills aquired
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div>
              <ExperienceList />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
