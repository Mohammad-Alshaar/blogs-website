"use client";
import Link from "next/link";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className=" p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className=" mb-6">
          Something went wrong. Please try again later or return to the
          homepage.
        </p>
        <p className="text-red-500 font-bold mb-6">
          Error Message: {error.message}
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="px-4 py-2 bg-yellow-950 text-white rounded-lg  transition"
          >
            Back to home page
          </Link>
          <button
            onClick={() => reset()}
            className="px-4 py-2 border  text-white rounded-md bg-yellow-900 transition cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
