"use client";

import { motion } from "framer-motion";

export const FeatureCards = () => {
  const features = [
    {
      title: "Graphic & Web Design",
      description:
        "Logos, branding, print materials, digital assets, and more.",
      icon: "🎨",
      apps: [
        { name: "Figma", icon: "figma-icon" },
        { name: "Photoshop", icon: "photoshop-icon" },
        { name: "Illustrator", icon: "illustrator-icon" },
        { name: "Canva", icon: "canva-icon" },
      ],
    },
    {
      title: "Web App Development",
      description:
        "Full-stack development for web applications using modern technologies.",
      icon: "💻",
      apps: [
        { name: "HTML", icon: "html-icon" },
        { name: "CSS", icon: "css-icon" },
        { name: "JavaScript", icon: "javascript-icon" },
        { name: "TypeScript", icon: "typescript-icon" },
        { name: "Next.js", icon: "nextjs-icon" },
        { name: "React", icon: "react-icon" },
        { name: "Node.js", icon: "nodejs-icon" },
        { name: "Tailwind CSS", icon: "tailwind-icon" },
      ],
    },
    {
      title: "Motion Graphics & Animation",
      description: "2D/3D animation, explainer videos, and animated logos.",
      icon: "🎬",
      apps: [
        { name: "After Effects", icon: "after-effects-icon" },
        { name: "Blender", icon: "blender-icon" },
        { name: "Cinema 4D", icon: "cinema-4d-icon" },
        { name: "Premiere Pro", icon: "premiere-icon" },
      ],
    },
  ];

  return (
    <section id="skills" className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive look at the services I offer to bring your creative
            projects to fruition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <GlassCard>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
                <div>
                  <small className="text-gray-400 mt-4">
                    Tools & Technologies:
                  </small>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {feature.apps?.map((app, idx) => (
                      <small
                        key={idx}
                        className="text-gray-300 leading-relaxed py-2 px-4 bg-white/10 rounded-full"
                      >
                        {app.name}
                      </small>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GlassCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative px-6 py-8 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg leading-none">
        <div className="flex flex-col items-start space-y-2">{children}</div>
      </div>
    </div>
  );
};
