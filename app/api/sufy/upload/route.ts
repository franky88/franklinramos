import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: "ap-southeast-2",
  endpoint: "https://mos.ap-southeast-2.sufybkt.com",
  credentials: {
    accessKeyId: process.env.SUFY_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SUFY_SECRET_ACCESS_KEY!,
  },
});

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get("fileName");

    if (!fileName) {
      console.error("Invalid fileName parameter");
      return NextResponse.json({ error: "Invalid fileName parameter" }, { status: 400 });
    }

    const bucketName = "portfoliofiles";

    console.log(`Generating signed URL for file: ${fileName} in bucket: ${bucketName}`);

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      ContentType: "application/octet-stream",
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    console.log("Generated Signed URL:", signedUrl);
    return NextResponse.json({ url: signedUrl }, { status: 200 });
  } catch (error: any) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
