"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import styles from "./header.module.css";
export default function LogoutButton() {
  const router = useRouter();
  async function logoutHandler() {
    try {
      await axios.post(`${DOMAIN}/api/users/logout`);
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.warning("Something Went Wrong!");
    }
  }
  return (
    <button
      onClick={logoutHandler}
      className={`px-4 py-2  text-white cursor-pointer  transition ${styles.button}`}
    >
      Logout
    </button>
  );
}
