import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./cabin-table.css";
import CabinTableRow from "./CabinTableRow";

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

// eslint-disable-next-line react/prop-types
export default function CabinTable({ cabins }) {
  const cabinsData = Object.values(cabins);

  const rows = cabinsData.map((cabin) => createData(cabin));
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">Cabin</TableCell>
              <TableCell align="right">Capacity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Discount</TableCell>
              <TableCell></TableCell>
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
