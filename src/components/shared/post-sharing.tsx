"use client";

import React, { useEffect, useState } from "react";

import { TbBrandFacebook, TbBrandLinkedin, TbBrandX } from "react-icons/tb";

const PostSharing = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnX = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="flex justify-center lg:justify-end order-3 lg:order-1">
      <div className="sticky lg:h-[calc(100vh-120px)] top-24 flex lg:flex-col gap-4">
        <button onClick={shareOnFacebook} aria-label="Share on Facebook">
          <TbBrandFacebook
            size={40}
            className="p-2 rounded-full border border-neutral-300 dark:border-neutral-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors cursor-pointer"
          />
        </button>
        <button onClick={shareOnLinkedin} aria-label="Share on LinkedIn">
          <TbBrandLinkedin
            size={40}
            className="p-2 rounded-full border border-neutral-300 dark:border-neutral-600 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-colors cursor-pointer"
          />
        </button>
        <button onClick={shareOnX} aria-label="Share on X">
          <TbBrandX
            size={40}
            className="p-2 rounded-full border border-neutral-300 dark:border-neutral-600 hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-colors cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};

export default PostSharing;
