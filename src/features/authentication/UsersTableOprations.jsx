import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import AddNewUser from "./AddNewUser";
const UsersTableOprations = () => {
  return (
    <TableOperations>
      <AddNewUser />
      <Filter
        filterField="role"
        options={[
          { value: "all", label: "All" },
          { value: "admin", label: "Admin" },
          { value: "staff", label: "Staff" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (a-z)" },
          { value: "name-dsc", label: "Sort by name (z-a)" },
        ]}
      />
    </TableOperations>
  );
};

export default UsersTableOprations;
