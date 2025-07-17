// components/Header.js
import Link from "next/link";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import LogoutButton from "./LogoutButton";
import styles from "./header.module.css";
import FlyoutMenu from "./Accordon";
export default async function Header() {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get("jsonwebtoken")?.value || "";
  const payload = verifyTokenForPage(myCookie);
  return (
    <div className="header">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className={`text-2xl font-bold  ${styles.logo}`}>
          BLOG
        </Link>

        {/* Navigation Links */}
        <nav className={`hidden md:flex space-x-9 `}>
          <Link href="/" className={`${styles.link} transition`}>
            Home
          </Link>
          <Link
            href="/articles?pageNumber=1"
            className={`${styles.link} transition`}
          >
            Articles
          </Link>
          <Link href="/about" className={`${styles.link} transition`}>
            About
          </Link>
          {payload?.isAdmin && (
            <Link href="/admin" className={`${styles.link} transition`}>
              Admin Dashboard
            </Link>
          )}
        </nav>
        <div className="block  md:hidden"></div>
        {/* Buttons */}
        <div className="space-x-3">
          {payload ? (
            <>
              <strong>{payload.username}</strong>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`px-4 py-2  text-white   transition ${styles.button}`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`px-4 py-2  text-white   transition ${styles.button}`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      <FlyoutMenu />
    </div>
  );
}
