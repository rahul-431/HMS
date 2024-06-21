import { UsersTable } from "../features/authentication/UsersTable";
import Row from "../ui/Row";
import UsersTableOprations from "../features/authentication/UsersTableOprations";
function NewUsers() {
  return (
    <>
      <Row type="horizontal">
        <UsersTableOprations />
      </Row>
      <Row>
        <UsersTable />
      </Row>
    </>
  );
}

export default NewUsers;
