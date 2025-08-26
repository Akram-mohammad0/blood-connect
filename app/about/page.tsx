export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-red-600 text-center">
          About Blood Connect
        </h1>
        <p className="text-lg mb-4 text-gray-700">
          <strong>Blood Connect</strong> is a community-driven platform dedicated to saving
          lives by bridging the gap between blood donors and recipients. Our mission is to
          make blood donation accessible, reliable, and efficient for everyone in need.
        </p>
        <p className="text-lg mb-4 text-gray-700">
          Through our platform, volunteers and donors can register easily, and those in urgent
          need of blood can quickly find matching donors near their location. We believe that
          every drop of blood donated has the power to save a life and inspire others to do the same.
        </p>
        <p className="text-lg mb-4 text-gray-700">
          Join us in creating a network of hope and compassion, where every donor is a hero and
          every recipient finds the support they need in critical moments.
        </p>
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold text-gray-800">
            Together, we can make a difference — one donation at a time. ❤️
          </p>
        </div>
      </div>
    </div>
  );
}
