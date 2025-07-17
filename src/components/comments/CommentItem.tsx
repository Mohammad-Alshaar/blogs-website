"use client";
import { CommentWithUser } from "@/utils/type";
import React from "react";
import UpdateCommentModal from "./UpdateCommentModal";
import DeleteDialog from "./DeleteDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
interface CommentItemProps {
  comment: CommentWithUser;
  userId: number | undefined;
}
export default function CommentItem({ comment, userId }: CommentItemProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div
          className="flex justify-between p-2  w-full mx-auto my-4 text-white"
          style={{ backgroundColor: "#938564" }}
        >
          <div className="right flex flex-col gap-4">
            <strong>{comment.user.username}</strong>
            <p>{comment.text}</p>
          </div>
          <div className="lift flex flex-col justify-between gap-4">
            <span className="text-white p-2 text-xs ">
              {new Date(comment.createdAt).toDateString()}
            </span>
            {userId && userId == comment.userId && (
              <div className="flex justify-end">
                <button
                  onClick={handleOpen}
                  className=" text-white p-2 rounded-sm cursor-pointer"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={handleClickOpenDialog}
                  className=" text-white p-2 rounded-sm cursor-pointer"
                >
                  <DeleteIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      <UpdateCommentModal
        open={open}
        setOpen={setOpen}
        text={comment.text}
        commentId={comment.id}
      />
      <DeleteDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        commentId={comment.id}
      />
    </>
  );
}
