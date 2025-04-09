"use client";

import React from "react";
import { AppName } from "./libs/constant";

function Page() {
  return (
    <div 
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, #261919, #351d23, #422234, #492949, #473462, #3b3c6d, #294576, #004d7d, #004f73, #004f65, #004e56, #0b4c48)",
          letterSpacing: "1rem"
      }}
      className="flex justify-center items-baseline items-center w-full md:w-full  p-0 m-0 absolute h-[480px] md:h-[600px]"
    >
      <div className="text-5xl md:text-9xl  font-[100%] relative md:top-2.5  text-white">
        {AppName}
      </div>
    </div>
  );
}

export default Page;