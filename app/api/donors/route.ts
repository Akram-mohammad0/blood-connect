import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const location = searchParams.get("location")?.trim() || "";
    const bloodType = searchParams.get("bloodType")?.trim().toUpperCase() || "";
    const available = searchParams.get("available"); // ✅ Added availability param

    // If no location or blood type is provided, return empty array
    if (!location || !bloodType) {
      console.log("⚠️ Missing search params:", { location, bloodType });
      return NextResponse.json([], { status: 200 });
    }

    console.log("🔍 Searching donors =>", { location, bloodType, available });

    const donors = await prisma.donor.findMany({
      where: {
        bloodType,
        location: {
          contains: location,
          mode: "insensitive",
        },
        // ✅ Filter only available donors if explicitly requested
        ...(available === "true" ? { available: true } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    // ✅ Remove duplicate donors based on unique ID
    const uniqueDonors = Array.from(
      new Map(donors.map((donor) => [donor.id, donor])).values()
    );

    console.log(`✅ Found ${uniqueDonors.length} unique donors`);

    return NextResponse.json(uniqueDonors, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching donors:", error);
    return NextResponse.json(
      { message: "Server error fetching donors" },
      { status: 500 }
    );
  }
}
