"use client";

import { jsPDF } from "jspdf";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

const ResumePDFGenerator: React.FC = () => {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/experience");
      const data = response.data;
      setExperience(data.experience);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const generatePdf = async (): Promise<void> => {
    setLoading(true);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [210, 297],
    });

    let verticalOffset: number = 10;
    let horizontalOffset: number = 10;

    // Draw filled rectangle (header background)
    pdf.setFillColor(68, 84, 69); // RGB color or use hex like pdf.setFillColor("#445445")
    pdf.rect(0, 0, 210, 30, "F"); // "F" fills the rectangle

    // Set text color to white to contrast with background
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text("Franklin P. Ramos", horizontalOffset, verticalOffset + 5);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(
      "Multimedia Artist / Web Developer",
      horizontalOffset,
      verticalOffset + 10
    );

    pdf.setTextColor(0, 0, 0);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("Work Experience", horizontalOffset, verticalOffset + 28);

    pdf.line(10, verticalOffset + 29, 200, verticalOffset + 29);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    experience.forEach((ex) => {
      pdf.setFont("helvetica", "normal");
      pdf.text(
        `${
          ex.startDate
            ? new Date(ex.startDate).toLocaleString("en-US", {
                month: "short",
              }) +
              " " +
              new Date(ex.startDate).getUTCFullYear()
            : "N/A"
        } to 
        ${
          ex.endDate
            ? new Date(ex.endDate).toLocaleString("en-US", {
                month: "short",
              }) +
              " " +
              new Date(ex.endDate).getUTCFullYear()
            : "N/A"
        }`,
        horizontalOffset,
        verticalOffset + 38
      );
      verticalOffset += 3;
      pdf.setFont("helvetica", "bold");
      pdf.text(`${ex.position}`, horizontalOffset + 45, verticalOffset + 35);
      verticalOffset += 3;
      pdf.setFont("helvetica", "normal");
      pdf.text(`${ex.company}`, horizontalOffset + 45, verticalOffset + 36);
      verticalOffset += 8;
    });

    pdf.save("franklin_ramos_resume.pdf");
  };

  return (
    <>
      <Button
        onClick={generatePdf}
        variant={loading ? "ghost" : "default"}
        disabled={loading}
      >
        {loading ? (
          "Generating..."
        ) : (
          <>
            <Download className="w-4" /> Resume
          </>
        )}
      </Button>
    </>
  );
};

export default ResumePDFGenerator;
