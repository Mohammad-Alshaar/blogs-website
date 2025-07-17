"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/utils/constants";
interface CommentInputProps {
  articleId: number;
}
export default function CommentInput({ articleId }: CommentInputProps) {
  const router = useRouter();
  const [text, setText] = useState("");
  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (text == "") return toast.error("comment is required");
    try {
      await axios.post(`${DOMAIN}/api/comments`, { text, articleId });
      router.refresh();
      setText("");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  }
  return (
    <form
      onSubmit={submitHandler}
      className="flex  flex-col md:flex-row my-10 "
    >
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Write Your Comment..."
        className="grow border p-3 focus:outline-0 bg-white"
      />
      <input
        type="submit"
        value="Post Comment"
        className="font-bold text-white p-3 cursor-pointer"
        style={{ backgroundColor: "#938564" }}
      />
    </form>
  );
}
