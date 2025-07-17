import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Comment } from "@prisma/client";
import DeleteCommentButton from "./DeleteCommentButton";

interface CommentsTableProps {
  comments: Comment[];
}
export default function CommentsTable({ comments }: CommentsTableProps) {
  return (
    <>
      <TableContainer style={{ marginLeft: "6px" }} component={Paper}>
        <Table
          sx={{ minWidth: 650, backgroundColor: "#dfdccf" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Comment</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments.map((comment) => (
              <TableRow
                key={comment.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" style={{ width: "33%" }}>
                  <span className="line-clamp-1">{comment.text}</span>
                </TableCell>
                <TableCell align="right">
                  {new Date(comment.createdAt).toDateString()}
                </TableCell>
                <TableCell align="right">
                  {/* <Link href={`/admin/articles-table/edit/${article.id}`}>
                    Edit
                  </Link> */}
                  <DeleteCommentButton commentId={comment.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
