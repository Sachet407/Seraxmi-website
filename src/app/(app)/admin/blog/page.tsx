"use client";
import React, { useState, useEffect } from 'react';
import { Eye, Edit, Trash2, Search, Calendar, User, Clock, BookOpen } from 'lucide-react';
import { useRouter } from "next/navigation";



interface AuthorDetails {
  id: string;
  name: string;
  photo: string;
  role: string;
}

interface Metadata {
  wordCount: number;
  readingTime: number;
  createdAt: string;
}

interface Blog {
  _id: string;
  title: string;
  slug: string;
  keywords: string[];
  authorId: string;
  blogPhoto: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorDetails: AuthorDetails;
  metadata: Metadata;
  __v: number;
}

interface ApiResponse {
  success: boolean;
  data: Blog[];
}

export default function BlogManagement() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [deleteConfirm, setDeleteConfirm] = useState<Blog | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog');
      const result: ApiResponse = await response.json();
      if (result.success) {
        setBlogs(result.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (blog: Blog): void => {
    console.log('View pressed', blog);
      router.push(`/admin/blog/${blog.slug}`);

  };

  const handleEdit = (blog: Blog): void => {
    console.log('Edit pressed', blog);
    router.push(`/admin/blog/${blog.slug}/edit`);
  };

  const handleDelete = (blog: Blog): void => {
    setDeleteConfirm(blog);
  };

  const confirmDelete = (): void => {
    if (deleteConfirm) {
      console.log('Delete confirmed', deleteConfirm);
      setBlogs(blogs.filter(b => b._id !== deleteConfirm._id));
      setDeleteConfirm(null);
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.authorDetails.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Blog Management</h1>
          <p className="text-slate-600">Manage and organize your blog posts</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-slate-100"
            >
              {/* Blog Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.blogPhoto}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 flex gap-2">
                  {blog.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h2>

                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                  <img
                    src={blog.authorDetails.photo}
                    alt={blog.authorDetails.name}
                    className="w-10 h-10 rounded-full border-2 border-blue-500"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{blog.authorDetails.name}</p>
                    <p className="text-xs text-slate-500">{blog.authorDetails.role}</p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="flex items-center gap-1 text-slate-600">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-xs">{blog.metadata.wordCount} words</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">{blog.metadata.readingTime} min</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(blog)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(blog)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors font-medium text-sm"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(blog)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No blogs found</h3>
            <p className="text-slate-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">Delete Blog?</h3>
            <p className="text-slate-600 text-center mb-6">
              Are you sure you want to delete "<strong>{deleteConfirm.title}</strong>"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}