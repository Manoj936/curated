"use client";

import React from "react";
import { AppName } from "./libs/constant";

function Page() {
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, #261919, #351d23, #422234, #492949, #473462, #3b3c6d, #294576, #004d7d, #004f73, #004f65, #004e56, #0b4c48)",
      }}
      className="flex justify-center items-center w-full h-svh p-0 m-0 absolute"
    >
      <div className="text-9xl font-[50%] relative top-2.5 text-white">
        {AppName}
      </div>
    </div>
  );
}

export default Page;