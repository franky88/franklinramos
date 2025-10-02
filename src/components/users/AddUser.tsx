"use client";

import api from "@/lib/axios";
import { User } from "@prisma/client";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateUser = async () => {
    if (!email || !name) {
      return toast.info("Email and name are required!");
    }

    try {
      setLoading(true);
      const response = await api.post<User>("/users", { name, email });
      console.log("response", response);
      setName("");
      setEmail("");
      toast.success("User create successfully!");

      router.refresh();
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{ marginBottom: "1rem" }}
      className="flex items-center gap-2 px-6"
    >
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="rounded-full"
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="rounded-full"
      />
      <Button
        onClick={handleCreateUser}
        disabled={loading}
        className="rounded-full"
      >
        {loading ? "Adding..." : "Add User"}
      </Button>
    </div>
  );
};

export default AddUser;
