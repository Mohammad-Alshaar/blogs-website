"use client";
import React from "react";
import DeleteDialog from "../comments/DeleteDialog";
import DeleteIcon from "@mui/icons-material/Delete";
interface DeleteCommentButtonProps {
  commentId: number;
}
export default function DeleteCommentButton({
  commentId,
}: DeleteCommentButtonProps) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  return (
    <>
      <button
        onClick={handleClickOpenDialog}
        style={{ color: "#938564", cursor: "pointer" }}
      >
        <DeleteIcon />
      </button>
      <DeleteDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        commentId={commentId}
      />
    </>
  );
}
