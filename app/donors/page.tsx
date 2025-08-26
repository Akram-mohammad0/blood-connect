"use client";

import { useState } from "react";
import { Donor } from "@/types"; // Make sure you export the Donor interface somewhere
import { motion } from "framer-motion";

interface ChatbotProps {
  onResults?: (donors: Donor[]) => void;
}

export default function Chatbot({ onResults }: ChatbotProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input) return;

    setLoading(true);

    try {
      // Replace this with your actual API call to fetch donors
      const response = await fetch("/api/searchDonors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      const data: Donor[] = await response.json();

      if (onResults) {
        onResults(data); // Pass results back to parent
      }
    } catch (error) {
      console.error(error);
      if (onResults) {
        onResults([]); // return empty array on error
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask the chatbot..."
        className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 mb-2"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded disabled:opacity-50"
      >
        {loading ? "Searching..." : "Search Donors"}
      </button>
    </div>
  );
}
