import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import UserTableRow from "./UserTableRow";
import useUsers from "./useUsers";

export const UsersTable = () => {
  const { isLoading, error, users } = useUsers();
  //   const [searchParam] = useSearchParams();
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    console.log(error);
  }
  return (
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
          data={users}
          render={(user) => <UserTableRow user={user} key={user._id} />}
        />
      </Table>
    </Menus>
  );
};
