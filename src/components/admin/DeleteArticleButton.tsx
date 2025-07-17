"use client";
import React from "react";
import DeleteArticleDialog from "./DeleteArticleDialog";
import DeleteIcon from "@mui/icons-material/Delete";
interface DeleteArticleButtonProps {
  articleId: number;
}
export default function DeleteArticleButton({
  articleId,
}: DeleteArticleButtonProps) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  return (
    <>
      <button onClick={handleClickOpenDialog} className="cursor-pointer">
        <DeleteIcon />
      </button>
      <DeleteArticleDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        articleId={articleId}
      />
    </>
  );
}
