import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

import "./CabinTable.css";

function createData({ name, maxCapacity, regularPrice, discount, image }) {
  return { name, maxCapacity, regularPrice, discount, image };
}

export default function CabinTable(cabins) {
  const cabinsData = Object.values(cabins)[0];

  const rows = cabinsData.map((cabin) => createData(cabin));
  return (
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
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right" className="cabin-image-container">
                <img
                  src={row.image}
                  alt="cabin-image"
                  className="cabin-image"
                />
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.maxCapacity}</TableCell>
              <TableCell align="right">{row.regularPrice}</TableCell>
              <TableCell align="right">{row.discount}</TableCell>
              <TableCell align="right">
                <Button type="small">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
