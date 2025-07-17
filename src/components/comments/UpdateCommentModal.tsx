"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DOMAIN } from "@/utils/constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  border: "2px solid #000",
};

interface UpdateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  commentId: number;
}
export default function UpdateCommentModal({
  open,
  setOpen,
  text,
  commentId,
}: UpdateModalProps) {
  const [updatedText, setUpdatedText] = React.useState(text);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!updatedText.length) return toast.info("please write something");
    try {
      await axios.put(`${DOMAIN}/api/comments/${commentId}`, {
        text: updatedText,
      });
      router.refresh();
      setUpdatedText("");
      handleClose();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="lg:w-1/2 w-full rounded-sm"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#938564",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="flex  flex-col md:flex-row my-5 p-2"
          >
            <input
              value={updatedText}
              onChange={(e) => {
                setUpdatedText(e.target.value);
              }}
              id="standard-basic"
              className="grow border p-3 focus:outline-0 bg-white"
            />
            <button
              type="submit"
              className="font-bold text-white p-3 cursor-pointer"
              style={{ backgroundColor: "#70664e" }}
            >
              Edit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
