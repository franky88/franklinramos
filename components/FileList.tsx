"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import UploadFile from "./project/UploadFile";

type FileItem = {
  key: string;
  url: string;
  size: number;
  lastModified: string;
};

const FileList = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("/api/sufy");
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        setFiles(data.files);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading)
    return (
      <div>
        <Skeleton className="w-24"></Skeleton>
      </div>
    );
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2>Uploaded Files</h2>
        <div>
          <UploadFile />
        </div>
      </div>

      {files.length === 0 ? (
        <p>No files found</p>
      ) : (
        <div className="flex flex-col items-start gap-2">
          {files.map((file) => (
            <div key={file.key} className="flex flex-col">
              <Link
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {file.key} ({(file.size / 1024).toFixed(2)} KB)
              </Link>
              <small>
                Last Modified: {new Date(file.lastModified).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList;
