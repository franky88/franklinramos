import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMyToaster } from "@/utils/mytoast";

const UploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const showToast = useMyToaster();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("No file selected");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/sufy/upload?fileName=${encodeURIComponent(file.name)}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error(
          `API Error: ${response.status} - ${response.statusText}`
        );
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid JSON response from server");
      }

      const data = await response.json();

      console.log("Parsed API Response:", data);
      const url = data.url.split("?")[0];

      console.log(url);

      if (!data.url) {
        throw new Error("No upload URL received");
      }

      // Upload the file to Sufy using the pre-signed URL
      const uploadResponse = await fetch(data.url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type || "application/octet-stream",
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.statusText}`);
      }
      showToast("Successfully uploaded!", "FIle uploaded to the server", false);
      setFile(null);
    } catch (err: any) {
      console.error("Error uploading file:", err);
      setError(err.message || "Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex">
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UploadFile;
