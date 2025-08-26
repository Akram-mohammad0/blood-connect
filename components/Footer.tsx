"use client";

import Link from "next/link";
import { Droplet, Instagram, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + About */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-3">
            <Droplet className="w-7 h-7 text-red-600" />
            <span className="text-xl font-extrabold text-red-600">
              Blood Connect
            </span>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Blood Connect is a platform to register donors, find blood, and
            create awareness about the importance of donating blood.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-400 hover:text-red-600 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="text-gray-600 dark:text-gray-400 hover:text-red-600 transition"
              >
                Register as Donor
              </Link>
            </li>
            <li>
              <Link
                href="/donors"
                className="text-gray-600 dark:text-gray-400 hover:text-red-600 transition"
              >
                Find Donors
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-600 dark:text-gray-400 hover:text-red-600 transition"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>Email: <span className="text-red-600">support@bloodconnect.com</span></li>
            <li>Phone: +91 9876543210</li>
            <li>Location: Vijayawada, India</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <Link
              href="https://instagram.com"
              target="_blank"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-red-600 hover:text-white transition"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-red-600 hover:text-white transition"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-red-600 hover:text-white transition"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href="mailto:support@bloodconnect.com"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-red-600 hover:text-white transition"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-6 py-4">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-red-600 dark:text-red-400">
            Blood Connect
          </span>{" "}
          • All rights reserved.
        </p>
      </div>
    </footer>
  );
}
