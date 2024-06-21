import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
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
    </TableOperations>
  );
};

export default UsersTableOprations;
