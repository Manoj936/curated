'use client'
import React from "react";

export default function PageHeader(props: { heading: String }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {props.heading}
    </h1>
  );
}
