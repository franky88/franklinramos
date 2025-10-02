"use client";

import React from "react";
import { motion } from "framer-motion";
import { SkillCategory } from "@prisma/client";
import { getSkillCategories } from "@/app/actions";

const SkillList = () => {
  const [skillCategories, setSkillCategories] = React.useState<SkillCategory[]>(
    []
  );

  const fetchSkillCategories = async () => {
    try {
      const response = await getSkillCategories();
      setSkillCategories(response);
    } catch (error) {
      console.error("Error fetching skill categories:", error);
    }
  };

  React.useEffect(() => {
    fetchSkillCategories();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {skillCategories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          <GlassCard>
            <div className="text-4xl mb-4">{category.icon}</div>
            <h3 className="text-xl font-bold text-white mb-3">
              {category.name}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {category.description}
            </p>
            <div>
              <small className="text-gray-400 mt-4">
                Tools & Technologies:
              </small>
              <div className="flex flex-wrap gap-2 mt-2">
                {category.skills?.map((skill, idx) => (
                  <small
                    key={idx}
                    className="text-gray-300 leading-relaxed py-2 px-4 bg-white/10 rounded-full"
                  >
                    {skill.name}
                  </small>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillList;

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
