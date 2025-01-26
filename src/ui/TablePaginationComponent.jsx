import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import { useSearchParams } from "react-router-dom";

export default function TablePaginationComponent({ totalRowCount }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPage = !searchParams.get("page")
    ? 0
    : Number(searchParams.get("page"));
  const [page, setPage] = React.useState(selectedPage);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={totalRowCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{
        "& .MuiTablePagination-selectLabel": {
          fontSize: "1.5rem",
        },
        "& .MuiTablePagination-selectIcon": {
          fontSize: "1.5rem",
        },
        "& .MuiTablePagination-input": {
          fontSize: "1.5rem",
        },
        "& .MuiTablePagination-displayedRows": {
          fontSize: "1.5rem",
        },
        "& 	.MuiTablePagination-actions": {
          fontSize: "1.5rem",
        },
      }}
    />
  );
}
