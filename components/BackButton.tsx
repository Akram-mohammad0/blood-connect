"use client";
import { useRouter } from "next/navigation";

export default function BackButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className={`btn btn-outline ${className}`}>← Back</button>
  );
}
