import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Filter({ filterField, filterOptions }) {
  const [alignment, setAlignment] = useState(filterOptions[0]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event, newAlignment) => {
    let selectedOption;
    const newAlignmentStrArray = newAlignment.toLowerCase().split(" ");
    if (newAlignmentStrArray.length > 0) {
      selectedOption = newAlignmentStrArray.join("-");
    } else {
      selectedOption = newAlignment;
    }

    setAlignment(newAlignment);
    searchParams.set(filterField, selectedOption);
    setSearchParams(searchParams);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      {filterOptions.map((option) => (
        <ToggleButton
          key={option}
          value={option}
          disabled={alignment === option}
        >
          {option}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
