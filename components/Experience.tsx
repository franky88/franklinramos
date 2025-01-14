import { Inter } from "next/font/google";
import ExperienceList from "./ExperienceList";
import { ExperienceChart } from "./ExperienceChart";

const interBlack = Inter({
  weight: ["900"],
  subsets: ["latin"],
});

const interRegular = Inter({
  weight: ["300"],
  subsets: ["latin"],
});

const Experience = () => {
  const data = [
    {
      id: "1",
      companyName: "AdonPH Inc.",
      position: "Graphic Designer Team Lead / IT Support",
      dateStart: "2022",
      dateEnd: "2024",
      withLine: true,
    },
    {
      id: "2",
      companyName: "AdonPH Inc.",
      position: "Graphic Designer",
      dateStart: "2020",
      dateEnd: "2022",
      withLine: false,
    },
    {
      id: "3",
      companyName: "Hube Computer Store",
      position: "Co-Owner / Graphic Designer / Accounting",
      dateStart: "2018",
      dateEnd: "2019",
      withLine: false,
    },
    {
      id: "4",
      companyName: "Iligan Computer Institute - CDO",
      position: "Program Head",
      dateStart: "2016",
      dateEnd: "2018",
      withLine: true,
    },
    {
      id: "5",
      companyName: "Iligan Computer Institute - CDO",
      position: "Multimedi Department Head",
      dateStart: "2014",
      dateEnd: "2016",
      withLine: true,
    },
    {
      id: "6",
      companyName: "Iligan Computer Institute - CDO",
      position: "2D Animation and Visual Graphic Trainer",
      dateStart: "2009",
      dateEnd: "2014",
      withLine: false,
    },
  ];
  return (
    <section className="container mx-auto px-8 ">
      <div className="h-full flex items-center justify-start">
        <div className="flex flex-col gap-4">
          <div className="text-left sticky top-0 bg-slate-100 z-50">
            <h2 className={`${interBlack.className} text-[3em]`}>Experience</h2>
            <p className={`${interRegular.className} text-[1.5em]`}>
              Work experience
            </p>
          </div>
          <div className="flex flex-col gap-1">
            {/* <ExperienceChart /> */}
            {data.map((item) => (
              <div key={item.id}>
                <ExperienceList
                  companyName={item.companyName.toUpperCase()}
                  position={item.position}
                  dateStart={item.dateStart}
                  dateEnd={item.dateEnd}
                  withLine={item.withLine}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
