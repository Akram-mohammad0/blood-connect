"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const BLOOD_TYPES = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];
const GENDERS = ["Male", "Female", "Other"];

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    gender: "",
    age: "",
    bloodType: "",
    weight: "",
    lastDonation: "",
    location: "",
    email: "",
    contact: "",
    healthIssues: "",
    notes: "",
  });
  const [error, setError] = useState<string | null>(null);

  const onChange = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    if (!form.name.trim()) return "Name is required.";
    if (!form.gender) return "Gender is required.";
    if (!form.age || Number(form.age) < 18 || Number(form.age) > 60)
      return "Age must be between 18 and 60.";
    if (!form.bloodType) return "Blood type is required.";
    if (!form.weight || Number(form.weight) < 45)
      return "Weight must be at least 45 kg.";
    if (!form.location.trim()) return "Location is required.";
    if (!form.contact.trim() || form.contact.length < 10)
      return "Valid contact number is required.";
    return null;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/donors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          gender: form.gender,
          age: Number(form.age),
          bloodType: form.bloodType.toUpperCase(),
          weight: Number(form.weight),
          lastDonation: form.lastDonation ? new Date(form.lastDonation) : null,
          location: form.location.trim(),
          email: form.email.trim() || null,
          contact: form.contact.trim(),
          healthIssues: form.healthIssues.trim() || null,
          notes: form.notes.trim() || null,
          // ✅ Removed latitude & longitude
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to register donor");

      router.push(`/register/success?name=${encodeURIComponent(data.name)}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () =>
    setForm({
      name: "",
      gender: "",
      age: "",
      bloodType: "",
      weight: "",
      lastDonation: "",
      location: "",
      email: "",
      contact: "",
      healthIssues: "",
      notes: "",
    });

  return (
    <form
      onSubmit={submit}
      className="card space-y-4 p-6 shadow-lg rounded-lg bg-white dark:bg-gray-900 border"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-red-600">Register as Donor</h2>
        <button type="button" onClick={reset} className="text-sm text-gray-500 hover:text-red-600">
          Reset
        </button>
      </div>

      {/* Name */}
      <input className="input" placeholder="Full Name *" value={form.name} onChange={(e) => onChange("name", e.target.value)} required />

      {/* Gender */}
      <select className="select" value={form.gender} onChange={(e) => onChange("gender", e.target.value)} required>
        <option value="">Select Gender *</option>
        {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
      </select>

      {/* Age */}
      <input className="input" type="number" placeholder="Age (18-60)" value={form.age} onChange={(e) => onChange("age", e.target.value)} required min={18} max={60} />

      {/* Blood Type */}
      <select className="select" value={form.bloodType} onChange={(e) => onChange("bloodType", e.target.value)} required>
        <option value="">Select Blood Type *</option>
        {BLOOD_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
      </select>

      {/* Weight */}
      <input className="input" type="number" placeholder="Weight (kg)" value={form.weight} onChange={(e) => onChange("weight", e.target.value)} required min={45} />

      {/* Last Donation */}
      <label className="block text-sm text-gray-600">Last Donation Date (optional)</label>
      <input className="input" type="date" value={form.lastDonation} onChange={(e) => onChange("lastDonation", e.target.value)} />

      {/* Location */}
      <input className="input" placeholder="City / Area *" value={form.location} onChange={(e) => onChange("location", e.target.value)} required />

      {/* Email */}
      <input className="input" type="email" placeholder="Email (optional)" value={form.email} onChange={(e) => onChange("email", e.target.value)} />

      {/* Contact */}
      <input className="input" placeholder="Contact Number *" value={form.contact} onChange={(e) => onChange("contact", e.target.value)} required />

      {/* Health Issues */}
      <textarea className="input" placeholder="Any health issues / medications?" value={form.healthIssues} onChange={(e) => onChange("healthIssues", e.target.value)} />

      {/* Notes */}
      <textarea className="input" placeholder="Notes (availability, preferred time, etc.)" value={form.notes} onChange={(e) => onChange("notes", e.target.value)} />

      {/* Error */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Buttons */}
      <div className="flex gap-2">
        <button disabled={loading} className="btn btn-red flex items-center gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Saving..." : "Submit"}
        </button>
        <a href="tel:+910000000000" className="btn btn-outline">Emergency Call</a>
      </div>
    </form>
  );
}
