"use client"; // Needed in Next.js App Router (if using components in `app/`)

import FileList from "@/components/FileList";

interface SufyDataResponse {
  data: any;
  error?: string;
}

const page = () => {
  return (
    <div>
      <strong>Files</strong>
      <FileList />
    </div>
  );
};

export default page;
