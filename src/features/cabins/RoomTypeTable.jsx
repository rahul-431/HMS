import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import useRoomType from "./useRoomType";
import RoomTypeRow from "./RoomTypeRow";

function RoomTypeTable() {
  const { isLoading, error, roomTypes } = useRoomType();
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    console.log(error);
  }
  if (!roomTypes.length) return <Empty resource="cabins" />;
  return (
    <Table columns="1fr 1fr">
      <Table.Header>
        <div>RoomType</div>
      </Table.Header>
      <Table.Body
        data={roomTypes}
        render={(roomType) => (
          <RoomTypeRow roomType={roomType} key={roomType._id} />
        )}
      />
    </Table>
  );
}

export default RoomTypeTable;
