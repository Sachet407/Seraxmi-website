"use client";

import React from "react";

import useProgress from "@/hooks/use-progress";

const PostReadingProgress = () => {
  const { progress, enable } = useProgress(".article-content");

  return enable ? (
    <>
      <div
        className={`fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-[#0f1117]/80 backdrop-blur-md z-40 pointer-events-none transition-opacity duration-300 ${progress > 0 ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className="fixed inset-x-0 h-1 top-19 bg-blue-600 dark:bg-blue-500 z-50"
        style={{ width: `${progress}%` }}
      />
    </>
  ) : null;
};

export default PostReadingProgress;
