import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import "./cabin-page-content-header.css";

const CabinPageContentHeader = ({ filterField, filterOptions, sortInput }) => {
  return (
    <div className="cabin-content-header">
      <h2>All Rooms</h2>
      <div className="cabin-operations-container">
        <Filter filterField={filterField} filterOptions={filterOptions} />
        <SortBy {...sortInput} />
      </div>
    </div>
  );
};

export default CabinPageContentHeader;
