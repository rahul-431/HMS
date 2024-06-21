import GuestTable from "../features/guest/GuestTable";
import GuestTableOperation from "../features/guest/GuestTableOperation";

import Row from "../ui/Row";

const Guest = () => {
  return (
    <>
      <Row type="horizontal">
        <GuestTableOperation />
      </Row>
      <Row>
        <GuestTable />
      </Row>
    </>
  );
};

export default Guest;
