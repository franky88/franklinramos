"use client";

import React from "react";
import { IconBrandGoogle, IconPhoneCall } from "@tabler/icons-react";

const ContactMe = () => {
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

const ShimmerButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:text-white">
      {children}
    </button>
  );
};

export default ContactMe;
