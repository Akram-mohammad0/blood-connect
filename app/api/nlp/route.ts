import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function extractBloodGroup(query: string) {
  const upperQuery = query.toUpperCase();
  return BLOOD_TYPES.find((b) => upperQuery.includes(b)) || "";
}

function extractLocation(query: string) {
  const match = query.match(/in\s+([a-zA-Z\s]+)/i);
  return match ? match[1].trim() : "";
}

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    const bloodGroup = extractBloodGroup(query);
    const location = extractLocation(query);

    if (!bloodGroup || !location) {
      return NextResponse.json(
        { donors: [], bloodGroup, location, error: "Invalid query format." },
        { status: 400 }
      );
    }

    // Fetch full donor details
    const donors = await prisma.donor.findMany({
      where: {
        bloodType: bloodGroup,
        location: { contains: location, mode: "insensitive" },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ donors, bloodGroup, location });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { donors: [], bloodGroup: "", location: "", error: "Server error." },
      { status: 500 }
    );
  }
}
