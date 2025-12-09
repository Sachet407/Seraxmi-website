'use client';

import { useState, useEffect } from 'react';
import { Mail, Building2, DollarSign, Calendar, FileText, Loader2, AlertCircle } from 'lucide-react';

interface Enquiry {
  _id: string;
  fullname: string;
  companyName: string;
  projectBudget: string;
  email: string;
  projectDescription: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: Enquiry[];
}

export default function EnquiryList() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/enquiry');

      if (!response.ok) {
        throw new Error('Failed to fetch enquiries');
      }

      const result: ApiResponse = await response.json();

      if (result.success) {
        setEnquiries(result.data);
      } else {
        throw new Error('Failed to load enquiries');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-800 text-center mb-2">Error Loading Enquiries</h2>
          <p className="text-slate-600 text-center mb-4">{error}</p>
          <button
            onClick={fetchEnquiries}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Enquiries</h1>
          <p className="text-slate-600">
            Total: <span className="font-semibold text-blue-600">{enquiries.length}</span> enquiries
          </p>
        </div>

        {enquiries.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Enquiries Found</h3>
            <p className="text-slate-500">There are no enquiries to display at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {enquiries.map((enquiry) => (
              <div
                key={enquiry._id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-slate-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">
                      {enquiry.fullname}
                    </h2>
                    <div className="flex items-center text-slate-600 mb-2">
                      <Building2 className="w-4 h-4 mr-2" />
                      <span className="text-sm">{enquiry.companyName}</span>
                    </div>
                  </div>
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {enquiry.projectBudget}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-slate-700">
                    <Mail className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
                    <a
                      href={`mailto:${enquiry.email}`}
                      className="text-sm hover:text-blue-600 transition-colors truncate"
                    >
                      {enquiry.email}
                    </a>
                  </div>

                  <div className="flex items-center text-slate-700">
                    <Calendar className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
                    <span className="text-sm">{formatDate(enquiry.createdAt)}</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-start">
                    <FileText className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700 mb-1">Project Description</p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {enquiry.projectDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}