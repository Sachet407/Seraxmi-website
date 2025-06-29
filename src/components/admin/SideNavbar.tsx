"use client";
import React, { useState } from 'react';
import {
  Menu, X, FileText, Briefcase, Mail,
  ChevronLeft, ChevronRight, Settings, User, LogOut
} from 'lucide-react';
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('blog');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigationItems = [
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'newsletter', label: 'Newsletter', icon: Mail },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'logout', label: 'Logout', icon: LogOut },
  ];

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={toggleMobile} />
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobile}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white rounded-lg p-2 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-xl z-50 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-[#188f8b] rounded-lg flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            {!isCollapsed && <h1 className="font-bold text-xl text-gray-800">Admin</h1>}
          </div>
          {/* Toggle Buttons */}
          <button onClick={toggleSidebar} className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors duration-200">
            {isCollapsed ? <ChevronRight className="w-4 h-4 text-gray-600" /> : <ChevronLeft className="w-4 h-4 text-gray-600" />}
          </button>
          <button onClick={toggleMobile} className="lg:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col h-full">
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center px-3 py-3 rounded-xl transition-all duration-200 group relative
                    ${isCollapsed ? 'justify-center' : 'space-x-3'}
                    ${isActive ? 'bg-[#188f8b] text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      {item.label}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            {bottomItems.map((item) => {
              const Icon = item.icon;
              const handleClick = item.id === 'logout'
                ? () => setShowLogoutModal(true)
                : () => setActiveItem(item.id);

              return (
                <button
                  key={item.id}
                  onClick={handleClick}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 group relative
                    ${isCollapsed ? 'justify-center' : 'space-x-3'}
                    ${activeItem === item.id
                      ? 'bg-[#188f8b] text-white'
                      : item.id === 'logout'
                        ? 'text-gray-500 hover:bg-red-50 hover:text-red-600'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}
                  `}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      {item.label}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* User Profile */}
          {!isCollapsed && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                <div className="w-8 h-8 bg-[#188f8b] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">Admin User</p>
                  <p className="text-xs text-gray-500 truncate">admin@example.com</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
            <p className="text-sm text-gray-600">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                className="px-4 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-100"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`px-4 py-2 text-sm text-white rounded-md bg-[#188f8b] hover:bg-[#0f6c68] transition-all duration-200 ${
                  isLoggingOut ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {isLoggingOut ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Logging out...</span>
                  </div>
                ) : (
                  'Logout'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
