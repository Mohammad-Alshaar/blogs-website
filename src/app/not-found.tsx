import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found 404",
  description: "Not Found Page 404",
};
export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="text-center  p-8 rounded-md  max-w-md">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold  mb-2">Page Not Found</h2>
        <p className="-600 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-yellow-950 text-white rounded-md  transition"
        >
          Back To Home Page
        </Link>
      </div>
    </div>
  );
}
