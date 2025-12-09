"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";

import TiptapRenderer from "@/components/tiptap-renderer/client-renderer";

import PostContent from "@/components/shared/post-content";
import PostHeader from "@/components/shared/post-header";
import PostSharing from "@/components/shared/post-sharing";
import PostToc from "@/components/shared/post-toc";
import PostReadingProgress from "@/components/shared/reading-progress";

interface BlogPost {
  title: string;
  slug: string;
  keywords: string[];
  authorId: string;
  authorDetails: {
    id: string;
    name: string;
    photo: string;
    role: string;
  };
  blogPhoto: string;
  content: string;
  metadata: {
    wordCount: number;
    readingTime: number;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  console.log("Slug received in PostPage:", slug);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        const data = await response.json();
 console.log("Fetched post data:", data);
        if (data.success) {
          setPost(data.data);
        } else {
          setError(data.error || "Failed to fetch post");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("An error occurred while fetching the post");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 font-semibold text-lg">
        {error || "Post not found"}
      </div>
    );
  }

  return (
    <article className="py-10 px-1 flex flex-col items-center mt-7">

<PostReadingProgress/>
      <PostHeader
        title={post.title}
        author={post.authorDetails.name}
        authorPhoto={post.authorDetails.photo}
        createdAt={post.createdAt}
        readingTime={post.metadata.readingTime}
        cover={post.blogPhoto}
      />

      <div className="grid grid-cols-1 w-full lg:w-auto lg:grid-cols-[minmax(auto,256px)_minmax(720px,1fr)_minmax(auto,256px)] gap-6 lg:gap-8">
        <PostSharing />

        <PostContent>
          <TiptapRenderer>{post.content}</TiptapRenderer>
        </PostContent>

        <PostToc />
      </div>

      <Image
        src="/seraxmi-Dark.svg"
        width={350}
        height={350}
        alt="Development workspace"
        className="mx-auto mt-9"
      />
    </article>
  );
}
