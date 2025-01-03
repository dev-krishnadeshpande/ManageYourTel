import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Filter({
  filterField,
  filterOptions,
  selectedFilterOption = "all",
}) {
  const [alignment, setAlignment] = useState(selectedFilterOption);
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("filter alignment", alignment);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    searchParams.set(filterField, newAlignment);
    setSearchParams(searchParams);
  };

  return (
    <div>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        {filterOptions.map((option) => (
          <ToggleButton
            key={option.label}
            value={option.value}
            disabled={alignment === option.value}
            sx={{
              fontSize: "1.1rem",
            }}
          >
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}
