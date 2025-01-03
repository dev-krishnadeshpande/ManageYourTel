import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function SortBy({ sortOptions, entityToSort }) {
  const [entity, seEntity] = useState(sortOptions[0].value);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event) => {
    seEntity(event.target.value);
    searchParams.set("sortBy", event.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          {entityToSort}
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={entity}
          onChange={handleChange}
          label={entityToSort}
          sx={{
            fontSize: "1.4rem",
            width: "100%",
          }}
        >
          {sortOptions.map((option) => (
            <MenuItem
              key={option.label}
              value={option.value}
              sx={{ fontSize: "1.2rem" }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
