import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { parsePhoneNumberFromString } from "libphonenumber-js";

// ✅ Safe phone number validation (+91 added if missing)
function validatePhoneNumber(number: string) {
  if (!number) throw new Error("Contact number is required");

  // Add +91 if missing
  if (!number.startsWith("+")) {
    number = "+91" + number;
  }

  const phoneNumber = parsePhoneNumberFromString(number);
  if (!phoneNumber || !phoneNumber.isValid()) {
    throw new Error("Invalid phone number");
  }

  return phoneNumber.number; // Always returns in E.164 format
}

// ✅ POST: Register a new donor
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      gender,
      bloodType,
      contact,
      location,
      age,
      weight,
      lastDonation,
      email,
      healthIssues,
      notes,
    } = body;

    // Required fields validation
    if (!name || !gender || !bloodType || !contact || !location) {
      return NextResponse.json(
        { error: "Name, Gender, BloodType, Contact, and Location are required" },
        { status: 400 }
      );
    }

    // Validate and normalize contact number
    const validContact = validatePhoneNumber(contact);

    // ✅ Save donor in DB
    const donor = await prisma.donor.create({
      data: {
        name,
        gender,
        bloodType: bloodType.toUpperCase(),
        location,
        contact: validContact,
        age: age ? Number(age) : 0,
        weight: weight ? Number(weight) : 0,
        lastDonation: lastDonation ? new Date(lastDonation) : null,
        email: email || null,
        healthIssues: healthIssues || null,
        notes: notes || null,
      },
    });

    return NextResponse.json(donor, { status: 201 });
  } catch (error: any) {
    console.error("❌ POST Error:", error);

    // Prisma duplicate entry error
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A donor with this contact already exists." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to register donor" },
      { status: 500 }
    );
  }
}

// ✅ GET: Find donors by location + blood type
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location") || "";
    const bloodType = searchParams.get("bloodType") || "";

    if (!location || !bloodType) {
      return NextResponse.json(
        { error: "Location and Blood Type are required" },
        { status: 400 }
      );
    }

    // ✅ Fetch donors from DB
    const donors = await prisma.donor.findMany({
      where: {
        AND: [
          {
            location: {
              contains: location,
              mode: "insensitive",
            },
          },
          {
            bloodType: bloodType.toUpperCase(),
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(donors, { status: 200 });
  } catch (error: any) {
    console.error("❌ GET Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch donors" },
      { status: 500 }
    );
  }
}
