import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

const AddNewCabin = () => {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );

  //Just Another way of using modal (without compound component pattern)

  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   return (
  //     <>
  //       <Button onClick={() => setIsModalOpen(!isModalOpen)}>
  //         Add New Cabin
  //       </Button>
  //       {isModalOpen && (
  //         <Modal closeModal={() => setIsModalOpen(false)}>
  //           <CreateCabinForm closeModal={() => setIsModalOpen(false)} />
  //         </Modal>
  //       )}
  //     </>
  //   );
};

export default AddNewCabin;
