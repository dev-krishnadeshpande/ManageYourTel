import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import CabinTableRow from "./CabinTableRow";
import "./cabin-table.css";

function createData({
  id,
  name,
  maxCapacity,
  regularPrice,
  discount,
  description,
  image,
}) {
  return { id, name, maxCapacity, regularPrice, discount, description, image };
}

export default function CabinTable({ cabins }) {
  const cabinsData = Object.values(cabins);

  const rows = cabinsData.map((cabin) => createData(cabin));
  return (
    <>
      <TableContainer component={Paper} sx={{ width: "80%", margin: "auto" }}>
        <Table aria-label="simple table">
          <TableHead className="table-header">
            <TableRow>
              <TableCell
                align="center"
                sx={{ fontSize: "1.4rem", textAlign: "center" }}
              ></TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "1.4rem", textAlign: "center" }}
              >
                Cabin
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "1.4rem", textAlign: "center" }}
              >
                Capacity
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "1.4rem", textAlign: "center" }}
              >
                Price
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "1.4rem", textAlign: "center" }}
              >
                Discount
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "1.4rem", textAlign: "center" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <CabinTableRow key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
