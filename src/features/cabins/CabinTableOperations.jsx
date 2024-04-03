import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import AddNewCabin from "./AddNewCabin";
const CabinTableOperations = () => {
  return (
    <TableOperations>
      <AddNewCabin />
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (a-z)" },
          { value: "name-dsc", label: "Sort by name (z-a)" },
          // { value: "created_at-dsc", label: "Sort by first Creation" },
          // { value: "created_at-asc", label: "Sort by last creation" },
          {
            value: "regularPrice-asc",
            label: "Sort by Price (low first)",
          },
          {
            value: "regularPrice-dsc",
            label: "Sort by Price (high first)",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by Capacity (low first)",
          },
          {
            value: "maxCapacity-dsc",
            label: "Sort by Capacity (high first)",
          },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
