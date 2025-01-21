import "./displayData.css";

const DisplayData = ({ icon, label, children }) => {
  return (
    <div className="display-data-container">
      <span className="data-label">
        {icon && icon}
        <span>{label}</span>
      </span>
      {children}
    </div>
  );
};

export default DisplayData;
