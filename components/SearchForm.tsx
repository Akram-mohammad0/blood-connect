"use client";

import { useState } from "react";
import { Search, MapPin, Droplet, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const BLOOD_TYPES = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];

interface Donor {
  id: number;
  name: string;
  bloodType: string;
  gender: string;
  location: string;
  age: number;
  weight: number;
  contact: string;
  email?: string;
  healthIssues?: string;
  notes?: string;
  lastDonation?: string;
  createdAt: string;
}

interface SearchFormProps {
  onResults: (data: Donor[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (msg: string) => void;
}

export default function SearchForm({ onResults, setLoading, setError }: SearchFormProps) {
  const [q, setQ] = useState({ location: "", bloodType: "" });

  const search = async () => {
    if (!q.location.trim() || !q.bloodType.trim()) {
      setError("⚠️ Please enter both location and blood group.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const params = new URLSearchParams({
        location: q.location.trim(),
        bloodType: q.bloodType.trim().toUpperCase(),
      });

      const url = `${window.location.origin}/api/donors?${params.toString()}`;
      const res = await fetch(url);

      if (!res.ok) throw new Error(`Failed to fetch donors (${res.status})`);
      const data: Donor[] = await res.json();

      onResults(Array.isArray(data) ? data : []);
      if (!data.length) setError("No donors found matching your criteria.");
    } catch (err: any) {
      setError(err.message || "Something went wrong while fetching donors.");
      onResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setQ({ location: "", bloodType: "" });
    onResults([]);
    setError("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md border"
    >
      <h2 className="text-2xl font-bold text-red-600 flex items-center gap-2">
        <Search className="w-6 h-6 text-red-500" />
        Search Blood Donors
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 mt-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            className="w-full pl-10 pr-3 py-2 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="City / Area *"
            value={q.location}
            onChange={(e) => setQ({ ...q, location: e.target.value })}
          />
        </div>

        <div className="relative">
          <Droplet className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <select
            className="w-full pl-10 pr-3 py-2 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-red-500 outline-none"
            value={q.bloodType}
            onChange={(e) => setQ({ ...q, bloodType: e.target.value })}
          >
            <option value="">Select Blood Type *</option>
            {BLOOD_TYPES.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3 mt-5">
        <button
          onClick={search}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium shadow-md transition-transform transform hover:scale-105"
        >
          <Search className="w-5 h-5" />
          Search
        </button>

        <button
          onClick={clear}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium shadow-md transition-transform transform hover:scale-105"
        >
          <XCircle className="w-5 h-5" />
          Clear
        </button>
      </div>
    </motion.div>
  );
}
