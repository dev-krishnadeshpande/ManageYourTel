import { useSearchParams } from "react-router-dom";

export default function useFilterCabins(cabins, filterField) {
  const [searchParams] = useSearchParams();
  const selectedFilterOption = searchParams.get(filterField) || "all";

  let filteredCabins = [];

  if (cabins) {
    if (selectedFilterOption === "all") {
      filteredCabins = cabins && Object.values(cabins);
    } else if (selectedFilterOption === "no-discount") {
      filteredCabins =
        cabins && Object.values(cabins).filter((cabin) => cabin.discount === 0);
    } else {
      filteredCabins =
        cabins && Object.values(cabins).filter((cabin) => cabin.discount > 0);
    }
  }

  return filteredCabins;
}