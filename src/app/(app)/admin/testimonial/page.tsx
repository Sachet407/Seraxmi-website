"use client"

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Star, Trash2, Loader2, RefreshCw, AlertTriangle, X } from 'lucide-react';

// --- Testimonial Data Model (Re-defining here for a single-file solution) ---
interface Testimonial {
    _id: string;
    profileImage: string;
    position: string;
    fullName: string;
    companyName: string;
    review: string;
    stars: number;
    createdAt: string;
}

// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
};

// --- Main Component ---

const TestimonialTable: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState(false);

  // --- Data Fetching ---

  const fetchTestimonials = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/testimonial');
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const result = await response.json();
      if (result.success) {
        setTestimonials(result.data);
      } else {
        throw new Error(result.error || 'API fetch failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load testimonials. Check API status.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  // --- Deletion Handlers ---

  const handleDeleteClick = (testimonial: Testimonial) => {
    setDeleteId(testimonial._id);
    setDeleteName(testimonial.fullName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDeleteId(null);
    setDeleteName('');
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/testimonial/${deleteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to delete testimonial (Status: ${response.status})`);
      }
      
      // Update the local state to remove the deleted item
      setTestimonials(prev => prev.filter(t => t._id !== deleteId));
      
      // Close modal and reset state
      handleCloseModal();

    } catch (err) {
      console.error(err);
      setError(`Deletion failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  // --- Inline Modal Component ---
  const DeleteConfirmationModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-6 transform transition-all scale-100 opacity-100">
          
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h3 className="text-xl font-bold text-red-600 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2" /> Confirm Deletion
            </h3>
            <button onClick={handleCloseModal} disabled={isDeleting} className="text-gray-400 hover:text-gray-600 transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-4">
            <p className="text-gray-700">
              Are you sure you want to delete the testimonial by **{deleteName}**? 
              This action cannot be undone.
            </p>
            <p className="text-sm text-red-500 font-medium">
              Deleting this testimonial will permanently remove it from the database.
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={handleCloseModal}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            >
              {isDeleting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Deleting...
                </>
              ) : (
                'Delete Permanently'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // --- Render Status and UI ---

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        <Loader2 className="w-8 h-8 mr-2 animate-spin" />
        <p className="text-lg">Loading testimonials...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
        <button onClick={fetchTestimonials} className="mt-2 text-sm flex items-center text-red-600 hover:text-red-800">
            <RefreshCw className="w-4 h-4 mr-1" /> Retry
        </button>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <AlertTriangle className="w-10 h-10 mx-auto text-yellow-500 mb-3" />
        <p className="text-xl font-medium">No Testimonials Found</p>
        <p className="text-sm">Add a testimonial to view it here.</p>
        <button onClick={fetchTestimonials} className="mt-4 text-sm flex items-center mx-auto text-[#1a837f] hover:text-[#156e6b]">
            <RefreshCw className="w-4 h-4 mr-1" /> Check Again
        </button>
      </div>
    );
  }

  // --- Render Table ---

  return (
    <div className="p-4 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-b-gray-400 pb-2">
        Testimonial Management ({testimonials.length})
      </h2>
      
      <div className="overflow-x-auto">
        {/* Adjusted column widths for full content visibility */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* Widths adjusted: Avatar (8%), Reviewer (15%), Review & Company (55%), Rating (7%), Date (10%), Action (5%) */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[8%]">Avatar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]">Reviewer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[55%]">Review & Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[7%]">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]">Date Added</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-[5%]">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testimonials.map((t) => (
              <tr key={t._id} className="hover:bg-gray-50 transition duration-150">
                
                {/* Avatar */}
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image 
                            src={t.profileImage} 
                            alt={`${t.fullName} Avatar`} 
                            fill 
                            className="object-cover" 
                            sizes="40px"
                        />
                    </div>
                </td>

                {/* Reviewer Details (Full Name and Position) */}
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 break-words">{t.fullName}</div>
                  <div className="text-xs text-gray-500 mt-1 break-words">{t.position}</div>
                </td>
                
                {/* Review & Company (Full content, wraps automatically) */}
                <td className="px-6 py-4">
                  {/* REVIEW: Removed truncate. Text will wrap. */}
                  <p className="text-base text-gray-700 whitespace-normal">{t.review}</p>
                  {/* COMPANY NAME: Removed truncate. */}
                  <p className=" font-medium mt-1 whitespace-normal">@ {t.companyName}</p>
                </td>

                {/* Rating */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex items-center">
                        {Array(5).fill(0).map((_, i) => (
                            <Star 
                                key={i}
                                className={`w-4 h-4 mr-0.5 ${i < t.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                </td>

                {/* Date Added */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(t.createdAt)}
                </td>

                {/* Action */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDeleteClick(t)}
                    className="text-red-600 hover:text-red-900 transition duration-150 p-2 rounded-full hover:bg-red-50"
                    title="Delete Testimonial"
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render the inline Modal */}
      <DeleteConfirmationModal />
    </div>
  );
};

export default TestimonialTable;