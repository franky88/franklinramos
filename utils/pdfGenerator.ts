import jsPDF from "jspdf";

interface ResumeDetails {
    experience: Experience[];
}

const generatePDF = ({experience}: ResumeDetails) => {
  // Create an instance of jsPDF
  const doc = new jsPDF({
    orientation: "portrait", // or 'landscape'
    unit: "mm", // Measurement unit ('pt', 'mm', 'cm', or 'in')
    format: "a4", // Paper format ('a4', [width, height], etc.)
  });

  // Add a title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Franklin", 10, 20, { align: "center" }); // Centered title

  // Add text content
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  doc.text("This is an example of a PDF document generated using jsPDF.", 10, 30);

  // Add an image
  const imgData = "data:image/jpeg;base64,..."; // Replace with base64 or image URL
  doc.addImage(imgData, "JPEG", 10, 40, 50, 50);

  // Add a table (basic example)
//   const headers = [["Name", "Age", "Country"]];
//   const data = [
//     ["Alice", "25", "USA"],
//     ["Bob", "30", "UK"],
//     ["Charlie", "35", "Canada"],
//   ];
  let y = 60; // Start position for the table
//   headers.forEach((header) => {
//     doc.text(header.join("   "), 10, y);
//     y += 10;
//   });
//   data.forEach((row) => {
//     doc.text(row.join("   "), 10, y);
//     y += 10;
//   });

  experience.forEach((exp, index) => {
    // Add company name
    doc.setTextColor("#0000ff");
    doc.text(`Company: ${exp.company}`, 10, y);
     // Set text color to blue

    // Add position
    y += 7;
    doc.setTextColor("#000000");
    doc.text(`Position: ${exp.position}`, 10, y);

    // Add dates
    y += 7;
    doc.text(
      `Duration: ${new Date(exp.startDate).toLocaleDateString()} - ${
        exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Present"
      }`,
      10,
      y
    );

    // Add description
    y += 7;
    let descriptionData = exp.description.split(',');
    doc.setFillColor("#f9f9f9");
    doc.rect(10, y, 190, 7 * descriptionData.length, "F");
    doc.setTextColor("#666666");
    doc.text("Description", 10, y);
    descriptionData.forEach((desc) => {
        y += 7;
        doc.text(`${desc}`, 10, y);
    });
    // doc.text(`Description: ${exp.description.split(',').map((i)=>i)}`, 10, y);

    y += 10; // Add spacing before the next entry
    if (y > 280) {
      // Create a new page if content overflows
      doc.addPage();
      y = 20;
    }
  });


  // Add a footer
  doc.setFontSize(10);
  doc.text("Page 1 of 1", 105, 290, { align: "center" });

  // Save the PDF
  doc.save("example.pdf");
};

export default generatePDF;
