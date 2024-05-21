import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import SignupForm from "./SignupForm";

const AddNewUser = () => {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add New User</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <SignupForm />
      </Modal.Window>
    </Modal>
  );
};
export default AddNewUser;
