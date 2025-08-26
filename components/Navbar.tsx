"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Sun,
  Moon,
  Droplet,
  Users,
  Info,
  UserPlus,
  Menu,
  X,
  Home,
  MessageCircle,
} from "lucide-react"; // Using MessageCircle as chatbot icon
import { motion, AnimatePresence } from "framer-motion";
import Chatbot from "./Chatbot"; // Import Chatbot component

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [bw, setBw] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false); // Track if chatbot is open

  useEffect(() => {
    setDark(localStorage.getItem("theme-dark") === "1");
    setBw(localStorage.getItem("theme-bw") === "1");
    setIsAdmin(localStorage.getItem("is-admin") === "1");
  }, []);

  useEffect(() => {
    const cls = document.documentElement.classList;
    dark ? cls.add("dark") : cls.remove("dark");
    localStorage.setItem("theme-dark", dark ? "1" : "0");
  }, [dark]);

  useEffect(() => {
    const cls = document.documentElement.classList;
    bw ? cls.add("bw") : cls.remove("bw");
    localStorage.setItem("theme-bw", bw ? "1" : "0");
  }, [bw]);

  const links = [
    { name: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Register", href: "/register", icon: <UserPlus className="w-4 h-4" /> },
    { name: "Find Donors", href: "/donors", icon: <Users className="w-4 h-4" /> },
    { name: "About", href: "/about", icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Droplet className="w-7 h-7 text-red-600" />
          <span className="text-xl font-extrabold text-red-600">
            Blood Connect
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-1 px-3 py-2 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-gray-800 hover:text-red-600 transition"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          {isAdmin && (
            <Link
              href="/admin"
              className="px-3 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition shadow-md"
            >
              Admin
            </Link>
          )}

          {/* Theme Toggle Buttons */}
          <div className="flex gap-2 ml-4">
            <button
              aria-label="Toggle dark mode"
              onClick={() => setDark(!dark)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 shadow transition"
            >
              {dark ? (
                <Moon className="w-5 h-5 text-yellow-400" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-500" />
              )}
            </button>

            <button
              aria-label="Toggle black & white mode"
              onClick={() => setBw(!bw)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 shadow transition"
            >
              {bw ? "🌓" : "⬛"}
            </button>
          </div>

          {/* Chatbot Toggle Button */}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md transition ml-4"
            title="Open Chatbot"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Chatbot button */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="md:hidden absolute right-16 top-4 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md transition"
          title="Open Chatbot"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 px-6 py-4 space-y-4"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-gray-800 transition"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition"
              >
                Admin
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render Chatbot */}
      {chatOpen && <Chatbot />}
    </nav>
  );
}
