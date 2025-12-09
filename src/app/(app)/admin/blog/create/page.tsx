"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import Image from "next/image";
import TiptapEditor, { type TiptapEditorRef } from "@/components/tiptap-editor";
import { getEditorContent } from "@/components/tiptap-editor/helpers/tiptap";
import "./style.scss";

// Authors data with local images
const AUTHORS = [
  {
    id: "1",
    name: "Piyush",
    photo: "/PiyushAvatar.jpg",
    role: "Tech Writer"
  },
  {
    id: "2",
    name: "Ratan",
    photo: "/RatanAvatar.jpg",
    role: "Senior Editor"
  },
  {
    id: "3",
    name: "Sachet",
    photo: "/SachetAvatar.jpg",
    role: "Content Strategist"
  },
  {
    id: "4",
    name: "Sujan",
    photo: "/SujanAvatar.jpg",
    role: "Lead Writer"
  }
];

export default function EditForm() {
  const editorRef = useRef<TiptapEditorRef>(null);

  // Form state
  const [blogTitle, setBlogTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [blogPhoto, setBlogPhoto] = useState("");
  const [slug, setSlug] = useState("");
  const [isAuthorDropdownOpen, setIsAuthorDropdownOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Auto-generate slug from title
  useEffect(() => {
    if (blogTitle) {
      const generatedSlug = blogTitle
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setSlug(generatedSlug);
      console.log("🔗 Generated Slug:", generatedSlug);
    }
  }, [blogTitle]);

  const calculateReadingTime = useCallback(() => {
    const editor = editorRef.current;
    const wordCount = editor?.storage.characterCount.words() ?? 0;
    return Math.max(1, Math.ceil(wordCount / 150));
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'blog_uploads');
    formData.append('cloud_name', 'dcen6fcde');

    try {
      console.log("📤 Uploading image to Cloudinary...");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dcen6fcde/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setBlogPhoto(data.secure_url);
        console.log("✅ Image uploaded successfully:", data.secure_url);
        console.log("📊 Upload details:", {
          url: data.secure_url,
          publicId: data.public_id,
          format: data.format,
          width: data.width,
          height: data.height,
          size: data.bytes
        });
      }
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadProgress(100);
    }
  };

  const resetForm = () => {
    setBlogTitle("");
    setKeywords("");
    setSelectedAuthor("");
    setBlogPhoto("");
    setSlug("");
    // Clear the editor content
    if (editorRef.current) {
      editorRef.current.commands.clearContent();
    }
  };

  const handleSave = async () => {
    if (!blogTitle || !selectedAuthor) {
      alert("Please fill in the title and select an author.");
      return;
    }

    setIsUploading(true); // Reuse uploading state for saving

    const html = getEditorContent(editorRef.current, "html");
    const wordCount = editorRef.current?.storage.characterCount.words() ?? 0;
    const readingTime = calculateReadingTime();

    const blogData = {
      title: blogTitle,
      slug: slug,
      keywords: keywords.split(',').map(k => k.trim()).filter(k => k),
      authorId: selectedAuthor,
      authorDetails: AUTHORS.find(a => a.id === selectedAuthor),
      blogPhoto: blogPhoto,
      content: html,
      metadata: {
        wordCount: wordCount,
        readingTime: readingTime,
        createdAt: new Date().toISOString()
      }
    };

    try {
      console.log("📤 Saving blog post...", blogData);

      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save blog post');
      }

      console.log("✅ Blog post saved successfully:", result);

      // Show success popup with options
      const userChoice = window.confirm(
        `🎉 Blog post published successfully!\n\n` +
        `Title: "${blogData.title}"\n` +
        `Slug: ${blogData.slug}\n\n` +
        `Click OK to view the post, or Cancel to create another post.`
      );

      if (userChoice) {
        // Redirect to the new post
        window.location.href = `/admin/blog/${result.data.slug}`;
      } else {
        // Reset form for a fresh start
        resetForm();
      }

    } catch (error) {
      console.error("❌ Error saving blog post:", error);
      alert(`Failed to save: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const selectedAuthorData = AUTHORS.find(a => a.id === selectedAuthor);

  return (
    <div className="w-full">
      <main className="w-full px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Sidebar - Metadata */}
          <div className="xl:col-span-2 space-y-6">

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-300">
              <label htmlFor="blog-title" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <span className="text-xl">📝</span>
                Blog Title
                <span className="text-[#188f8b]">*</span>
              </label>
              <input
                id="blog-title"
                type="text"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                placeholder="Enter an engaging title..."
                className="w-full px-4 py-3 text-base border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-[#188f8b]/30 focus:border-[#188f8b] dark:bg-gray-700 dark:text-white transition-all duration-300 outline-none"
              />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-300">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <span className="text-xl">📄</span>
                Blog Content
                <span className="text-[#188f8b]">*</span>
              </label>
              <div className="border-2 border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden focus-within:ring-4 focus-within:ring-[#188f8b]/30 focus-within:border-[#188f8b] transition-all duration-300">
                <TiptapEditor
                  ref={editorRef}
                  output="html"
                  minHeight={500}
                  maxHeight={800}
                  placeholder={{
                    paragraph: "Start writing your amazing blog post here...",
                    imageCaption: "Type caption for image (optional)",
                  }}
                />
              </div>
            </div>


          </div>

          {/* Right Content Area - Editor */}
          <div className="xl:col-span-1 space-y-6">

            {/* Auto-generated Slug */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-300">
              <label htmlFor="blog-slug" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <span className="text-xl">🔗</span>
                URL Slug
                <span className="text-xs font-normal text-gray-500 ml-auto">(Auto-generated)</span>
              </label>
              <div className="relative">
                <input
                  id="blog-slug"
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="auto-generated-from-title"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-[#188f8b]/30 focus:border-[#188f8b] dark:bg-gray-700 dark:text-white transition-all duration-300 outline-none font-mono text-sm"
                />
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg font-mono">
                /blog/{slug || "..."}
              </div>
            </div>

            {/* Keywords */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-300">
              <label htmlFor="keywords" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <span className="text-xl">🏷️</span>
                Keywords
              </label>
              <input
                id="keywords"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="react, nextjs, typescript..."
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-[#188f8b]/30 focus:border-[#188f8b] dark:bg-gray-700 dark:text-white transition-all duration-300 outline-none"
              />
              {keywords && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {keywords.split(',').map((keyword, idx) => {
                    const trimmed = keyword.trim();
                    return trimmed ? (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-[#188f8b] to-[#20b5b0] text-white rounded-full text-xs font-semibold shadow-md"
                      >
                        {trimmed}
                      </span>
                    ) : null;
                  })}
                </div>
              )}
            </div>

            {/* Author Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-300">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <span className="text-xl">👤</span>
                Author
                <span className="text-[#188f8b]">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsAuthorDropdownOpen(!isAuthorDropdownOpen)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-[#188f8b]/30 focus:border-[#188f8b] dark:bg-gray-700 dark:text-white transition-all duration-300 outline-none text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-750"
                >
                  {selectedAuthorData ? (
                    <div className="flex items-center gap-3">
                      <Image
                        src={selectedAuthorData.photo}
                        alt={selectedAuthorData.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover ring-2 ring-[#188f8b]"
                      />
                      <div>
                        <div className="font-semibold">{selectedAuthorData.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{selectedAuthorData.role}</div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-500">Select an author...</span>
                  )}
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${isAuthorDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isAuthorDropdownOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-2xl overflow-hidden">
                    {AUTHORS.map((author) => (
                      <button
                        key={author.id}
                        type="button"
                        onClick={() => {
                          setSelectedAuthor(author.id);
                          setIsAuthorDropdownOpen(false);
                          console.log("👤 Selected Author:", author);
                        }}
                        className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#188f8b]/10 transition-colors duration-200 ${selectedAuthor === author.id ? 'bg-[#188f8b]/20' : ''
                          }`}
                      >
                        <Image
                          src={author.photo}
                          alt={author.name}
                          width={48}
                          height={48}
                          className="rounded-full object-cover ring-2 ring-[#188f8b]"
                        />
                        <div className="text-left flex-1">
                          <div className="font-semibold text-gray-900 dark:text-white">{author.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{author.role}</div>
                        </div>
                        {selectedAuthor === author.id && (
                          <svg className="w-6 h-6 text-[#188f8b]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Blog Photo Upload */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-300">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <span className="text-xl">🖼️</span>
                Featured Image
              </label>

              <div className="space-y-3">
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <div className="cursor-pointer px-4 py-3 border-2 border-dashed border-[#188f8b] rounded-xl hover:bg-[#188f8b]/5 transition-all duration-300 text-center">
                    <svg className="w-8 h-8 mx-auto mb-2 text-[#188f8b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm font-semibold text-[#188f8b]">
                      {isUploading ? "Uploading..." : "Click to upload"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </label>

                {isUploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#188f8b] h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                )}

                {blogPhoto && (
                  <div className="relative rounded-xl overflow-hidden border-2 border-[#188f8b]/30 group">
                    <Image
                      width={400}
                      height={200}
                      src={blogPhoto}
                      alt="Blog preview"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => setBlogPhoto("")}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}

            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 group relative px-8 py-5 bg-gradient-to-br from-[#188f8b] to-[#20b5b0] text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-[#188f8b]/30 hover:shadow-2xl hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#188f8b]/30 transition-all duration-300 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.15),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <span className="relative flex items-center justify-center gap-3">
                  <svg
                    className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Publish Blog Post
                </span>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
              </button>
              <button
                type="button"
                onClick={() => {
                  console.log("📋 Draft saved");
                  handleSave();
                }}
                className="px-8 py-5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save Draft
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
