import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-5xl font-extrabold text-red-600">Blood Connect</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">Find donors near you or register to save a life.</p>
      <div className="flex justify-center gap-3">
        <Link href="/register" className="btn btn-red">Register as Donor</Link>
        <Link href="/donors" className="btn btn-outline">Find Donors</Link>
        <Link href="/donors?quick=O-" className="btn btn-ghost">Quick Find O-</Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Feature title="Verified Data" text="Clean forms & validation keep the list reliable." />
        <Feature title="Fast Search" text="Filter by blood type, location & sort." />
        <Feature title="One-tap Contact" text="Call, WhatsApp, share, copy number." />
      </div>
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="card animate-pop">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{text}</p>
    </div>
  );
}
