import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <BookingTableOperations />
      </Row>
      <Row>
        <Heading as="h3">All bookings</Heading>
        <BookingTable />
      </Row>
    </>
  );
}

export default Bookings;
