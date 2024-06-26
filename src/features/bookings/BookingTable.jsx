import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import useBookings from "./useBookings";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import _ from "lodash";
import Pagination from "../../ui/Pagination";
import Heading from "../../ui/Heading";
function BookingTable() {
  const { bookings, isLoading, error, count } = useBookings();

  if (_.isUndefined(bookings)) return <Empty resource="bookings" />;
  if (isLoading) return <Spinner />;
  if (error) {
    toast.error(error);
  }

  return (
    <>
      <Heading as="h3">All Bookings({count}) </Heading>
      <Menus>
        <Table columns="0.6fr 1fr 2.4fr 0.8fr 1fr 3.2rem">
          <Table.Header>
            <div>Room</div>
            <div>Guest</div>
            <div>Dates</div>
            <div>Status</div>
            <div>Amount</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={bookings}
            render={(booking) => (
              <BookingRow key={booking.id} booking={booking} />
            )}
          />
          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        </Table>
      </Menus>
    </>
  );
}

export default BookingTable;
