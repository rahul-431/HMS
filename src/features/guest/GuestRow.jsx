/* eslint-disable react/prop-types */
import styled from "styled-components";
import Table from "../../ui/Table";

import Menus from "../../ui/Menus";
import { HiOutlineEye, HiOutlineTrash, HiPencil } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import { toCapitalize } from "../../utils/helpers";
import ConfirmAction from "../../ui/ConfirmAction";
import useDeleteGuest from "./useDeleteGuest";
import GuestRegisterForm from "./GuestRegisterForm";
import { Stacked } from "../bookings/BookingRow";
const Div = styled.div`
  font-size: 1.5rem;
  color: var(--color-grey-600);
  font-family: "sono";
`;
const ActionDiv = styled.div`
  vertical-align: center;
  align-items: center;
  display: flex;
  gap: 1.4rem;
`;
function GuestRow({ guest }) {
  const navigate = useNavigate();
  const { deleteGuest, isDeleting } = useDeleteGuest();
  const {
    _id: guestId,
    fullName,
    email,
    address,
    phoneNumber,
    nationality,
    user,
  } = guest;
  return (
    <Table.Row>
      <Stacked>
        <span>{toCapitalize(fullName)}</span>
        <span>{email ? email : "-"}</span>
      </Stacked>
      <Div>{toCapitalize(address)}</Div>
      <Div>{phoneNumber}</Div>
      <Div>{toCapitalize(nationality)}</Div>
      <Div>{user ? toCapitalize(user.fullName) : "-"}</Div>
      <ActionDiv>
        <span>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={guestId} />
              <Menus.List id={guestId}>
                <Menus.Button
                  icon={<HiOutlineEye />}
                  onClick={() => navigate(`/guest/${guestId}`)}
                >
                  See Details
                </Menus.Button>
                <Modal.Open opens="edit-form">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="confirm-delete">
                  <Menus.Button icon={<HiOutlineTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
              <Modal.Window name="confirm-delete">
                <ConfirmAction
                  action="delete"
                  resourceName="Guest"
                  disabled={isDeleting}
                  onConfirm={() => deleteGuest(guestId)}
                />
              </Modal.Window>
              <Modal.Window name="edit-form">
                <GuestRegisterForm guest={guest} />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </span>
      </ActionDiv>
    </Table.Row>
  );
}

export default GuestRow;
