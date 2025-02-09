import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Box, TextField } from "@mui/material";
import { checkAvailableCabins } from "../../services/apiCabins";
import { useState } from "react";
import CabinTable from "../cabins/CabinTable";

export default function CheckAvailability() {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, "day"));
  const [availableCabins, setAvailableCabins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    const start = startDate.format("YYYY-MM-DD");
    const end = endDate.format("YYYY-MM-DD");

    setIsLoading(true);
    const availableCabinsData = await checkAvailableCabins(start, end);
    setAvailableCabins(availableCabinsData);
    setIsLoading(false);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button
            disabled={isLoading}
            variant="contained"
            color="primary"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
      </LocalizationProvider>

      {availableCabins?.length > 0 ? (
        !isLoading && availableCabins?.length > 0 ? (
          <>
            <h3>Following cabins are available</h3>
            <CabinTable cabins={availableCabins} />
          </>
        ) : (
          <h3>Oops..., no cabin is available as of now!</h3>
        )
      ) : (
        <div></div>
      )}
    </>
  );
}
