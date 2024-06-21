import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import RoomTypeTable from "../features/cabins/RoomTypeTable";
function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />
      </Row>
      <Row>
        <Heading as="h3">Room Category</Heading>
        <RoomTypeTable />
      </Row>
    </>
  );
}

export default Cabins;
