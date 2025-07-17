import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import Header from "@/components/header/Header";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blogs",
  description: "Blogs about my life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <Header />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <main>{children}</main>
        <footer className="py-10 flex justify-center items-center relative bottom-0 w-full m-auto z-0">
          <p className="px-2">All rights reserved&copy;</p>
          <div className="flex gap-3">
            <FacebookIcon className="cursor-pointer hover:text-yellow-950 transition" />
            <InstagramIcon className="cursor-pointer hover:text-yellow-950 transition" />
            <XIcon className="cursor-pointer hover:text-yellow-950 transition" />
          </div>
        </footer>
      </body>
    </html>
  );
}
