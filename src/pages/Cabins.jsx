import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddNewCabin from "../features/cabins/AddNewCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>

      <Row>
        <AddNewCabin />
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
