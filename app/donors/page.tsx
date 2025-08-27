"use client";

import { useState, useEffect } from "react";
import SearchForm from "@/components/SearchForm";
import DonorCard from "@/components/DonorCard";
import { Donor } from "@/types";
import { motion } from "framer-motion";

export default function DonorPage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  // ✅ Get user location on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => setError("Unable to fetch your location. Showing unsorted results.")
      );
    } else {
      setError("Geolocation not supported by your browser.");
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">
        🔍 Find Blood Donors
      </h1>

      {/* Search Form */}
      <SearchForm
        onResults={setDonors}
        setLoading={setLoading}
        setError={setError}
        userCoords={coords} // ✅ pass lat/lng to form
      />

      {/* Error Message */}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      {/* Donors List */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {loading ? (
          <p className="text-center text-gray-500 col-span-full">Loading donors...</p>
        ) : donors.length > 0 ? (
          donors.map((donor) => <DonorCard key={donor.id} donor={donor} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No donors found. Try changing the filters.
          </p>
        )}
      </div>
    </motion.div>
  );
}
