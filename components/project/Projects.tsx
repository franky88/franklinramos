import { Inter } from "next/font/google";
import ProjectList from "./ProjectList";

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
          <div>
            <div>
              <h2
                className={`${interBlack.className} text-[3em] text-gray-800`}
              >
                Projects
              </h2>
              <p
                className={`${interRegular.className} text-[1.5em] text-gray-800`}
              >
                Here are some of my projects.
              </p>
            </div>
          </div>
          <div>
            <ProjectList />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
