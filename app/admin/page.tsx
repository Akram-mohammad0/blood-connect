"use client";

import { useEffect, useState } from "react";

interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  bloodType: string;
  gender: string;
  location: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingDonor, setEditingDonor] = useState<Donor | null>(null);

  // ✅ fetch donors
  const fetchDonors = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/donors", {
        headers: { "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY! },
      });
      const data = await res.json();
      setDonors(data);
    } catch (err) {
      console.error("Failed to fetch donors", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ delete donor
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this donor?")) return;

    try {
      const res = await fetch(`/api/donors?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY! },
      });

      if (res.ok) {
        const deleted = await res.json();
        alert(`Deleted donor: ${deleted.name}`);
        fetchDonors(); // 🔄 refresh after delete
      } else {
        alert("Failed to delete donor");
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // ✅ save edited donor
  const handleSave = async () => {
    if (!editingDonor) return;

    try {
      const res = await fetch("/api/donors", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY!,
        },
        body: JSON.stringify(editingDonor),
      });

      if (res.ok) {
        const updated = await res.json();
        alert(`Updated donor: ${updated.name}`);
        setEditingDonor(null); // close modal
        fetchDonors(); // 🔄 refresh
      } else {
        alert("Failed to update donor");
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛠 Admin Dashboard</h1>
      {loading ? (
        <p>Loading donors...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Blood</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor.id} className="border">
                <td className="p-2">{donor.name}</td>
                <td className="p-2">{donor.email}</td>
                <td className="p-2">{donor.phone}</td>
                <td className="p-2">{donor.bloodType}</td>
                <td className="p-2">{donor.gender}</td>
                <td className="p-2">{donor.location}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => setEditingDonor(donor)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(donor.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ✅ Edit Modal */}
      {editingDonor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Donor</h2>

            <input
              type="text"
              value={editingDonor.name}
              onChange={(e) =>
                setEditingDonor({ ...editingDonor, name: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
              placeholder="Name"
            />
            <input
              type="email"
              value={editingDonor.email}
              onChange={(e) =>
                setEditingDonor({ ...editingDonor, email: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
              placeholder="Email"
            />
            <input
              type="text"
              value={editingDonor.phone}
              onChange={(e) =>
                setEditingDonor({ ...editingDonor, phone: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
              placeholder="Phone"
            />
            <input
              type="text"
              value={editingDonor.bloodType}
              onChange={(e) =>
                setEditingDonor({ ...editingDonor, bloodType: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
              placeholder="Blood Type"
            />
            <input
              type="text"
              value={editingDonor.gender}
              onChange={(e) =>
                setEditingDonor({ ...editingDonor, gender: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
              placeholder="Gender"
            />
            <input
              type="text"
              value={editingDonor.location}
              onChange={(e) =>
                setEditingDonor({ ...editingDonor, location: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
              placeholder="Location"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditingDonor(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
