import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Filter({ optionsList }) {
  const [alignment, setAlignment] = useState(optionsList[0]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event, newAlignment) => {
    let selectedOption;
    const newAlignmentStrArray = newAlignment.toLowerCase().split(" ");
    if (newAlignmentStrArray.length > 0) {
      selectedOption = newAlignmentStrArray.join("-");
    } else {
      selectedOption = newAlignment;
    }
    console.log("selectedOption", selectedOption);

    setAlignment(newAlignment);
    searchParams.set("discount", selectedOption);
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
      {optionsList.map((option) => (
        <ToggleButton key={option} value={option}>
          {option}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
