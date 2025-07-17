"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import ButtonSpinner from "../ButtonSpinner";
import Image from "next/image";
import LoginPhoto from "../../../public/post-free-06-1024x750.jpg";
export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.length) return toast.error("email is required");
    if (!password.length) return toast.error("password is required");
    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/users/login`, { email, password });
      router.replace("/");
      setLoading(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response.data.message);
      setLoading(false);
    }
    console.log("Logging in:", { email, password });
  };
  return (
    <form
      onSubmit={handleLogin}
      className="bg-white p-8 rounded-2xl shadow-md w-full lg:mx-20  flex justify-between gap-5 md:flex-row flex-col"
    >
      <Image
        src={LoginPhoto}
        alt="login"
        height={300}
        priority
        className="rounded-2xl hidden md:block"
      />
      <div className="grow md:px-10 ">
        <h2 className="text-2xl font-bold text-center  mb-6">
          Log in to your account
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="w-1/4 block  mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none  "
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className=" w/1/4 block  mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none "
          />
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer  text-white py-2 rounded-lg  transition"
          style={{ backgroundColor: "#70664e" }}
          disabled={loading}
        >
          {loading ? <ButtonSpinner /> : "Login"}
        </button>

        <p className="text-sm text-center  mt-4">
          Do not have an account?{" "}
          <Link href="/register" className=" hover:underline">
            Register
          </Link>
        </p>
      </div>
    </form>
  );
}
