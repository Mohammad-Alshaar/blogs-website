import RegisterForm from "@/components/forms/RegisterForm";
import { Metadata } from "next";
// import { redirect } from "next/navigation";
// import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Register",
  description: "Register page",
};
export default async function RegisterPage() {
  // const cookieStore = await cookies();
  // const myCookie = cookieStore.get("jsonwebtoken")?.value;
  // if (myCookie) {
  //   redirect("/");
  // }
  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center  px-4">
      <RegisterForm />
    </div>
  );
}
