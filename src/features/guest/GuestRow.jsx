/* eslint-disable react/prop-types */
import styled from "styled-components";
import Table from "../../ui/Table";

import Menus from "../../ui/Menus";
import {
  HiOutlineArrowDownOnSquareStack,
  // HiOutlineArrowUpOnSquareStack,
  HiOutlineEye,
  HiOutlineTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import { toCapitalize } from "../../utils/helpers";
// import ConfirmAction from "../../ui/ConfirmAction";
const Div = styled.div`
  font-size: 1.6rem;
  /* font-weight: 600; */
  color: var(--color-grey-600);
  font-family: "sono";
`;
const ActionDiv = styled.div`
  vertical-align: center;
  align-items: center;
  display: flex;
  gap: 1.4rem;
`;
{
  /* fullName requried address requried age not
          identityType(Citizenship,driving liscence,pan card,aadhar dard,other)
          IdentityTypeNumber, phoneNumber required nationality(default nepali
          opt(nepali,indian,other)), occupation not */
}
function GuestRow({ guest }) {
  const navigate = useNavigate();
  // const { checkout, isCheckingOut } = useCheckout();
  // const { deleteBookingFn, isDeleting } = useDeleteBooking();
  // const handleCheckout = () => {
  //   checkout(bookingId);
  // };
  const { _id: guestId, fullName, address, phoneNumber, nationality } = guest;
  return (
    <Table.Row>
      <Div>{toCapitalize(fullName)}</Div>
      <Div>{toCapitalize(address)}</Div>
      <Div>{phoneNumber}</Div>
      <Div>{toCapitalize(nationality)}</Div>
      <ActionDiv>
        <span>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={guestId} />
              <Menus.List id={guestId}>
                <Menus.Button
                  icon={<HiOutlineEye />}
                  onClick={() => navigate(`/bookings/${guestId}`)}
                >
                  See Details
                </Menus.Button>
                {status === "unconfirmed" && (
                  <Menus.Button
                    icon={<HiOutlineArrowDownOnSquareStack />}
                    onClick={() => navigate(`/checkin/${guestId}`)}
                  >
                    Check In
                  </Menus.Button>
                )}
                {/* {status === "checked-in" && (
              <Menus.Button
                icon={<HiOutlineArrowUpOnSquareStack />}
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                Check Out
              </Menus.Button>
            )} */}
                <Modal.Open opens="confirmBookingDelete">
                  <Menus.Button icon={<HiOutlineTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
              {/* <Modal.Window name="confirmBookingDelete">
            <ConfirmAction
              action="delete"
              resourceName="Booking"
              disabled={isDeleting}
              onConfirm={() => deleteBookingFn(guestId)}
            />
          </Modal.Window> */}
            </Menus.Menu>
          </Modal>
        </span>
      </ActionDiv>
    </Table.Row>
  );
}

export default GuestRow;
