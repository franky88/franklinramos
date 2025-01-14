import { Inter } from "next/font/google";
import ProjectCard from "./ProjectCard";

const interBlack = Inter({
  weight: ["900"],
  subsets: ["latin"],
});

const interRegular = Inter({
  weight: ["300"],
  subsets: ["latin"],
});

const Projects = () => {
  const data = [
    {
      title: "Pizza Connect",
      description: "sample description",
      url: "https://idoxcc2.sufydely.com/Pizza%20Connect.mp4",
    },
    {
      title: "Eyelet Supply",
      description: "sample description 2",
      url: "https://idoxcc2.sufydely.com/Eyelet%20Supply%20Company.mp4",
    },
    {
      title: "sample3",
      description: "sample description 3",
      url: "sample3",
    },
  ];
  return (
    <section className="container h-screen mx-auto px-8 ">
      <div className="h-full flex items-center justify-start">
        <div className="text-left">
          <h2 className={`${interBlack.className} text-[3em]`}>Projects</h2>
          <p className={`${interRegular.className} text-[1.5em]`}>
            Here are some of my projects.
          </p>
          <div className="product-grid">
            {data.map((item) => (
              <div key={item.title} className="mt-5">
                <ProjectCard
                  title={item.title}
                  description={item.description}
                  url={item.url}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
