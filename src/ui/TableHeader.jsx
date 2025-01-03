import Filter from "./Filter";
import SortBy from "./SortBy";
import "./table-header.css";

const TableHeader = ({
  tableEntity,
  filterField,
  filterOptions,
  sortInput,
  selectedFilterOption,
  selectedSortOption,
}) => {
  return (
    <div className="cabin-content-header">
      <h2>All {tableEntity}</h2>
      <div className="cabin-operations-container">
        <Filter
          filterField={filterField}
          filterOptions={filterOptions}
          selectedFilterOption={selectedFilterOption}
        />
        <SortBy {...sortInput} selectedSortOption={selectedSortOption} />
      </div>
    </div>
  );
};

export default TableHeader;
