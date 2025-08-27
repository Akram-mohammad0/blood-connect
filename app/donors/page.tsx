import { Donor } from "@/types";

interface DonorCardProps {
  donor: Donor & { distance?: number; callLink?: string; whatsappLink?: string };
}

export default function DonorCard({ donor }: DonorCardProps) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition duration-200">
      <h2 className="text-xl font-bold">{donor.name}</h2>
      <p>
        Blood Type: <span className="font-semibold">{donor.bloodType}</span>
      </p>
      <p>Location: {donor.location}</p>

      {donor.distance !== undefined && (
        <p>Distance: {donor.distance.toFixed(2)} km</p>
      )}

      {donor.healthIssues && donor.healthIssues.length > 0 && (
        <p>
          Health Issues:{" "}
          {Array.isArray(donor.healthIssues)
            ? donor.healthIssues.join(", ")
            : donor.healthIssues}
        </p>
      )}

      <div className="mt-2 flex gap-2">
        {donor.callLink && (
          <a
            href={donor.callLink}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Call
          </a>
        )}
        {donor.whatsappLink && (
          <a
            href={donor.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-700 text-white px-3 py-1 rounded"
          >
            WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
