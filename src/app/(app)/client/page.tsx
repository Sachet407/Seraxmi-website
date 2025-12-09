"use client";

import React, { useState, useRef } from 'react';
import { Star, UploadCloud, XCircle, LogOut, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'next-auth/react';

/* ----------------  TYPES  ---------------- */
interface FormState {
  profileImage: string | null;
  position: string;
  fullName: string;
  companyName: string;
  review: string;
  stars: number;
}

/* ----------------  RE-USABLE INPUT  ---------------- */
interface InputGroupProps {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  textarea?: boolean;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, name, value, onChange, error, textarea = false }) => {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700">{label}</label>
      <motion.div whileFocus={{ scale: 1.01 }} className="w-full">
        <Tag
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={textarea ? 4 : undefined}
          className={`w-full p-3 bg-white/70 border ${error ? 'border-red-400' : 'border-gray-200'
            } focus:border-[#188f8b] focus:ring-2 focus:ring-[#188f8b]/20 rounded-xl outline-none transition text-gray-800 placeholder-gray-400 resize-none`}
          placeholder={`Your ${label.toLowerCase()}...`}
          required
        />
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-red-500 font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ----------------  MAIN COMPONENT  ---------------- */
export default function ClientFeedbackPortal() {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  /* ---- state ---- */
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
  const [message, setMessage] = useState<{ type: 'success' | 'error' | null; text: string | null }>({
    type: null,
    text: null,
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ---- handlers ---- */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleRatingChange = (n: number) => setForm((p) => ({ ...p, stars: n }));

  const handleImageRemove = () => {
    setForm((p) => ({ ...p, profileImage: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !UPLOAD_PRESET) return;
    if (file.size > 2 * 1024 * 1024) {
      setErrors((p) => ({ ...p, profileImage: 'Max 2 MB' }));
      return;
    }
    setImageUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('upload_preset', UPLOAD_PRESET);
      fd.append('folder', 'testimonial-avatars');
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: 'POST', body: fd });
      const data = await res.json();
      if (data.secure_url) {
        setForm((p) => ({ ...p, profileImage: data.secure_url }));
        setMessage({ type: 'success', text: 'Photo uploaded 👍' });
        setTimeout(() => setMessage({ type: null, text: null }), 3000);
      } else throw new Error(data.error?.message || 'Upload failed');
    } catch {
      setMessage({ type: 'error', text: 'Upload failed' });
      handleImageRemove();
    } finally {
      setImageUploading(false);
    }
  };

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.profileImage) e.profileImage = 'Add your photo';
    if (!form.fullName) e.fullName = 'Required';
    if (!form.position) e.position = 'Required';
    if (!form.companyName) e.companyName = 'Required';
    if (!form.review || form.review.length < 10) e.review = 'Min 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/testimonial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ type: 'success', text: 'Thank you! Your feedback means a lot ❤️' });
        setForm({ profileImage: null, position: '', fullName: '', companyName: '', review: '', stars: 5 });
        handleImageRemove();
      } else setMessage({ type: 'error', text: data.error || 'Error' });
    } catch {
      setMessage({ type: 'error', text: 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggingOut(true);          // show modal with spinner
    // keep modal on screen until browser unloads
    signOut({ redirect: true });
  };

  /* ---------- RENDER ---------- */
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#188f8b]/10 px-4 py-6">
      {/* subtle animated bg blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-24 -left-24 w-72 h-72 bg-[#188f8b]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl"
        />
      </div>

      {/* ----------  TOP BAR  ---------- */}
 <nav className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between p-4 md:px-6">
  <img src="/seraxmi-Light.svg" alt="Seraxmi" className="h-24 w-auto" />

  {/* Premium exit button – bigger, softer, glowing */}
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setShowLogoutConfirm(true)}
    className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full
               bg-white/90 backdrop-blur
               text-red-500 text-sm font-semibold
               shadow-md hover:shadow-lg hover:shadow-red-500/10
               transition-all duration-300
               ring-1 ring-red-200/50 hover:ring-red-300/70"
  >
    <LogOut size={23} />
    <span>Exit</span>
  </motion.button>

  {/* Mobile keeps the simple circle */}
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setShowLogoutConfirm(true)}
    className="md:hidden p-2.5 rounded-full bg-white/80 backdrop-blur text-red-500 shadow"
  >
    <LogOut size={18} />
  </motion.button>
