import React, { useState, useCallback } from "react";
import {
  X,
  Calendar,
  Mail,
  User,
  Building,
  DollarSign,
  FileText,
  CheckCircle,
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Enquiry: React.FC<Props> = ({ isOpen, onClose }) => {
  // ------------------------
  // ✅ Hooks must always run
  // ------------------------
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    budget: "",
    email: "",
    projectDescription: "",
  });

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const payload = {
        fullname: formData.name,
        companyName: formData.companyName,
        projectBudget: formData.budget,
        email: formData.email,
        projectDescription: formData.projectDescription,
      };

      try {
        const res = await fetch("/api/enquiry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data?.message || "Failed to submit form");
          return;
        }

        setIsSubmitted(true);

        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
          setFormData({
            name: "",
            companyName: "",
            budget: "",
            email: "",
            projectDescription: "",
          });
        }, 3000);
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      }
    },
    [formData, onClose]
  );

  // ------------------------
  // ✅ Check AFTER hooks
  // ------------------------
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-gray-200/20">
        {!isSubmitted ? (
          <>
            {/* Modal Header */}
            <div className="relative px-8 pt-8 pb-6 border-b border-gray-200/20">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#188f8b] to-[#16807c] rounded-2xl flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Book a Call
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Let&apos;s discuss your project and bring your vision to
                    life
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Name Field */}
              <div className="group">
                <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 mb-3">
                  <User className="w-5 h-5 text-[#188f8b]" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#188f8b] focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Company Name Field */}
              <div className="group">
                <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 mb-3">
                  <Building className="w-5 h-5 text-[#188f8b]" />
                  Company Name{" "}
                  <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#188f8b] focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Your company name"
                />
              </div>

              {/* Budget Field */}
              <div className="group">
                <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 mb-3">
                  <DollarSign className="w-5 h-5 text-[#188f8b]" />
                  Project Budget *
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-[#188f8b] focus:border-transparent outline-none transition-all duration-200"
                >
                  <option value="">Select your budget range</option>
                  <option value="under-5k">Under $5,000</option>
                  <option value="5k-15k">$5,000 - $15,000</option>
                  <option value="15k-30k">$15,000 - $30,000</option>
                  <option value="30k-50k">$30,000 - $50,000</option>
                  <option value="50k-plus">$50,000+</option>
                </select>
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 mb-3">
                  <Mail className="w-5 h-5 text-[#188f8b]" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#188f8b] focus:border-transparent outline-none transition-all duration-200"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Project Description Field */}
              <div className="group">
                <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 mb-3">
                  <FileText className="w-5 h-5 text-[#188f8b]" />
                  Project Description *
                </label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#188f8b] focus:border-transparent outline-none transition-all duration-200 resize-none"
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#188f8b] to-[#16807c] hover:from-[#16807c] hover:to-[#147571] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-3"
              >
                <Calendar className="w-6 h-6" />
                Book a Meeting
              </button>
            </form>
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
            <p className="text-gray-600 text-lg mb-2">
              Your meeting request has been submitted successfully.
            </p>
            <p className="text-[#188f8b] font-semibold text-lg">
              Stay updated on your Gmail account please.
            </p>
            <div className="mt-8 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600">
                We&apos;ll reach out to you within 24 hours to schedule your
                consultation.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enquiry;
