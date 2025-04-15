"use client";
import React from "react";

export default function PageHeader(props: {
  heading: String;
  subheading?: string;
}) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
        {props.heading}
      </h1>
      <h3 className="scroll-m-20 text-lg text-muted-foreground tracking-tight lg:text-xl">{props.subheading}</h3>
    </div>
  );
}
