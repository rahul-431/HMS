import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabin from "./useCabin";
import Table from "../../ui/Table";

function CabinTable() {
  const { isLoading, error, cabins } = useCabin();
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    console.log(error);
  }
  return (
    <div>
      <Table columns="0.6fr 1fr 1fr 1fr 1fr 2.2fr 1fr">
        <Table.Header>
          <div>Image</div>
          <div>Name</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Description</div>
          <div>Action</div>
        </Table.Header>
        <Table.Body
          data={cabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </div>
  );
}

export default CabinTable;
