import Link from "next/link";
import { LayoutDashboard, Newspaper, MessageCircle } from "lucide-react";

export default function Sidebar() {
  const links = [
    {
      href: "/admin",
      label: "Admin Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      href: "/admin/articles-table?pageNumber=1",
      label: "Articles-table",
      icon: <Newspaper size={20} />,
    },
    {
      href: "/admin/comments-table",
      label: "Comments-table",
      icon: <MessageCircle size={20} />,
    },
  ];

  return (
    <aside className=" h-[calc(100vh-56px)] w-16 md:w-64  px-2 md:px-6 py-6 space-y-8 fixed top-56px left-0 z-40">
      <h2
        className="hidden md:block text-2xl font-bold mb-8"
        style={{ color: "#70664e" }}
      >
        Dashboard
      </h2>

      <nav className="space-y-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 hover:no-underline  hover:text-yellow-900 group"
          >
            <span className="text-center w-full hover:no-underline md:w-auto">
              {link.icon}
            </span>
            <span className="hidden md:inline-block hover:no-underline group-hover:underline">
              {link.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
