"use client"

import React, { useState, useRef } from 'react';
import { Star, UploadCloud, XCircle } from 'lucide-react';
import Image from 'next/image';
// --- Type Definitions and Reusable Input Component ---

interface FormState {
  profileImage: string | null;
  position: string;
  fullName: string;
  companyName: string;
  review: string;
  stars: number;
}

interface InputGroupProps {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, name, value, onChange, error, type = 'text' }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all`}
      required
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

// --- Main Component ---

export default function TestimonialForm() {
  // Use the confirmed Cloud Name and the preset via public env variable
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const [form, setForm] = useState<FormState>({
    profileImage: null,
    position: '',
    fullName: '',
    companyName: '',
    review: '',
    stars: 5,
  });
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | null; text: string | null }>({ type: null, text: null });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers ---

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleRatingChange = (newRating: number) => {
    setForm(prev => ({ ...prev, stars: newRating }));
  };

  const handleImageRemove = () => {
    setForm(prev => ({ ...prev, profileImage: null }));
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
    }
  };
  
  // --- CORE: Direct Unsigned Upload Logic ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !UPLOAD_PRESET) return;

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setErrors(prev => ({ ...prev, profileImage: 'Image file size must be less than 2MB.' }));
        return;
    }
    setErrors(prev => ({ ...prev, profileImage: undefined }));
    setImageUploading(true);
    setMessage({ type: null, text: null });

    try {
      // 1. Prepare Form Data for Direct Cloudinary Upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET); // Using the confirmed 'blog_uploads' preset
      formData.append('folder', 'testimonial-avatars'); 

      // 2. Upload to Cloudinary URL
      console.log("📤 Uploading image to Cloudinary...");
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      
      const uploadResponse = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData,
      });

      const uploadResult = await uploadResponse.json();

      if (uploadResult.secure_url) {
        setForm(prev => ({ ...prev, profileImage: uploadResult.secure_url }));
        setMessage({ type: 'success', text: 'Profile image uploaded successfully!' });
      } else {
        throw new Error(uploadResult.error?.message || 'Cloudinary upload failed.');
      }

    } catch (err) {
      console.error('Upload error:', err);
      setMessage({ type: 'error', text: `Image Upload Failed: ${err instanceof Error ? err.message : 'Unknown error.'}` });
      handleImageRemove(); 
    } finally {
      setImageUploading(false);
    }
  };
  // --- END OF CORE LOGIC ---

  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.profileImage) newErrors.profileImage = "Profile image is required.";
    if (!form.fullName) newErrors.fullName = "Full Name is required.";
    if (!form.position) newErrors.position = "Position is required.";
    if (!form.companyName) newErrors.companyName = "Company Name is required.";
    if (!form.review || form.review.length < 10) newErrors.review = "Review must be at least 10 characters.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage({ type: 'error', text: 'Please fill out all required fields correctly.' });
      return;
    }

    setLoading(true);
    setMessage({ type: null, text: null });

    try {
      const response = await fetch('/api/testimonial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage({ type: 'success', text: 'Testimonial submitted successfully! Thank you!' });
        // Reset form
        setForm({
          profileImage: null,
          position: '',
          fullName: '',
          companyName: '',
          review: '',
          stars: 5,
        });
        handleImageRemove();
      } else {
        const errorDetail = result.error || 'Unknown error occurred.';
        setMessage({ type: 'error', text: `Submission Failed: ${errorDetail}` });
      }
    } catch (err) {
      console.error('Network Error:', err);
      setMessage({ type: 'error', text: 'A network error occurred. Please check your connection.' });
    } finally {
      setLoading(false);
    }
  };

  // --- Render ---

  if (!UPLOAD_PRESET) {
      return (
        <div className="max-w-3xl mx-auto my-12 p-8 bg-white shadow-2xl rounded-2xl border border-red-200 text-red-700">
            <h2 className="text-xl font-bold">Configuration Error</h2>
            <p>The Cloudinary Upload Preset is missing. Please ensure <code>NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET</code> is set in your environment file and the server is restarted.</p>
        </div>
      );
  }

  const isFormDisabled = loading || imageUploading;

  return (
    <div className="max-w-3xl mx-auto my-4 p-8 bg-white shadow-2xl rounded-2xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
        Share Your Experience ✨
      </h2>
      <p className="text-gray-600 mb-8">
        Your feedback helps us grow! Please take a moment to write a testimonial.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* --- Profile Image Upload --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Image (Required, Max 2MB)
          </label>

          {form.profileImage ? (
            <div className="flex items-center space-x-4 p-4 border border-green-400 bg-green-50 rounded-lg">
                <Image
                width={64}
                height={64}
                    src={form.profileImage} 
                    alt="Profile Preview" 
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-green-600" 
                />
                <div className='flex-grow'>
                    <p className="font-medium text-green-700">Image Uploaded Successfully!</p>
                    <p className='text-sm text-gray-500 truncate'>{form.profileImage.substring(0, 50)}...</p>
                </div>
                <button 
                    type="button" 
                    onClick={handleImageRemove}
                    className='text-red-500 hover:text-red-700 transition-colors'
                    aria-label='Remove uploaded image'
                >
                    <XCircle size={24} />
                </button>
            </div>
          ) : (
            <label className={`block cursor-pointer ${isFormDisabled ? 'opacity-70 pointer-events-none' : ''}`}>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="sr-only"
                    accept="image/*"
                    disabled={isFormDisabled}
                />
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors text-gray-700">
                    {imageUploading ? (
                        <>
                            <svg className="animate-spin w-8 h-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            <p className="text-sm font-medium mt-2">Uploading image...</p>
                        </>
                    ) : (
                        <>
                            <UploadCloud className="w-8 h-8 text-blue-500" />
                            <p className="text-sm font-medium mt-2">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500">PNG, JPG, up to 2MB</p>
                        </>
                    )}
                </div>
            </label>
          )}

          {errors.profileImage && <p className="mt-1 text-sm text-red-600">{errors.profileImage}</p>}
        </div>

        {/* --- Form Fields --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="Full Name" name="fullName" value={form.fullName} onChange={handleInputChange} error={errors.fullName} />
          <InputGroup label="Your Position" name="position" value={form.position} onChange={handleInputChange} error={errors.position} />
        </div>

        <InputGroup label="Company Name" name="companyName" value={form.companyName} onChange={handleInputChange} error={errors.companyName} />
        
        {/* --- Star Rating --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5 Stars)</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <Star
                key={starValue}
                size={28}
                onClick={() => handleRatingChange(starValue)}
                className={`cursor-pointer transition-colors duration-200 ${
                  starValue <= form.stars 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-300 hover:text-yellow-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* --- Review Textarea --- */}
        <div>
          <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">Your Review (min 10 characters)</label>
          <textarea
            id="review"
            name="review"
            rows={4}
            value={form.review}
            onChange={handleInputChange}
            className={`w-full p-3 border ${errors.review ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all`}
            placeholder="Write your honest feedback here..."
          />
          {errors.review && <p className="mt-1 text-sm text-red-600">{errors.review}</p>}
        </div>

        {/* --- Status Message --- */}
        {message.text && (
          <div className={`p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
            {message.text}
          </div>
        )}

        {/* --- Submit Button --- */}
        <button
          type="submit"
          disabled={isFormDisabled || !form.profileImage} 
          className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-[#1a837f] hover:bg-[#156e6b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a837f] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
            'Submit Testimonial'
          )}
        </button>
      </form>
    </div>
  );
}