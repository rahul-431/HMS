import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import BookingForm from "./BookingForm";

const AddNewBooking = () => {
  return (
    <Modal>
      <Modal.Open opens="booking-form">
        <Button>Add Booking</Button>
      </Modal.Open>
      <Modal.Window name="booking-form">
        <BookingForm />
      </Modal.Window>
    </Modal>
  );
};
export default AddNewBooking;
