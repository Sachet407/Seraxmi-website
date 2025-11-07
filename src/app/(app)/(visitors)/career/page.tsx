"use client";
import { useState, useRef, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Globe, Briefcase, Award, Clock, Zap, HeartHandshake, FileText, X, Loader2, CheckCircle } from "lucide-react";

const CareersPage = () => {
  // Job openings data
  const jobOpenings = [
    {
      id: 1,
      title: "Frontend Developer",
      type: "Full-time",
      location: "Remote",
      department: "Engineering",
      description: "Build beautiful, responsive user interfaces using React and Next.js.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: 2,
      title: "UX Designer",
      type: "Full-time",
      location: "Kathmandu",
      department: "Design",
      description: "Create intuitive user experiences and stunning visual designs.",
      skills: ["Figma", "UI/UX", "Prototyping", "User Research"],
    },
    {
      id: 3,
      title: "DevOps Engineer",
      type: "Contract",
      location: "Remote",
      department: "Engineering",
      description: "Implement and maintain our cloud infrastructure and CI/CD pipelines.",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
    },
  ];

  // Benefits data
  const benefits = [
    {
      icon: <Globe className="w-8 h-8 text-[#188f8b]" />,
      title: "Remote Flexibility",
      description: "Work from anywhere in the world",
    },
    {
      icon: <Award className="w-8 h-8 text-[#188f8b]" />,
      title: "Career Growth",
      description: "Continuous learning opportunities",
    },
    {
      icon: <Clock className="w-8 h-8 text-[#188f8b]" />,
      title: "Flexible Hours",
      description: "Results-oriented work schedule",
    },
    {
      icon: <Zap className="w-8 h-8 text-[#188f8b]" />,
      title: "Cutting-edge Tech",
      description: "Work with modern technologies",
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-[#188f8b]" />,
      title: "Health Benefits",
      description: "Comprehensive medical coverage",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-[#188f8b]" />,
      title: "Equipment Stipend",
      description: "Budget for your ideal setup",
    },
  ];

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    coverLetter: "",
    agree: false
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // File upload component
  const FileUploadSection = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFile = e.target.files[0];
        
        // Validate file type
        const validTypes = ['application/pdf', 'application/msword', 
                          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(selectedFile.type)) {
          alert('Please upload a PDF, DOC, or DOCX file');
          return;
        }

        // Validate file size (5MB max)
        if (selectedFile.size > 5 * 1024 * 1024) {
          alert('File size should be less than 5MB');
          return;
        }

        setFile(selectedFile);
        setIsUploading(true);
        
        // Simulate upload process
        setTimeout(() => {
          setIsUploading(false);
          setUploadSuccess(true);
        }, 1500);
      }
    };

    const handleRemoveFile = (e: React.MouseEvent) => {
      e.stopPropagation();
      setFile(null);
      setUploadSuccess(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    const handleBoxClick = () => {
      fileInputRef.current?.click();
    };

    const getFileIcon = () => {
      if (!file) return <FileText className="w-10 h-10 text-[#188f8b]" />;
      
      if (file.type === 'application/pdf') {
        return <FileText className="w-10 h-10 text-red-500" />;
      } else if (file.type.includes('msword') || file.type.includes('wordprocessingml')) {
        return <FileText className="w-10 h-10 text-blue-500" />;
      }
      return <FileText className="w-10 h-10 text-[#188f8b]" />;
    };

    const getFileType = () => {
      if (!file) return '';
      if (file.type === 'application/pdf') return 'PDF';
      if (file.type === 'application/msword') return 'DOC';
      if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return 'DOCX';
      return file.type.split('/').pop()?.toUpperCase() || 'FILE';
    };

    return (
      <div className="space-y-2">
        <label htmlFor="resume" className="block text-sm font-medium text-slate-700  mb-1">
          Resume/CV <span className="text-red-500">*</span>
        </label>
        
        <input
          type="file"
          id="resume"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          className="hidden"
          required
        />
        
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleBoxClick}
          className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all duration-300 ${
            file 
              ? 'border-[#188f8b] bg-[#188f8b]/5 ' 
              : 'border-slate-300  hover:border-[#188f8b]'
          }`}
        >
          {!file ? (
            <div className="flex flex-col items-center justify-center text-center space-y-3">
              <div className="p-3 bg-[#188f8b]/10 rounded-full">
                <Briefcase className="w-6 h-6 text-[#188f8b]" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 ">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-slate-500  mt-1">
                  PDF, DOC, or DOCX (Max. 5MB)
                </p>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start justify-between gap-4"
            >
              <div className="flex items-center gap-4 flex-grow">
                <div className="flex-shrink-0">
                  {getFileIcon()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900  truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500  mt-1">
                    {getFileType()} • {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {isUploading && (
                    <div className="flex items-center gap-1 mt-2">
                      <Loader2 className="w-3 h-3 text-[#188f8b] animate-spin" />
                      <span className="text-xs text-[#188f8b]">Uploading...</span>
                    </div>
                  )}
                  {uploadSuccess && (
                    <div className="flex items-center gap-1 mt-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600 ">Upload successful</span>
                    </div>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                aria-label="Remove file"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-blue-50/30 ">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50  border border-blue-200  rounded-full text-sm font-medium shadow-lg backdrop-blur-sm mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Join Our Team
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700  bg-clip-text text-transparent mb-4">
              Build the Future With Us
            </h1>
            <p className="text-lg md:text-xl text-slate-600  max-w-3xl mx-auto">
              We&apos;re looking for passionate individuals to help us create innovative solutions that make a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-[#188f8b]/5 to-teal-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900  mb-4">
              Our Perks & Benefits
            </h2>
            <p className="text-slate-600  max-w-2xl mx-auto">
              We take care of our team with comprehensive benefits and a supportive work environment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white  p-8 rounded-xl shadow-lg border border-slate-200  hover:border-[#188f8b] transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-[#188f8b]/10 p-2 rounded-lg mr-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 ">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-slate-600 ">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900  mb-4">
              Current Openings
            </h2>
            <p className="text-slate-600  max-w-2xl mx-auto">
              Explore our available positions and find where you fit best.
            </p>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white  rounded-xl shadow-lg border border-slate-200  overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#188f8b]/10 text-[#188f8b]">
                          {job.type}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100/50 text-blue-800 ">
                          {job.location}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100/50  text-purple-800 ">
                          {job.department}
                        </span>
                      </div>
                    </div>
                    <button className="bg-[#188f8b] hover:bg-[#147a76] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 whitespace-nowrap">
                      Apply Now
                    </button>
                  </div>
                  <p className="text-slate-600  mt-4">
                    {job.description}
                  </p>
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-slate-700  mb-2">
                      Key Skills:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100  text-slate-800 "
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50 ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white  rounded-2xl shadow-xl border border-slate-200  p-8 md:p-10"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900  mb-2">
                Apply Now
              </h2>
              <p className="text-slate-600 ">
                Ready to join our team? Fill out the form below and we&apos;ll get back to you soon.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-700  mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300  focus:ring-2 focus:ring-[#188f8b] focus:border-[#188f8b] outline-none transition bg-white "
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-700  mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300  focus:ring-2 focus:ring-[#188f8b] focus:border-[#188f8b] outline-none transition bg-white "
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700  mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300  focus:ring-2 focus:ring-[#188f8b] focus:border-[#188f8b] outline-none transition bg-white "
                  required
                />
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-slate-700  mb-1">
                  Position Applying For <span className="text-red-500">*</span>
                </label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300  focus:ring-2 focus:ring-[#188f8b] focus:border-[#188f8b] outline-none transition bg-white"
                  required
                >
                  <option value="">Select a position</option>
                  {jobOpenings.map((job) => (
                    <option key={job.id} value={job.title}>
                      {job.title} ({job.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Enhanced File Upload Section */}
              <FileUploadSection />

              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-slate-700 mb-1">
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows={5}
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#188f8b] focus:border-[#188f8b] outline-none transition bg-white "
                  placeholder="Tell us why you'd be a great fit..."
                ></textarea>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  checked={formData.agree as boolean}
                  onChange={handleInputChange}
                  className="h-4 w-4 mt-1 text-[#188f8b] focus:ring-[#188f8b] border-slate-300 rounded"
                  required
                />
                <label htmlFor="agree" className="ml-2 block text-sm text-slate-700 ">
                  I agree to the processing of my personal data <span className="text-red-500">*</span>
                </label>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-[#188f8b] to-teal-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-[#188f8b]/30 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Briefcase className="w-5 h-5" />
                Submit Application
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;