-- CreateTable
CREATE TABLE "Donor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "bloodType" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT,
    "healthIssues" TEXT,
    "notes" TEXT,
    "lastDonation" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
