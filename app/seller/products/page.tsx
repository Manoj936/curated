"use client";
import PageHeader from "@/app/components/chunks/PageHeader";
import React from "react";

function page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 max-w-7xl mx-auto px-4">
      <PageHeader heading="Products" subheading="Manage your products lisitng" />
    </div>
  );
}

export default page;
