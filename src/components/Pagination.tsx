import Link from "next/link";
import React from "react";
interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}
export default function Pagination({
  pages,
  pageNumber,
  route,
}: PaginationProps) {
  const pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }
  const prev = pageNumber - 1;
  const next = pageNumber + 1;
  return (
    <div className="flex justify-center items-center py-30 px-10 lg:p-30 relative z-10">
      {pageNumber !== 1 && (
        <Link
          href={`${route}?pageNumber=${prev}`}
          className="w-10 h-10 pr-7 flex justify-center items-center cursor-pointer"
        >
          Prev
        </Link>
      )}

      {pagesArray.map((page) => {
        return (
          <Link
            href={`${route}?pageNumber=${page}`}
            key={page}
            className={
              pageNumber == page
                ? ` w-10 h-10 flex justify-center items-center cursor-pointer bg-yellow-950 text-white`
                : ` w-10 h-10 flex justify-center items-center cursor-pointer`
            }
          >
            {page}
          </Link>
        );
      })}

      {pageNumber !== pages && (
        <Link
          href={`${route}?pageNumber=${next}`}
          className="w-10 h-10 pl-7 flex justify-center items-center cursor-pointer"
        >
          Next
        </Link>
      )}
    </div>
  );
}
