import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const s3 = new S3Client({
  region: "ap-southeast-2", // Replace with your region
  endpoint: "https://mos.ap-southeast-2.sufybkt.com", // Replace with your endpoint
  credentials: {
    accessKeyId: process.env.SUFY_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SUFY_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  try {
    const bucketName = "portfoliofiles"; // Replace with your bucket name

    const command = new ListObjectsV2Command({
      Bucket: bucketName,
    });

    const { Contents } = await s3.send(command);

    if (!Contents) {
      return NextResponse.json({ files: [] }, { status: 200 });
    }

    // Map object keys to file URLs
    const files = Contents.map((file) => ({
      key: file.Key,
      url: `https://${bucketName}.mos.ap-southeast-2.sufybkt.com/${file.Key}`,
      size: file.Size,
      lastModified: file.LastModified,
    }));

    return NextResponse.json({ files }, { status: 200 });
  } catch (error: any) {
    console.error("Error listing files:", error);
    return NextResponse.json({ error: error.message || "Failed to list files" }, { status: 500 });
  }
}
