"use client";
import { useState, FormEvent } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/utils/constants";
import { Article } from "@prisma/client";
interface EditArticleFormProps {
  article: Article;
}
export default function EditArticleForm({ article }: EditArticleFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState<string>(article.title);
  const [body, setBody] = useState<string>(article.body);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.length) return toast.error("title is required");
    if (!body.length) return toast.error("body is required");
    try {
      await axios.put(`${DOMAIN}/api/articles/${article.id}`, { title, body });
      setTitle("");
      setBody("");
      toast.success("Article Updated");
      router.push("/admin/articles-table?pageNumber=1");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="  p-8 rounded-2xl w-full max-w-md m-auto"
    >
      <h2
        className="text-3xl font-bold text-center  mb-6"
        style={{ color: "#70664e" }}
      >
        Edit Article
      </h2>

      <div className="mb-4">
        <label htmlFor="title" className="w-1/4 block text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border  focus:outline-none"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="body" className=" w/1/4 block text-gray-700 mb-1">
          Body
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
      >
        Edit
      </button>
    </form>
  );
}
