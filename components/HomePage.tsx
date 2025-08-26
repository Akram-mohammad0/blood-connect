"use client";

import Link from "next/link";
import { Droplet, Users, Info, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const options = [
    {
      title: "Register as Donor",
      description: "Join our community and save lives by donating blood.",
      href: "/register",
      icon: <UserPlus className="w-12 h-12 text-red-600" />,
    },
    {
      title: "Find Donors",
      description: "Search for blood donors near you based on your criteria.",
      href: "/donors",
      icon: <Users className="w-12 h-12 text-red-600" />,
    },
    {
      title: "Learn More",
      description: "Understand blood donation and how it helps the community.",
      href: "/about",
      icon: <Info className="w-12 h-12 text-red-600" />,
    },
  ];

  return (
    <main className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center gap-10 bg-gradient-to-br from-red-50 to-white dark:from-gray-900 dark:to-gray-800 px-6 py-16 transition-colors duration-700">
      {/* Hero Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-center text-red-600 dark:text-red-400"
      >
        Donate Blood. Save Lives.
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-lg text-gray-700 dark:text-gray-300 max-w-xl text-center"
      >
        Blood Connect helps you register as a donor, find donors near you, and
        learn about blood donation.
      </motion.p>

      {/* Options Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mt-10"
      >
        {options.map(({ title, description, href, icon }) => (
          <Link
            href={href}
            key={title}
            className="group cursor-pointer transform rounded-xl border border-gray-200 bg-white p-8 shadow-md hover:shadow-xl hover:scale-[1.04] dark:bg-gray-900 dark:border-gray-700 transition-all"
          >
            <div className="mb-4">{icon}</div>
            <h2 className="text-2xl font-semibold text-red-600 group-hover:text-red-700 dark:text-red-400 dark:group-hover:text-red-300 transition-colors">
              {title}
            </h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{description}</p>
          </Link>
        ))}
      </motion.div>
    </main>
  );
}
