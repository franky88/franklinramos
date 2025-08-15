"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
  IconPhoneCall,
} from "@tabler/icons-react";

const ContactMe = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="h-[40rem] flex flex-col justify-center items-center px-4">
      <h2 className="mb-5 sm:mb-5 text-xl text-center sm:text-5xl dark:text-white text-white">
        Let me know how I can help you!
      </h2>
      <p className="max-w-[700px] text-center text-white text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
        Contact me through any of the platforms below, to send me a message
        directly. I look forward to hearing from you!
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <a href="mailto:ramosfp99@gmail.com">
          <ShimmerButton>
            <IconBrandGoogle className="h-5 w-5 mr-2" /> Email Me
          </ShimmerButton>
        </a>
        <a href="tel:+639302785910">
          <ShimmerButton>
            <IconPhoneCall className="h-5 w-5 mr-2" /> Call Me
          </ShimmerButton>
        </a>
      </div>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const ShimmerButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:text-white">
      {children}
    </button>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default ContactMe;
