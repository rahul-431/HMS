import { useSearchParams } from "react-router-dom";
import Heading from "../../ui/Heading";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import UserTableRow from "./UserTableRow";
import useUsers from "./useUsers";

export const UsersTable = () => {
  const { isLoading, error, users } = useUsers();
  const [searchParam] = useSearchParams();

  //client side filtering
  const filterValue = searchParam.get("role") || "all";
  let filteredUsers;
  if (filterValue === "all") filteredUsers = users;
  if (filterValue === "staff")
    filteredUsers = users.filter((user) => user.role === "Staff");
  if (filterValue === "admin")
    filteredUsers = users.filter((user) => user.role === "Admin");
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    console.log(error);
  }
  return (
    <>
      <Heading as="h3">All Users({filteredUsers.length}) </Heading>
      <Menus>
        <Table columns="0.6fr 1fr 2fr 1fr 1fr">
          <Table.Header>
            <div></div>
            <div>Full Name</div>
            <div>Email</div>
            <div>Role</div>
            <div></div>
          </Table.Header>
          <Table.Body
            data={filteredUsers}
            render={(user) => <UserTableRow user={user} key={user._id} />}
          />
        </Table>
      </Menus>
    </>
  );
};
