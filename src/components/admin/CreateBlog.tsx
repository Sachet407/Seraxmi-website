'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Upload, X, Save, FileText, Clock, Tag, User, Calendar, Image as ImageIcon } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  imageUrl: string;
  tags: string[];
}

const CATEGORIES = ['Design', 'Development', 'Product', 'Case Study', 'Tutorial'];

const CreateBlogForm: React.FC = () => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    publishDate: new Date().toISOString().split('T')[0],
    readTime: '',
    category: '',
    imageUrl: '',
    tags: []
  });

  const [tagInput, setTagInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Calculate estimated read time
  const estimatedReadTime = useMemo(() => {
    const wordsPerMinute = 200;
    const text = formData.content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    return `${Math.ceil(wordCount / wordsPerMinute)} min read`;
  }, [formData.content]);

  // Update read time whenever content changes and readTime is empty
  useEffect(() => {
    if (formData.content) {
      setFormData(prev => ({ 
        ...prev, 
        readTime: prev.readTime || estimatedReadTime 
      }));
    }
  }, [formData.content, estimatedReadTime]);

  const handleInputChange = (field: keyof BlogFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });
    
      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      setFormData(prev => ({ ...prev, imageUrl: data.secure_url }));
      setPreviewImage(data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrors(prev => ({ ...prev, imageUrl: 'Failed to upload image' }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.title.length > 120) newErrors.title = 'Title cannot exceed 120 characters';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (formData.excerpt.length > 200) newErrors.excerpt = 'Excerpt cannot exceed 200 characters';
    if (!formData.content.replace(/<[^>]*>/g, '').trim()) newErrors.content = 'Content is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.imageUrl) newErrors.imageUrl = 'Image is required';
    if (formData.tags.length === 0) newErrors.tags = 'At least one tag is required';
    if (formData.readTime && !/^\d+\smin read$/.test(formData.readTime)) {
      newErrors.readTime = 'Read time format should be "X min read"';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, publishDate: new Date(formData.publishDate) }),
      });

      if (!response.ok) throw new Error('Failed to create blog post');
      const result = await response.json();
      console.log('Blog post created:', result);
      
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        publishDate: new Date().toISOString().split('T')[0],
        readTime: '',
        category: '',
        imageUrl: '',
        tags: []
      });
      setPreviewImage(null);
      alert('Blog post created successfully!');
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Failed to create blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateWordCount = () => {
    const text = formData.content.replace(/<[^>]*>/g, '');
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Blog Post</h1>
        <p className="text-gray-600">Fill in the details below to publish your blog</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your blog post title..."
              maxLength={120}
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>{errors.title && <span className="text-red-500">{errors.title}</span>}</span>
              <span>{formData.title.length}/120</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author *
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.author ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Author name"
              />
              {errors.author && <p className="mt-1 text-xs text-red-500">{errors.author}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publish Date
              </label>
              <input
                type="date"
                value={formData.publishDate}
                onChange={(e) => handleInputChange('publishDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Clock size={14} />
                Read Time
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => handleInputChange('readTime', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.readTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 5 min read"
                />
                <button
                  type="button"
                  onClick={() => handleInputChange('readTime', estimatedReadTime)}
                  className="text-xs text-blue-600 hover:text-blue-800 whitespace-nowrap"
                  title="Recalculate based on content"
                >
                  Update
                </button>
              </div>
              {errors.readTime && <p className="mt-1 text-xs text-red-500">{errors.readTime}</p>}
              {formData.content && (
                <p className="mt-1 text-xs text-gray-500">
                  Estimated: {estimatedReadTime} ({calculateWordCount()} words)
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.excerpt ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Write a brief excerpt of your blog post..."
              maxLength={200}
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>{errors.excerpt && <span className="text-red-500">{errors.excerpt}</span>}</span>
              <span>{formData.excerpt.length}/200</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Featured Image *
          </label>
          {previewImage ? (
            <div className="relative">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-48 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => {
                  setPreviewImage(null);
                  setFormData(prev => ({ ...prev, imageUrl: '' }));
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
                disabled={isUploading}
              />
              <label
                htmlFor="image-upload"
                className={`cursor-pointer ${isUploading ? 'opacity-50' : ''}`}
              >
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  {isUploading ? 'Uploading...' : 'Click to upload featured image'}
                </p>
                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
              </label>
            </div>
          )}
          {errors.imageUrl && <p className="text-xs text-red-500">{errors.imageUrl}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Tags *
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add a tag..."
            />
            <button
              type="button"
              onClick={addTag}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              Add
            </button>
          </div>
          
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
          {errors.tags && <p className="text-xs text-red-500">{errors.tags}</p>}
        </div>

        <div className="space-y-2 ">
          <label className="block text-sm font-medium text-gray-700 ">
            Content *
          </label>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={(content) => handleInputChange('content', content)}
            className="rounded-md h-96 mb-12 "
          />
          {errors.content && <p className="text-xs text-red-500">{errors.content}</p>}
        </div>

        <div className="flex justify-end gap-3 pt-4 mt-5">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm flex items-center gap-1"
          >
            {isSubmitting ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Save size={16} />
                Publish Post
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogForm;