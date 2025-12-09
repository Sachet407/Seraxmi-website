"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  List,
  MessageSquare,
  Key,
  Briefcase,
  Mail,
  Newspaper,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Loader,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";

// -------------------------------------------
// Navigation Structure
// -------------------------------------------

const NAV: any[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, link: "/admin/dashboard" },

  {
    id: "blog",
    label: "Blog Management",
    icon: FileText,
    submenu: [
      { id: "create-blog", label: "Create Blog", icon: PlusCircle, link: "/admin/blog/create" },
      { id: "all-blogs", label: "All Blogs", icon: List, link: "/admin/blog" },
    ],
  },

  {
    id: "testimonial",
    label: "Testimonials",
    icon: MessageSquare,
    submenu: [
      { id: "create-testimonial", label: "Create Testimonial", icon: PlusCircle, link: "/admin/testimonial/create" },
      { id: "all-testimonials", label: "All Testimonials", icon: List, link: "/admin/testimonial" },
      { id: "credentials", label: "Manage Credentials", icon: Key, link: "/admin/testimonial/credentials" },
    ],
  },

  {
    id: "projects",
    label: "Case Studies",
    icon: Briefcase,
    submenu: [
      { id: "create-project", label: "Create Project", icon: PlusCircle, link: "/admin/projects/create" },
      { id: "all-projects", label: "All Projects", icon: List, link: "/admin/projects/all" },
    ],
  },

  { id: "enquiries", label: "Enquiries", icon: Mail, link: "/admin/enquiries" },
  { id: "newsletter", label: "Newsletter", icon: Newspaper, link: "/admin/newsletter" },
  { id: "contact", label: "Contact", icon: Newspaper, link: "/admin/contact" },
];

// -------------------------------------------
// Page Transition Loader
// -------------------------------------------

const PageLoader = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-[9999]">
    <Image src="/seraxmi-Dark.svg" width={130} height={130} alt="Loading..." className="animate-pulse" />
    <Loader className="w-6 h-6 mt-4 text-[#188f8b] animate-spin" />
  </div>
);

// -------------------------------------------
// Logout Modal
// -------------------------------------------

const LogoutModal = ({ open, onClose, onConfirm }: any) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl"
      >
        <h2 className="text-xl font-bold text-gray-800 text-center mb-3">Confirm Logout</h2>
        <p className="text-center text-gray-600 mb-6">Are you sure you want to log out?</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// -------------------------------------------
// Main Sidebar Component
// -------------------------------------------

const AdminSidebar = () => {
  const router = useRouter();
  const pathname = usePathname() || "/";

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize expanded menu if current pathname is in submenu
  useEffect(() => {
    const newExpanded: Record<string, boolean> = {};
    NAV.forEach((item) => {
      if (item.submenu) {
        const should = item.submenu.some((s: any) => s.link === pathname);
        if (should) newExpanded[item.id] = true;
      }
    });
    setExpanded((prev) => ({ ...newExpanded, ...prev }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Hide loader when pathname changes (navigation finished)
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  const navigate = useCallback(
    (url: string) => {
      // don't show loader if navigating to the same URL
      if (!url || url === pathname) {
        setMobileOpen(false);
        return;
      }
      setLoading(true);
      router.push(url);
      setMobileOpen(false);
    },
    [router, pathname]
  );

  const toggle = (id: string) =>
    setExpanded((p) => ({
      ...p,
      [id]: !p[id],
    }));

  const logout = useCallback(async () => {
    // triggers next-auth signOut which will redirect away;
    // loader is not necessary here because page unload happens
    await signOut({ redirect: true });
  }, []);

  const isActive = (link?: string) => {
    if (!link) return false;
    return pathname === link;
  };

  const NavItem = ({ item, isSub = false }: any) => {
    const Icon = item.icon;
    const active = isActive(item.link);
    const expandedState = !!expanded[item.id];

    // parent with submenu
    if (item.submenu) {
      return (
        <div>
          <button
            onClick={() => toggle(item.id)}
            className={`flex w-full items-center justify-between px-4 py-3 rounded-xl transition ${
              expandedState ? "bg-[#188f8b]/10 text-[#188f8b]" : "hover:bg-gray-100 text-gray-700"
            }`}
            aria-expanded={expandedState}
          >
            <span className="flex items-center gap-3">
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </span>
            <ChevronDown size={18} className={`${expandedState ? "rotate-180" : ""} transition`} />
          </button>

          <AnimatePresence initial={false}>
            {expandedState && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="ml-4 mt-1 pl-4 border-l border-gray-200 space-y-1"
              >
                {item.submenu.map((sub: any) => (
                  <NavItem key={sub.id} item={sub} isSub />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    // simple nav item
    return (
      <button
        onClick={() => navigate(item.link)}
        className={`relative flex w-full items-center gap-3 px-4 py-3 rounded-xl transition ${
          active ? "bg-[#188f8b]/10 text-[#188f8b] font-medium" : "text-gray-700 hover:bg-gray-100"
        } ${isSub ? "py-2 pl-6 text-sm" : ""}`}
        aria-current={active ? "page" : undefined}
      >
        <Icon size={isSub ? 18 : 20} />
        <span className={`${isSub ? "" : ""}`}>{item.label}</span>

        {active && <span className="absolute left-0 top-0 h-full w-1 bg-[#188f8b] rounded-r-md" />}
      </button>
    );
  };

  return (
    <>
      {loading && <PageLoader />}

      <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} onConfirm={logout} />

      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-[200] bg-white/90 shadow p-2 rounded-lg"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <div className="fixed inset-0 bg-black/40 z-[150]" onClick={() => setMobileOpen(false)} />

            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-[200] p-4 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <Image src="/seraxmi-Dark.svg" width={75} height={75} alt="Logo" className="object-contain" />
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>

              <nav className="space-y-2 overflow-y-auto">
                {NAV.map((item) => (
                  <NavItem key={item.id} item={item} />
                ))}
              </nav>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <button
                  onClick={() => setLogoutOpen(true)}
                  className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl w-full"
                >
                  <LogOut size={20} /> Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col justify-between fixed left-0 top-0 w-72 h-full bg-white shadow-md p-4">
        <div>
          <div className="flex justify-center py-4 border-b border-gray-100">
            <Image src="/seraxmi-Dark.svg" width={80} height={80} alt="Logo" />
          </div>

          <nav className="mt-4 space-y-2 overflow-y-auto">
            {NAV.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <button
            onClick={() => setLogoutOpen(true)}
            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl w-full"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
