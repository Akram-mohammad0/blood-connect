import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { parsePhoneNumberFromString } from "libphonenumber-js";

// ✅ Haversine formula for distance calculation
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    0.5 - Math.cos(dLat) / 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      (1 - Math.cos(dLon)) / 2;

  return R * 2 * Math.asin(Math.sqrt(a));
}

// ✅ Validate phone number function
function validatePhoneNumber(number: string, country?: string) {
  const phoneNumber = parsePhoneNumberFromString(number, country);
  if (!phoneNumber || !phoneNumber.isValid()) {
    throw new Error("Invalid phone number");
  }
  return phoneNumber.format("E.164"); // standardized format for DB
}

// ✅ Register Donor
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate phone number before saving
    const validContact = validatePhoneNumber(body.contact, body.countryCode || "IN"); // default India

    const donor = await prisma.donor.create({
      data: {
        name: body.name,
        gender: body.gender,
        age: body.age,
        bloodType: body.bloodType,
        weight: body.weight,
        lastDonation: body.lastDonation ? new Date(body.lastDonation) : null,
        location: body.location,
        latitude: body.latitude,
        longitude: body.longitude,
        email: body.email,
        contact: validContact,
        healthIssues: body.healthIssues,
        notes: body.notes,
      },
    });

    return NextResponse.json(donor, { status: 201 });
  } catch (error: any) {
    console.error("❌ Error creating donor:", error);
    return NextResponse.json({ error: error.message || "Failed to register donor" }, { status: 400 });
  }
}

// ✅ Search Donors
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");
    const bloodType = searchParams.get("bloodType");
    const userLat = searchParams.get("lat");
    const userLng = searchParams.get("lng");

    if (!bloodType) {
      return NextResponse.json({ error: "Missing blood type" }, { status: 400 });
    }

    // Fetch donors by blood type (and optional location match)
    let donors = await prisma.donor.findMany({
      where: {
        bloodType: { equals: bloodType, mode: "insensitive" },
        ...(location ? { location: { equals: location, mode: "insensitive" } } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    // Sort by nearest if coordinates provided
    if (userLat && userLng) {
      const lat = parseFloat(userLat);
      const lng = parseFloat(userLng);

      donors = donors
        .map((d) => ({ ...d, distance: getDistance(lat, lng, d.latitude, d.longitude) }))
        .sort((a, b) => a.distance - b.distance);
    }

    // Add ready-to-use call and WhatsApp links
    donors = donors.map((d) => ({
      ...d,
      callLink: `tel:${d.contact}`,
      whatsappLink: `https://wa.me/${d.contact.replace(/\D/g, "")}`,
    }));

    return NextResponse.json(donors, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching donors:", error);
    return NextResponse.json({ error: "Failed to fetch donors" }, { status: 500 });
  }
}
