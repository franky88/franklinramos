"use client";

import { useEffect, useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import MyResume from "./MyResume";
import axiosInstance from "@/lib/axiosInstance";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronLeft, Download } from "lucide-react";

const PDFResume = () => {
  const [isClient, setIsClient] = useState(false);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchExperience = async () => {
    try {
      setLoading(false);
      const response = await axiosInstance.get("/experience");
      const data = response.data;
      setExperience(data.experience || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(true);
    }
  };

  const fetchSkills = async () => {
    try {
      setLoading(false);
      const response = await axiosInstance.get("/skill");
      const data = response.data;
      console.log("Skills", data);
      setSkills(data.skills);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    setIsClient(true);
    fetchExperience();
    fetchSkills();
  }, []);

  if (!loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Fetching data ...
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute float-start">
        <Link href={"/"} className="flex gap-3 items-center p-5">
          <ChevronLeft className="w-4" /> Home
        </Link>
      </div>
      {isClient && (
        <div className="flex flex-col items-center">
          {/* Download PDF Button */}
          <div className="mt-40 mb-20">
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center gap-5">
                <div className="flex flex-col items-center gap-2">
                  <strong className="text-3xl">Franklin Ramos</strong>
                  <small>Multimedia Artist / Web Developer</small>
                </div>
                <PDFDownloadLink
                  document={
                    <MyResume experience={experience} skills={skills} />
                  }
                  fileName={`Franklin_Ramos_${new Date().getFullYear()}_Resume.pdf`}
                >
                  {({ loading }) => (
                    <Button
                      variant={loading ? "ghost" : "default"}
                      style={{ padding: "10px 20px", fontSize: 16 }}
                    >
                      {loading ? (
                        "Loading document..."
                      ) : (
                        <>
                          <Download /> Resume
                        </>
                      )}
                    </Button>
                  )}
                </PDFDownloadLink>
              </div>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="w-1/3 rounded-lg">
            <PDFViewer className="w-full h-[500px] rounded-lg">
              <MyResume experience={experience} skills={skills} />
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFResume;
