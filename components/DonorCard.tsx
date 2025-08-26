"use client";

import { motion } from "framer-motion";
import { Droplet, MapPin, Phone, MessageCircle, User, Mail, Activity, Calendar, Heart } from "lucide-react";

type Donor = {
  id: number;
  name: string;
  bloodType: string;
  gender?: string;
  location: string;
  contact: string;
  email?: string;
  age?: number;
  weight?: number;
  healthIssues?: string;
  notes?: string;
  lastDonation?: string | null;
  createdAt: string;
};

export default function DonorCard({ donor }: { donor: Donor }) {
  const handleCall = () => {
    window.open(`tel:${donor.contact}`);
  };

  const handleWhatsApp = () => {
    const message = `Hi ${donor.name}, I found your details on the Blood Donor app. Are you available for blood donation?`;
    window.open(`https://wa.me/${donor.contact}?text=${encodeURIComponent(message)}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-5 border hover:shadow-xl transition-all"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <User className="w-5 h-5 text-red-500" />
            {donor.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {donor.gender || "Not specified"}
          </p>
        </div>

        <span className="bg-red-100 text-red-600 dark:bg-red-700 dark:text-white px-3 py-1 rounded-lg font-semibold text-lg">
          <Droplet className="w-4 h-4 inline-block mr-1" />
          {donor.bloodType}
        </span>
      </div>

      {/* Location & Contact */}
      <div className="flex items-center mt-3 text-gray-600 dark:text-gray-300 gap-2">
        <MapPin className="w-5 h-5 text-red-500" />
        <span>{donor.location}</span>
      </div>

      {donor.email && (
        <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300 gap-2">
          <Mail className="w-5 h-5 text-blue-500" />
          <span>{donor.email}</span>
        </div>
      )}

      {/* Extra Info */}
      <div className="mt-3 grid grid-cols-2 gap-3 text-gray-700 dark:text-gray-300 text-sm">
        {donor.age && (
          <p className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-500" /> Age: {donor.age}
          </p>
        )}
        {donor.weight && (
          <p className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-500" /> Weight: {donor.weight}kg
          </p>
        )}
        {donor.healthIssues && (
          <p className="col-span-2 text-gray-600 dark:text-gray-300">
            <strong>Health Issues:</strong> {donor.healthIssues}
          </p>
        )}
        {donor.notes && (
          <p className="col-span-2 italic text-gray-500">"{donor.notes}"</p>
        )}
        {donor.lastDonation && (
          <p className="col-span-2 flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Calendar className="w-4 h-4 text-purple-500" />
            Last Donation: {new Date(donor.lastDonation).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={handleCall}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-xl shadow-md transition-all"
        >
          <Phone className="w-5 h-5" />
          Call
        </button>

        <button
          onClick={handleWhatsApp}
          className="flex items-center gap-2 bg-[#25D366] hover:bg-green-600 text-white font-medium px-4 py-2 rounded-xl shadow-md transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp
        </button>
      </div>

      {/* Registered Date */}
      <p className="mt-4 text-xs text-gray-400">
        Registered on {new Date(donor.createdAt).toLocaleDateString()}
      </p>
    </motion.div>
  );
}
