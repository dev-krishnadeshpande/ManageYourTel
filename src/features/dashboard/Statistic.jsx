import React from "react";
import "./statistic.css";

const Statistic = ({ icon, title, value, color }) => {
  const iconStyle = {
    gridRow: "1 / -1",
    aspectRatio: "1",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `var(--color-${color}-100)`, // Dynamic background color
  };

  const svgStyle = {
    width: "3.2rem",
    height: "3.2rem",
    color: `var(--color-${color}-700)`, // Dynamic icon color
  };

  return (
    <div className="statistic-container">
      <div style={iconStyle}>
        {React.cloneElement(icon, { style: svgStyle })}
      </div>
      <h5 className="statistic-title">{title}</h5>
      <p className="statistic-value">{value}</p>
    </div>
  );
};

export default Statistic;
