import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Article } from "@prisma/client";
import Link from "next/link";
import DeleteArticleButton from "./DeleteArticleButton";
import EditIcon from "@mui/icons-material/Edit";

interface ArticleTableProps {
  articles: Article[];
}
export default function ArticleTable({ articles }: ArticleTableProps) {
  return (
    <>
      <TableContainer style={{ marginLeft: "6px" }} component={Paper}>
        <Table
          sx={{
            minWidth: 650,
            backgroundColor: "#dfdccf",
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => (
              <TableRow
                key={article.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" style={{ width: "20%" }}>
                  <span className="line-clamp-1">{article.title}</span>
                </TableCell>
                <TableCell align="right">
                  {new Date(article.createdAt).toDateString()}
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    color: "#938564",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Link href={`/admin/articles-table/edit/${article.id}`}>
                    <EditIcon />
                  </Link>
                  <DeleteArticleButton articleId={article.id} />
                </TableCell>
                <TableCell align="right">
                  <Link
                    href={`/articles/${article.id}`}
                    className="px-4 py-2  text-white   transition"
                    style={{ backgroundColor: "#938564" }}
                  >
                    Read More
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
