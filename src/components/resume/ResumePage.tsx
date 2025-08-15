"use client";

import React, { useState } from "react";
import {
  Download,
  Eye,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Printer,
} from "lucide-react";

const ResumePage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  // Sample resume data - you can replace this with props or state management
  const resumeData = {
    personalInfo: {
      name: "Franklin Ramos",
      title: "Multimedia Designer & Web Developer",
      email: "ramosfp99@gmail.com",
      phone: "+63 930 278 5910",
      location: "Cagayan de Oro, Philippines",
      summary:
        "I am a versatile Multimedia Artist with over 5 years of experience in graphic design, video editing, animation, and web development. Skilled in Adobe Creative Suite and various multimedia tools, I create visually compelling and user-friendly digital experiences. With a passion for creativity and innovation, I deliver high-quality designs, animations, and websites that make an impact.",
    },
    experience: [
      {
        title: "Senior Full Stack Developer",
        company: "Tech Corp",
        duration: "2022 - Present",
        description: [
          "Led development of microservices architecture serving 1M+ users",
          "Implemented CI/CD pipelines reducing deployment time by 60%",
          "Mentored junior developers and conducted code reviews",
        ],
      },
      {
        title: "Full Stack Developer",
        company: "StartupXYZ",
        duration: "2020 - 2022",
        description: [
          "Built responsive web applications using React and Node.js",
          "Integrated third-party APIs and payment systems",
          "Optimized database queries improving performance by 40%",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Office Administration",
        school: "Cebu Institute of Technology - University",
        year: "2018",
      },
      {
        degree: "Multimedia Arts",
        school: "Iligan Computer Institute",
        year: "2012",
      },
    ],
    skills: [
      "HTML",
      "CSS",
      "React",
      "Node.js",
      "TypeScript",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "Git",
      "REST APIs",
    ],
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    setError("");

    try {
      console.log("Starting PDF generation...");

      // First, try the API approach
      const resumeElement = document.getElementById("resume-content");
      if (!resumeElement) {
        throw new Error("Resume content not found");
      }

      // Create a complete HTML document with styles
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>${resumeData.personalInfo.name} - Resume</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              background: white;
              padding: 40px;
            }
            
            .resume-container {
              max-width: 800px;
              margin: 0 auto;
              background: white;
            }
            
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #e5e7eb;
            }
            
            .name {
              font-size: 2.5rem;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 5px;
            }
            
            .title {
              font-size: 1.2rem;
              color: #6b7280;
              margin-bottom: 15px;
            }
            
            .contact-info {
              display: flex;
              justify-content: center;
              gap: 20px;
              flex-wrap: wrap;
              font-size: 0.9rem;
              color: #6b7280;
            }
            
            .section {
              margin-bottom: 25px;
            }
            
            .section-title {
              font-size: 1.3rem;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 15px;
              padding-bottom: 5px;
              border-bottom: 1px solid #e5e7eb;
            }
            
            .summary {
              color: #4b5563;
              line-height: 1.7;
            }
            
            .experience-item, .education-item {
              margin-bottom: 20px;
            }
            
            .job-title {
              font-weight: bold;
              color: #1f2937;
              font-size: 1.1rem;
            }
            
            .company {
              color: #6b7280;
              font-style: italic;
            }
            
            .duration {
              color: #9ca3af;
              font-size: 0.9rem;
              margin-bottom: 8px;
            }
            
            .description {
              list-style: none;
              padding-left: 0;
            }
            
            .description li {
              margin-bottom: 5px;
              padding-left: 15px;
              position: relative;
            }
            
            .description li:before {
              content: "•";
              color: #6b7280;
              position: absolute;
              left: 0;
            }
            
            .skills {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
            }
            
            .skill {
              background: #f3f4f6;
              color: #374151;
              padding: 4px 12px;
              border-radius: 15px;
              font-size: 0.9rem;
            }
            
            @media print {
              body {
                padding: 20px;
              }
              
              .resume-container {
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          ${resumeElement.innerHTML}
        </body>
        </html>
      `;

      try {
        console.log("Making API call to /api/html-to-pdf...");

        // Try the API approach first
        const response = await fetch("/api/html-to-pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            html: htmlContent,
            filename: `${resumeData.personalInfo.name.replace(
              " ",
              "_"
            )}_Resume.pdf`,
            pdfOptions: {
              format: "A4",
              printBackground: true,
              margin: {
                top: "20mm",
                right: "20mm",
                bottom: "20mm",
                left: "20mm",
              },
            },
          }),
        });

        console.log("API response status:", response.status);

        if (response.ok) {
          const contentType = response.headers.get("content-type");

          if (contentType && contentType.includes("application/pdf")) {
            // Success! Download the PDF
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = `${resumeData.personalInfo.name.replace(
              " ",
              "_"
            )}_Resume.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            console.log("PDF downloaded successfully!");
            return;
          } else {
            // API returned success but not PDF - might be development mode
            const result = await response.json();
            if (result.developmentMode) {
              console.log(
                "Development mode detected, falling back to browser print"
              );
              throw new Error("API_FALLBACK");
            }
          }
        } else {
          // API failed, fall back to browser print
          console.log("API failed, falling back to browser print");
          throw new Error("API_FALLBACK");
        }
      } catch (apiError) {
        console.log("API approach failed, using browser print fallback");

        // Fallback: Use browser's print functionality
        await useBrowserPrintFallback(htmlContent);
        return;
      }
    } catch (err) {
      console.error("PDF generation failed:", err);

      let errorMessage = "Failed to generate PDF. Please try again.";

      if (err instanceof Error && err.message === "API_FALLBACK") {
        // This is expected, we'll use the fallback
        try {
          const resumeElement = document.getElementById("resume-content");
          if (resumeElement) {
            const htmlContent = `
              <!DOCTYPE html>
              <html>
              <head>
                <title>${resumeData.personalInfo.name} - Resume</title>
                <style>
                  body { font-family: Arial, sans-serif; padding: 20px; }
                  @media print { body { padding: 0; } }
                </style>
              </head>
              <body>
                ${resumeElement.innerHTML}
              </body>
              </html>
            `;
            await useBrowserPrintFallback(htmlContent);
            return;
          }
        } catch (fallbackError) {
          errorMessage =
            "Both PDF generation and print fallback failed. Please try refreshing the page.";
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      // Provide more specific error messages
      if (
        errorMessage.includes("Failed to fetch") ||
        errorMessage.includes("NetworkError")
      ) {
        errorMessage =
          "Network error: Unable to connect to PDF service. Using browser print instead.";
        // Try browser print as last resort
        try {
          window.print();
          return;
        } catch {
          // If even print fails, show the error
        }
      } else if (errorMessage.includes("404")) {
        errorMessage =
          "PDF service not found. Please use the browser print option (Ctrl+P / Cmd+P).";
      } else if (errorMessage.includes("500")) {
        errorMessage =
          "Server error: The PDF service encountered an internal error. Please use browser print (Ctrl+P / Cmd+P).";
      }

      setError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const useBrowserPrintFallback = async (htmlContent: string) => {
    return new Promise<void>((resolve) => {
      // Create a new window with the resume content
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        throw new Error("Popup blocked. Please allow popups and try again.");
      }

      printWindow.document.write(htmlContent);
      printWindow.document.close();

      // Wait for content to load, then trigger print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
          resolve();
        }, 500);
      };

      // Fallback if onload doesn't work
      setTimeout(() => {
        try {
          printWindow.print();
          printWindow.close();
          resolve();
        } catch (e) {
          console.error("Print fallback failed:", e);
          resolve();
        }
      }, 1000);
    });
  };

  const previewResume = () => {
    const resumeElement = document.getElementById("resume-content");
    if (resumeElement) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Resume Preview</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .resume-container { max-width: 800px; margin: 0 auto; }
            </style>
          </head>
          <body>
            ${resumeElement.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Action Buttons */}
        <div className="mb-6 flex gap-4 justify-center flex-wrap">
          <button
            onClick={previewResume}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Eye size={20} />
            Preview
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Printer size={20} />
            Print
          </button>
          <button
            onClick={generatePDF}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Download size={20} />
            )}
            {isGenerating ? "Generating..." : "Download PDF"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Resume Content */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div id="resume-content" className="resume-container p-8">
            {/* Header */}
            <div className="header text-center mb-8 pb-6 border-b-2 border-gray-200">
              <h1 className="name text-4xl font-bold text-gray-900 mb-2">
                {resumeData.personalInfo.name}
              </h1>
              <h2 className="title text-xl text-gray-600 mb-4">
                {resumeData.personalInfo.title}
              </h2>
              <div className="contact-info flex justify-center gap-6 flex-wrap text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Mail size={16} />
                  {resumeData.personalInfo.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone size={16} />
                  {resumeData.personalInfo.phone}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  {resumeData.personalInfo.location}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="section mb-6">
              <h3 className="section-title text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-200">
                Professional Summary
              </h3>
              <p className="summary text-gray-700 leading-relaxed">
                {resumeData.personalInfo.summary}
              </p>
            </div>

            {/* Experience */}
            <div className="section mb-6">
              <h3 className="section-title text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-200">
                Work Experience
              </h3>
              {resumeData.experience.map((job, index) => (
                <div key={index} className="experience-item mb-5">
                  <div className="job-title font-bold text-gray-900 text-lg">
                    {job.title}
                  </div>
                  <div className="company text-gray-600 italic mb-1">
                    {job.company}
                  </div>
                  <div className="duration text-gray-500 text-sm mb-2">
                    {job.duration}
                  </div>
                  <ul className="description pl-0">
                    {job.description.map((item, idx) => (
                      <li key={idx} className="mb-1 pl-4 relative">
                        <span className="absolute left-0 text-gray-500">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="section mb-6">
              <h3 className="section-title text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-200">
                Education
              </h3>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="education-item mb-3">
                  <div className="font-bold text-gray-900">{edu.degree}</div>
                  <div className="text-gray-600 italic">{edu.school}</div>
                  <div className="text-gray-500 text-sm">{edu.year}</div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="section">
              <h3 className="section-title text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-200">
                Technical Skills
              </h3>
              <div className="skills flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="skill bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
