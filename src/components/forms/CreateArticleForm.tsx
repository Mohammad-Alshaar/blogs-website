"use client";
import { useState, FormEvent } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/utils/constants";
import ButtonSpinner from "../ButtonSpinner";

export default function CreateArticleForm() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.length) return toast.error("title is required");
    if (!body.length) return toast.error("body is required");
    // استبدله بمنطق المصادقة الفعلي
    console.log("Created:", { title, body });
    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/articles`, { title, body });
      setTitle("");
      setBody("");
      setLoading(false);
      toast.success("New Blog Added");
      router.refresh();
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className=" p-8 rounded-2xl w-full max-w-md m-auto"
    >
      <h2
        className="text-2xl font-bold text-center  mb-6"
        style={{ color: "#70664e" }}
      >
        What&apos;s on your mind?
      </h2>

      <div className="mb-4">
        <label htmlFor="title" className="w-1/4 block  mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border  focus:outline-none  "
        />
      </div>

      <div className="mb-6">
        <label htmlFor="body" className=" w/1/4 block  mb-1">
          Description
        </label>
        <textarea
          name="body"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          className="w-full px-4 py-2 border  focus:outline-none  resize-none"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full cursor-pointer  text-white py-2 rounded-lg  transition"
        style={{ backgroundColor: "#70664e" }}
        disabled={loading}
      >
        {loading ? <ButtonSpinner /> : "Post"}
      </button>
    </form>
  );
}
