import Sidebar from "@/components/sidebar/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidebar />
      <main className=" md:ml-64 flex-1 p-6 min-h-[calc(100vh+56px)]">
        {children}
      </main>
    </div>
  );
}
