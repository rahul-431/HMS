/* eslint-disable react/prop-types */
import styled from "styled-components";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";

import useDeleteCabin from "./useDeleteCabin";
import Modal from "../../ui/Modal";
import ConfirmAction from "../../ui/ConfirmAction";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Tag from "../../ui/Tag";
import CreateCabinForm from "./CreateCabinForm";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const ActionDiv = styled.div`
  vertical-align: center;
  align-items: center;
  display: flex;
  gap: 1.4rem;
`;

export default function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const {
    roomNumber,
    _id,
    capacity,
    roomStatus,
    cleanStatus,
    roomTypeName,
    roomImage,
    userName,
  } = cabin;
  const statusToTagName = {
    Clean: "green",
    Booked: "green",
    "Not Booked": "blue",
    "Not Clean": "blue",
  };
  return (
    <>
      <Table.Row>
        <Img src={roomImage} />
        <Cabin>{roomNumber}</Cabin>
        <div>{roomTypeName.name}</div>
        <div>{capacity}</div>
        <Tag type={statusToTagName[cleanStatus]}>{cleanStatus}</Tag>
        <Tag type={statusToTagName[roomStatus]}>{roomStatus}</Tag>
        <div>{userName.fullName}</div>
        <ActionDiv>
          <span>
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={_id} />
                <Menus.List id={_id}>
                  <Modal.Open opens="cabin-edit-form">
                    <Menus.Button icon={<HiOutlinePencilSquare />}>
                      Edit
                    </Menus.Button>
                  </Modal.Open>
                  <Modal.Open opens="confirm-delete">
                    <Menus.Button icon={<HiOutlineTrash />}>
                      Delete
                    </Menus.Button>
                  </Modal.Open>
                </Menus.List>
                <Modal.Window name="cabin-edit-form">
                  <CreateCabinForm room={cabin} />
                </Modal.Window>
                <Modal.Window name="confirm-delete">
                  <ConfirmAction
                    action="delete"
                    resourceName="Cabins"
                    disabled={isDeleting}
                    onConfirm={() => deleteCabin(_id)}
                  />
                </Modal.Window>
              </Menus.Menu>
            </Modal>
          </span>
        </ActionDiv>
      </Table.Row>
    </>
  );
}
