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
      {/* <Modal.Open opens="cabin-table">
        <Button>Show Table</Button>
      </Modal.Open>
      <Modal.Window name="cabin-table">
        <CabinTable />
      </Modal.Window> */}
    </Modal>
  );
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
