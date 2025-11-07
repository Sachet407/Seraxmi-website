"use client";
import Link from "next/link";
import { Compass, Home, Sparkles } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50  p-6">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Animated compass icon */}
        <div className="relative inline-block">
          <Compass className="w-24 h-24 text-blue-600  animate-spin-slow" />
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-500 animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          You&apos;ve Discovered New Territory
        </h1>

        <p className="text-xl sm:text-2xl text-slate-600 ">
          This page isn&apos;t on our map yet, but there&apos;s plenty to explore back home.
        </p>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
          <Link
            href="/"
            className="relative px-8 py-4 bg-white  rounded-lg flex items-center justify-center gap-3 text-lg font-semibold text-slate-900 group-hover:text-blue-600  transition-colors duration-300"
          >
            <Home className="w-5 h-5" />
            <span>Return to Home</span>
          </Link>
        </div>

        <p className="text-sm text-slate-500  mt-8">
          Or use the compass of your browser to navigate elsewhere
        </p>
      </div>

      {/* Decorative elements */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white  pointer-events-none"></div>
      <div className="fixed top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
}