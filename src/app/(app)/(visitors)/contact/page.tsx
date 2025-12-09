"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const ContactUs = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Form submitted with data:", formData);

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        subject: formData.subject,
        message: formData.message,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Something went wrong!");
      return;
    }

setShowSuccess(true);


    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  } catch (err) {
    console.error("Error submitting contact form:", err);
    alert("Failed to send message. Please try again.");
  }
};


  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-[#188f8b]" />,
      title: "Email Us",
      value: "contact@seraxmi.com",
      link: "mailto:contact@seraxmi.com",
    },
    {
      icon: <Phone className="w-6 h-6 text-[#188f8b]" />,
      title: "Call Us",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#188f8b]" />,
      title: "Visit Us",
      value: "123 Tech Park, Silicon Valley, CA",
      link: "https://maps.google.com",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-slate-50 to-blue-50/30  overflow-hidden">
      {/* Background elements similar to About page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50  border border-blue-200  rounded-full text-sm font-medium shadow-lg backdrop-blur-sm mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700  bg-clip-text text-transparent mb-4">
            Let&apos;s Build Something Great
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Have a project in mind or want to learn more about our services? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg border border-slate-200"
              >
                <div className="bg-[#188f8b]/10 p-3 rounded-full">
                  {method.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    {method.title}
                  </h3>
                  <a
                    href={method.link}
                    className="text-slate-600 hover:text-[#188f8b] transition-colors"
                  >
                    {method.value}
                  </a>
                </div>
              </motion.div>
            ))}

            {/* Office hours */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 ">
              <h3 className="text-lg font-semibold text-slate-900  mb-4">
                Office Hours
              </h3>
              <div className="space-y-2 text-slate-600">
                <p className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-2xl border border-slate-200 "
          >
            <h3 className="text-2xl font-bold text-slate-900  mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300  focus:ring-2 focus:ring-[#188f8b] focus:border-[#188f8b] outline-none transition bg-white "
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#188f8b] focus:border-[#188f8b] outline-none transition bg-white "
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300  focus:ring-2 focus:ring-[#188f8b] focus:border-[#188f8b] outline-none transition bg-white"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-slate-700  mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300  focus:ring-2 focus:ring-[#188f8b] focus:border-[#188f8b] outline-none transition bg-white "
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700  mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300  focus:ring-2 focus:ring-[#188f8b] focus:border-[#188f8b] outline-none transition bg-white "
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#188f8b] to-teal-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-[#188f8b]/30 transition-all"
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
      {/* Success Modal */}
<AnimatePresence>
  {showSuccess && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-slate-200"
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-[#188f8b]/10 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-[#188f8b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Message Sent!
        </h2>

        <p className="text-slate-600 mb-6">
          Thank you for reaching out. We’ll get back to you as soon as possible.
        </p>

        <button
          onClick={() => setShowSuccess(false)}
          className="w-full py-3 bg-[#188f8b] text-white rounded-xl font-semibold shadow-lg hover:bg-[#157f7b] transition"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </section>
  );
};

export default ContactUs;