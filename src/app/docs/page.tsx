"use client";

import { RedocStandalone } from "redoc";

export default function DocsPage() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <RedocStandalone
        specUrl="/api/docs" // this should return your OpenAPI JSON
        options={{
          theme: { colors: { primary: { main: "#0070f3" } } },
          hideDownloadButton: false,
          nativeScrollbars: true,
        }}
      />
    </div>
  );
}
