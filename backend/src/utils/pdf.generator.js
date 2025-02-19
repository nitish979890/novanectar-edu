import PDFDocument from "pdfkit";
import fetch from "node-fetch"; // Make sure to import fetch

// Helper function to fetch image and convert to buffer
async function getImageBuffer(url) {
  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
}

async function generateEnrollmentPDF(orderData, userData) {
  return new Promise(async (resolve, reject) => {
    try {
      // Fetch images first
      const logoBuffer = await getImageBuffer(
        "https://novanectar.co.in/logo.png"
      );

      // Create PDF document
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
      });

      // Collect PDF chunks
      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));

      // Error handling
      doc.on("error", (error) => {
        console.error("PDF generation error:", error);
        reject(error);
      });

      try {
        // Add company logo using buffer
        doc.image(logoBuffer, 50, 45, {
          width: 150,
          // Add fallback in case image fails
          fallback: () => {
            doc.fontSize(12).text("Novanectar", 50, 45);
          },
        });

        // Add geometric pattern background
        doc
          .save()
          .fillColor("#f0f6ff")
          .opacity(0.1)
          .translate(0, 0)
          .scale(1)
          .restore();

        // Header
        doc
          .moveDown(4)
          .font("Helvetica-Bold")
          .fontSize(16)
          .fillColor("#000")
          .text("ENROLLMENT CONFIRMATION", { align: "center" });

        // ID and Date
        doc
          .moveDown()
          .fontSize(12)
          .text(`ID - ${orderData?.courseId}`, { align: "left" })
          .text(`Date: ${new Date().toLocaleDateString()}`, { align: "left" });

        // Main content
        doc
          .moveDown()
          .fontSize(12)
          .text(`Dear ${userData?.firstName || "sir"},`, { align: "left" })
          .moveDown()
          .text(
            `Congratulations! We are pleased to offer you online ${
              orderData?.orderType
            }, for the role of ${
              orderData.courseName
            }. The date of commencement of your internship is ${new Date().toLocaleDateString()}`,
            { align: "left" }
          )
          // .text(`Duration: 3 months`, { align: 'left' })
          .moveDown()
          .text(
            `
As an enrolle, you will get the opportunity to gain valuable and hands-on experience. Please note that as a temporary employee, you will not be eligible for the benefits that our regular employees receive. We expect you to comply with our company policies and practices including those related to code of conduct, safety and confidentiality`,
            { align: "left" }
          )
          .moveDown()
          .text(
            `As we welcome you onboard, we assure you that your internship with Novanectar Services Private Limited will be rewarding and fruitful. Wishing you all the very best.
`,
            {
              align: "left",
              width: 500,
            }
          );
        // Footer
        doc
          .moveDown(2)
          .text("Regards,", { align: "left" })
          .moveDown()
          .text("Shivam Rai,", { align: "left" })
          .text("CEO", { align: "left" });

        // Add company seal/logo at the bottom using same buffer
        doc.image(logoBuffer, 450, doc.y - 50, {
          width: 80,
          fallback: () => {
            doc.fontSize(10).text("Company Seal", 450, doc.y - 50);
          },
        });

        // End the document
        doc.end();
      } catch (error) {
        // Handle any errors during PDF generation
        console.error("Error generating PDF content:", error);
        doc.end(); // Make sure to end the document even if there's an error
        reject(error);
      }
    } catch (error) {
      // Handle any errors during initial setup
      console.error("Error in PDF generation setup:", error);
      reject(error);
    }
  });
}

export { generateEnrollmentPDF };
