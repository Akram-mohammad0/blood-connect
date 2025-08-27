"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BackButton from "../../../components/BackButton";

export const dynamic = "force-dynamic"; // ✅ Ensures runtime rendering

function SuccessContent() {
  const params = useSearchParams();
  const name = params.get("name") || "Donor";

  return (
    <div className="relative">
      {/* Lightweight confetti */}
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="confetti"
          style={{
            left: `${(i * 4) % 100}%`,
            animationDelay: `${(i % 6) * 0.2}s`,
          } as any}
        />
      ))}

      <div className="card mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold text-red-600">Thank you, {name}!</h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Your details have been saved. You might be someone’s reason to smile today.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link className="btn btn-red" href="/donors">
            View Donors
          </Link>
          <Link className="btn btn-outline" href="/">
            Go Home
          </Link>
        </div>
        <div className="mt-6">
          <BackButton />
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
