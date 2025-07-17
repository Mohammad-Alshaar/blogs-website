import React from "react";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Comment } from "@prisma/client";
import CommentsTable from "@/components/admin/CommentsTable";
import { getAllComments } from "@/apiCalls/adminApiCall";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comments Table",
  description: "Admin Dashboard Commments Table page",
};
export default async function CommentsTablePage() {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get("jsonwebtoken")?.value || "";
  if (!myCookie) {
    redirect("/");
  }
  const payload = verifyTokenForPage(myCookie);
  if (payload?.isAdmin === false) redirect("/");

  const comments: Comment[] = await getAllComments(myCookie);
  return (
    <div>
      <CommentsTable comments={comments} />
    </div>
  );
}
