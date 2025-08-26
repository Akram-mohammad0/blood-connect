import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function handler(event, context) {
  try {
    const donors = await prisma.donor.findMany();
    return {
      statusCode: 200,
      body: JSON.stringify(donors),
    };
  } catch (error) {
    return { statusCode: 500, body: error.message };
  }
}