</nav>
      {/* ----------  FORM CARD  ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl rounded-3xl p-6 md:p-10">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-800">How did we do?</h1>

          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* avatar */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                {form.profileImage ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative w-28 h-28">
                    <img src={form.profileImage} alt="Avatar" className="w-full h-full rounded-full object-cover shadow-lg border-4 border-white" />
                    <button type="button" onClick={handleImageRemove} className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1 shadow-md hover:bg-red-50">
                      <XCircle size={20} />
                    </button>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
                      <CheckCircle size={12} /> Uploaded
                    </div>
                  </motion.div>
                ) : (
                  <motion.label
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center justify-center w-28 h-28 rounded-full border-2 border-dashed border-[#188f8b]/40 bg-[#188f8b]/5 hover:bg-[#188f8b]/10 hover:border-[#188f8b] transition-all cursor-pointer ${imageUploading ? 'animate-pulse' : ''}`}
                  >
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" disabled={loading || imageUploading} />
                    {imageUploading ? <UploadCloud className="w-8 h-8 text-[#188f8b] animate-bounce" /> : <UploadCloud className="w-8 h-8 text-[#188f8b]" />}
                    <span className="text-[10px] text-[#188f8b] font-bold uppercase tracking-wide mt-1">Photo</span>
                  </motion.label>
                )}
              </div>
              {errors.profileImage && <p className="mt-2 text-xs text-red-500">{errors.profileImage}</p>}
            </div>

            {/* inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputGroup label="Full Name" name="fullName" value={form.fullName} onChange={handleInputChange} error={errors.fullName} />
              <InputGroup label="Position" name="position" value={form.position} onChange={handleInputChange} error={errors.position} />
            </div>
            <InputGroup label="Company" name="companyName" value={form.companyName} onChange={handleInputChange} error={errors.companyName} />

            {/* stars */}
            <div className="flex flex-col items-center space-y-2">
              <label className="text-sm font-semibold text-gray-700">Rate your experience</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <motion.button
                    type="button"
                    key={s}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRatingChange(s)}
                    className="focus:outline-none"
                  >
                    <Star size={32} className={`transition ${s <= form.stars ? 'fill-yellow-400 text-yellow-400 drop-shadow' : 'text-gray-300'}`} />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* review */}
            <InputGroup label="Your Review" name="review" value={form.review} onChange={handleInputChange} error={errors.review} textarea />

            {/* message */}
            <AnimatePresence>
              {message.text && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-3 rounded-xl flex items-center gap-2 text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                >
                  {message.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
                  <span>{message.text}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || imageUploading || !form.profileImage}
              className="w-full py-4 bg-[#206d6a] text-white rounded-xl shadow-lg shadow-[#188f8b]/30 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#082e2d] transition"
            >
              {loading ? 'Submitting...' : 'Send Feedback 🚀'}
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* ----------  LOGOUT MODAL  ---------- */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setShowLogoutConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border-t-4 border-[#188f8b]/10 "
              onClick={(e) => e.stopPropagation()}
            >
              {isLoggingOut ? (
                <div className="flex flex-col items-center text-center">
                  <Loader className="w-8 h-8 text-[#188f8b] animate-spin mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Logging out…</h3>
                  <p className="text-sm text-gray-500">Please wait while we sign you out.</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-500">
                    <LogOut size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to leave?</h3>
                  <p className="text-gray-500 mb-6">Are you sure you want to log out?</p>
                  <div className="flex gap-3 w-full">
                    <button
                      onClick={() => setShowLogoutConfirm(false)}
                      className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex-1 py-2.5 px-4 bg-[#188f8b] hover:bg-[#157a77] text-white rounded-xl font-medium transition shadow"
                    >
         Logout
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}