import LoginForm from "@/components/forms/LoginForm";
import type { Metadata } from "next";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
};

export default async function LoginPage() {
  // const cookieStore = await cookies();
  // const myCookie = cookieStore.get("jsonwebtoken")?.value;
  // if (myCookie) {
  //   redirect("/");
  // }
  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
