"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Mic, X } from "lucide-react";

// Import the same DonorCard component you use in FindDonors
import DonorCard from "./DonorCard";

type Donor = {
  id: number;
  name: string;
  bloodType: string;
  gender?: string;
  location: string;
  age?: number;
  weight?: number;
  contact: string;
  email?: string;
  healthIssues?: string;
  notes?: string;
  lastDonation?: string;
  createdAt: string;
};

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ type: "user" | "bot"; text: string }[]>([]);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, donors]);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const speech = event.results[0][0].transcript;
        setInput(speech);
        handleSend(speech);
        setListening(false);
      };

      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const handleSend = async (text?: string) => {
    const query = text?.trim() || input.trim();
    if (!query) return;

    setMessages((prev) => [...prev, { type: "user", text: query }]);
    setInput("");
    setDonors([]);

    try {
      const res = await fetch("/api/nlp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();

      if (data.donors?.length) {
        setDonors(data.donors); // Same as Find Donors
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: `Found ${data.donors.length} donor${
              data.donors.length > 1 ? "s" : ""
            } for ${data.bloodGroup} in ${data.location}.`,
          },
        ]);

        const utter = new SpeechSynthesisUtterance(
          `Found ${data.donors.length} donors for ${data.bloodGroup} blood in ${data.location}.`
        );
        speechSynthesis.speak(utter);
      } else {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "No donors found for your request." },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Error fetching donors." },
      ]);
    }
  };

  const handleMic = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.start();
    setListening(true);
  };

  return (
    <div className="w-full h-full p-6 flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-red-600">Blood Donor Chatbot</h1>
        <a
          href="/"
          className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          <X className="w-4 h-4" /> Back
        </a>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-inner flex flex-col gap-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[70%] p-3 rounded-lg ${
              msg.type === "user"
                ? "self-end bg-red-600 text-white"
                : "self-start bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {/* Donor list same as FindDonors */}
        {donors.length > 0 &&
          donors.map((donor) => <DonorCard key={donor.id} donor={donor} />)}

        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <div className="flex gap-2 mt-3">
        <input
          type="text"
          placeholder="Type your request..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={() => handleSend()}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          <Send className="w-4 h-4" />
        </button>
        <button
          onClick={handleMic}
          className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ${
            listening ? "animate-pulse" : ""
          }`}
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
