import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import AddNewCabin from "./AddNewCabin";
import AddRoomTypeButton from "./AddRoomTypeButton";
const CabinTableOperations = () => {
  return (
    <TableOperations>
      <AddNewCabin />
      <AddRoomTypeButton />
      <Filter
        filterField="cb"
        options={[
          { value: "all", label: "All" },
          { value: "clean", label: "Clean" },
          { value: "not-clean", label: "Not Clean" },
          { value: "booked", label: "Booked" },
          { value: "not-booked", label: "Not Booked" },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
