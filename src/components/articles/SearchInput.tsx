"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
export default function SearchInput() {
  const [text, setText] = useState("");
  const router = useRouter();
  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    console.log({ text });
    router.push(`/articles/search?searchText=${text}`);
  }
  return (
    <form onSubmit={submitHandler} className="flex mt-20 lg:m-20">
      <input
        type="search"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Search..."
        className="border focus:border-0 focus:outline  grow p-3"
      />
    </form>
  );
}
