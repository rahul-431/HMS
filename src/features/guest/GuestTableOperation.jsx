import Filter from "../../ui/Filter";
import Heading from "../../ui/Heading";
import Search from "../../ui/Search";

import TableOperations from "../../ui/TableOperations";
import AddNewGuest from "./AddNewGuest";

function GuestTableOperation() {
  return (
    <TableOperations>
      <AddNewGuest />
      <Heading as="h4" style={{ fontWeight: "normal" }}>
        Search By(Name, Address)
      </Heading>
      <Search />
      <Filter
        filterField="nationality"
        options={[
          { value: "all", label: "All" },
          { value: "nepali", label: "Nepali" },
          { value: "indian", label: "Indian" },
          { value: "other", label: "Other" },
        ]}
      />
    </TableOperations>
  );
}

export default GuestTableOperation;
