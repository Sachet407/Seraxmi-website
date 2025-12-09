"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, User, Calendar, MessageSquare, Loader } from "lucide-react";
import { motion} from "framer-motion";

interface Contact {
  _id: string;
  fullname: string;
  email: string;
  phoneNumber?: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/api/contact");
        const data = await res.json();

        if (!data.success) throw new Error("Failed to fetch messages");

        setContacts(data.data);
      } catch  {
        setError("Failed to load contact messages");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-slate-700 text-lg">
        <Loader className="animate-spin mr-3" /> Loading messages...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <section className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Contact Form Submissions
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {contacts.map((contact) => {
          const isExpanded = expandedId === contact._id;

          return (
            <motion.div
              key={contact._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {contact.fullname}
                  </h2>
                  <p className="text-sm text-slate-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(contact.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="mt-4 space-y-3">
                <p className="text-slate-700 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#188f8b]" /> {contact.email}
                </p>

                {contact.phoneNumber && (
                  <p className="text-slate-700 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-[#188f8b]" />{" "}
                    {contact.phoneNumber}
                  </p>
                )}

                <p className="text-slate-700 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#188f8b]" /> {contact.subject}
                </p>
              </div>

              {/* Message */}
              <div className="mt-4">
                <p className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#188f8b]" />
                  Message
                </p>

                <p className="text-slate-600 text-sm">
                  {isExpanded
                    ? contact.message
                    : contact.message.substring(0, 80) +
                      (contact.message.length > 80 ? "..." : "")}
                </p>

                {contact.message.length > 80 && (
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : contact._id)
                    }
                    className="mt-2 text-[#188f8b] font-medium text-sm hover:underline"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}
              </div>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
