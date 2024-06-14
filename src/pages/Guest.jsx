import GuestTable from "../features/guest/GuestTable";
import GuestTableOperation from "../features/guest/GuestTableOperation";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Guest = () => {
  return (
    <>
      <Row type="horizontal">
        <GuestTableOperation />
      </Row>
      <Row>
        <Heading as="h3">All Guests</Heading>
        <GuestTable />
      </Row>
    </>
  );
};

export default Guest;
