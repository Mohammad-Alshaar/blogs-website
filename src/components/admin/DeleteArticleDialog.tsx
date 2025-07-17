"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";

interface DeleteDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  articleId: number;
}

export default function DeleteArticleDialog({
  openDialog,
  setOpenDialog,
  articleId,
}: DeleteDialogProps) {
  const router = useRouter();
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`${DOMAIN}/api/articles/${articleId}`);
      router.refresh();
      toast.success("Article Deleted");
      handleCloseDialog();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };
  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Article"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this Article?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            <span className="px-4 py-2  text-white   transition bg-yellow-950">
              Undo
            </span>
          </Button>
          <Button onClick={handleDelete} autoFocus>
            <span
              className="px-4 py-2  text-white   transition"
              style={{ backgroundColor: "#70664e" }}
            >
              Confirm
            </span>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
