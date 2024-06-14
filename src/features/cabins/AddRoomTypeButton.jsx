import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import AddRoomType from "./AddRoomType";

const AddRoomTypeButton = () => {
  return (
    <Modal>
      <Modal.Open opens="room-type-form">
        <Button>Add Category</Button>
      </Modal.Open>
      <Modal.Window name="room-type-form">
        <AddRoomType />
      </Modal.Window>
    </Modal>
  );
};

export default AddRoomTypeButton;
