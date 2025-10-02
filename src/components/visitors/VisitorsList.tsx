"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Visitor } from "@prisma/client";

const VisitorsList = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  async function loadVisitors() {
    try {
      const res = await api.get("/visitors", {
        headers: { "Cache-Control": "no-store" },
      });
      setVisitors(res.data.visitors || []);
    } catch (error) {
      console.error("Failed to load visitors:", error);
    }
  }

  useEffect(() => {
    loadVisitors();
    const id = setInterval(loadVisitors, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Visitor Monitor</h1>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Time</th>
            <th className="p-2 text-left">URL</th>
            <th className="p-2 text-left">Referrer</th>
            <th className="p-2 text-left">UA</th>
            <th className="p-2 text-left">Viewport</th>
            <th className="p-2 text-left">IP</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((v) => (
            <tr key={v.id} className="border-t">
              <td className="p-2">{new Date(v.createdAt).toLocaleString()}</td>
              <td className="p-2 break-all">{v.url}</td>
              <td className="p-2 break-all">{v.referrer || "—"}</td>
              <td className="p-2">{v.ua?.slice(0, 40)}...</td>
              <td className="p-2">{v.viewport}</td>
              <td className="p-2">{v.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorsList;
