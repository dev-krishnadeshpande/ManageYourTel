import CircularProgress from "@mui/material/CircularProgress";
import "./loadingSpinner.css";

export default function CircularIndeterminate({ size = "4rem" }) {
  return (
    <div className="loading-spinner-container">
      <CircularProgress size={size} />
    </div>
  );
}
