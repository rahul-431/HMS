import _ from "lodash";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmAction from "../../ui/ConfirmAction";
import Empty from "../../ui/Empty";
import useGuest from "./useGuest";
import GuestDataBox from "./GuestDataBox";
import useDeleteGuest from "./useDeleteGuest";
import { useNavigate } from "react-router-dom";
import GuestRegisterForm from "./GuestRegisterForm";

function GuestDetail() {
  const { guest, isLoading } = useGuest();
  const { deleteGuest, isDeleting } = useDeleteGuest();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const handleDelete = () => {
    deleteGuest(guest._id, {
      onSettled: navigate(-1),
    });
  };
  if (_.isUndefined(guest)) return <Empty resource="Guest" />;

  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h3">Guest Detail</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <GuestDataBox guest={guest} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        <Modal>
          <Modal.Open opens="edit-form">
            <Button variation="primary">Edit</Button>
          </Modal.Open>
          <Modal.Open opens="confirmBookingDelete">
            <Button variation="danger">Delete</Button>
          </Modal.Open>
          <Modal.Window name="confirmBookingDelete">
            <ConfirmAction
              action="delete"
              resourceName="Booking"
              disabled={isDeleting}
              onConfirm={handleDelete}
            />
          </Modal.Window>
          <Modal.Window name="edit-form">
            <GuestRegisterForm guest={guest} />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </>
  );
}

export default GuestDetail;
