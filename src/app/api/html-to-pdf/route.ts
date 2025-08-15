// app/api/html-to-pdf/route.ts (for App Router)
// OR pages/api/html-to-pdf.ts (for Pages Router)

import chromium from "@sparticuz/chromium";
import puppeteer, { Browser } from "puppeteer-core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RequestBody = {
  html?: string;
  url?: string;
  pdfOptions?: {
    format?: 'A4' | 'A3' | 'A2' | 'A1' | 'A0' | 'Legal' | 'Letter' | 'Tabloid';
    width?: string;
    height?: string;
    margin?: {
      top?: string;
      right?: string;
      bottom?: string;
      left?: string;
    };
    printBackground?: boolean;
    landscape?: boolean;
    preferCSSPageSize?: boolean;
    displayHeaderFooter?: boolean;
    headerTemplate?: string;
    footerTemplate?: string;
    scale?: number;
  };
  filename?: string;
  waitOptions?: {
    waitUntil?: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';
    timeout?: number;
  };
};

export async function POST(req: Request) {
  let browser: Browser | null = null;
  
  try {
    // Parse and validate request body
    let body: RequestBody;
    try {
      body = await req.json();
    } catch (error) {
      console.error("JSON parsing error:", error);
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );
    }

    const { html, url, pdfOptions, filename, waitOptions } = body;

    // Validate input
    if (!html && !url) {
      return new Response(
        JSON.stringify({ 
          error: "Either 'html' or 'url' must be provided",
          example: {
            html: "<h1>Hello World</h1>",
            // or
            url: "https://example.com"
          }
        }),
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );
    }

    if (html && url) {
      return new Response(
        JSON.stringify({ 
          error: "Provide either 'html' OR 'url', not both" 
        }),
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );
    }

    // URL validation
    if (url) {
      try {
        new URL(url);
      } catch {
        return new Response(
          JSON.stringify({ error: "Invalid URL format" }),
          { 
            status: 400, 
            headers: { 
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            } 
          }
        );
      }
    }

    console.log("Starting PDF generation...");

    // Get Chromium executable path
    const executablePath = await chromium.executablePath();
    console.log("Chromium executable path:", executablePath);

    // Launch browser
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: {
        width: 1280,
        height: 720,
        deviceScaleFactor: 1,
      },
      executablePath,
      headless: true,
    });

    console.log("Browser launched successfully");

    let page;
    try {
      page = await browser.newPage();
      console.log("New page created");

      // Set longer timeout for complex pages
      page.setDefaultTimeout(30000);
      page.setDefaultNavigationTimeout(30000);

      // Load content
      if (url) {
        console.log("Loading URL:", url);
        await page.goto(url, { 
          waitUntil: waitOptions?.waitUntil || "networkidle0",
          timeout: waitOptions?.timeout || 30000
        });
      } else if (html) {
        console.log("Setting HTML content");
        await page.setContent(html, { 
          waitUntil: waitOptions?.waitUntil || "networkidle0",
          timeout: waitOptions?.timeout || 30000
        });
      }

      // Wait a bit more for any dynamic content
      await page.evaluate(() => {
        return new Promise(resolve => setTimeout(resolve, 1000));
      });

      console.log("Generating PDF...");

      // Generate PDF with merged options
      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { 
          top: "16mm", 
          right: "16mm", 
          bottom: "16mm", 
          left: "16mm" 
        },
        preferCSSPageSize: false,
        displayHeaderFooter: false,
        ...pdfOptions, // User options override defaults
      });

      console.log("PDF generated successfully, size:", pdf.length);

      // Return PDF response
      const responseFilename = filename || "document.pdf";
      
      return new Response(pdf as BodyInit, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${responseFilename}"`,
          "Content-Length": pdf.length.toString(),
          "Cache-Control": "no-store, no-cache, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });

    } catch (pageError) {
      console.error("Page operation failed:", pageError);
      return new Response(
        JSON.stringify({ 
          error: "Failed to process page",
          details: pageError instanceof Error ? pageError.message : "Unknown error"
        }),
        { 
          status: 500, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );
    } finally {
      if (page) {
        await page.close();
      }
    }

  } catch (browserError) {
    console.error("Browser operation failed:", browserError);
    return new Response(
      JSON.stringify({ 
        error: "Failed to initialize browser",
        details: browserError instanceof Error ? browserError.message : "Unknown error"
      }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        } 
      }
    );
  } finally {
    // This will run even if browser launch fails
    try {
      if (browser) {
        await browser.close();
        console.log("Browser closed successfully");
      }
    } catch (closeError) {
      console.error("Failed to close browser:", closeError);
    }
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}