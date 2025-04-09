"use client";

import React from "react";

function LoaderComponent({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default LoaderComponent;
