import CreateArticleForm from "@/components/forms/CreateArticleForm";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard page for Controlling",
};
export default async function AdminPage() {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get("jsonwebtoken")?.value || "";
  if (!myCookie) {
    redirect("/");
  }
  const payload = verifyTokenForPage(myCookie);
  if (payload?.isAdmin === false) redirect("/");
  return <CreateArticleForm />;
}
