import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import GuestRegisterForm from "./GuestRegisterForm";

const AddNewGuest = () => {
  return (
    <Modal>
      <Modal.Open opens="booking-form">
        <Button>Add Guest</Button>
      </Modal.Open>
      <Modal.Window name="booking-form">
        <GuestRegisterForm />
      </Modal.Window>
    </Modal>
  );
};
export default AddNewGuest;
