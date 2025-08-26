import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blood Connect",
  description: "Find & donate blood quickly and safely",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300`}
      >
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="relative mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12 min-h-[80vh]">
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 sm:p-8 md:p-10 transition-all duration-300">
            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
