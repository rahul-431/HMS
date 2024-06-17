import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import _ from "lodash";
import Pagination from "../../ui/Pagination";
import useGuests from "./useGuests";
import GuestRow from "./GuestRow";
function GuestTable() {
  const { guests, count, isLoading, error } = useGuests();
  if (_.isUndefined(guests)) return <Empty resource="Guests" />;
  if (isLoading) return <Spinner />;
  if (error) {
    toast.error(error);
  }

  return (
    <Menus>
      <Table columns="1.4fr 1fr 1fr 1fr 0.6fr 0.6fr">
        {" "}
        <Table.Header>
          <div>Name</div>
          <div>Address</div>
          <div>Contact</div>
          <div>Nationality</div>
          <div>Added By</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={guests}
          render={(guest) => <GuestRow key={guest._id} guest={guest} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default GuestTable;
