import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import BookingTableRow from "./BookingTableRow";
import "./bookingTable.css";

function createData({
  id,
  cabins,
  guests,
  created_at,
  startDate,
  endDate,
  status,
  totalPrice,
  numNights,
}) {
  const { name: cabinName } = cabins;
  const { fullName, email } = guests;

  return {
    id,
    cabinName,
    fullName,
    email,
    created_at,
    startDate,
    endDate,
    status,
    totalPrice,
    numNights,
  };
}

export default function BookingTable({ bookings }) {
  const bookingsData = Object.values(bookings);

  const rows = bookingsData.map((booking) => createData(booking));

  return (
    <>
      <TableContainer component={Paper} sx={{ width: "86%", margin: "auto" }}>
        <Table aria-label="simple table">
          <TableHead className="table-header">
            <TableRow>
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
                Guest
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "1.4rem", textAlign: "center" }}
              >
                Dates
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "1.4rem", textAlign: "center" }}
              >
                Status
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "1.4rem", textAlign: "center" }}
              >
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <BookingTableRow key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
