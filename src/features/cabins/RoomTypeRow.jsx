/* eslint-disable react/prop-types */
import styled from "styled-components";
import { HiOutlineTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import ConfirmAction from "../../ui/ConfirmAction";
import useDeleteRoomType from "./useDeleteRoomType";

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
const DeleteButton = styled.div`
  font-size: 2rem;
  font-weight: 600;
  cursor: pointer;
  padding: 3px;
  border: 1px solid var(--color-grey-200);
  border-radius: 4px;
  display: flex;
  align-items: center;

  &:hover {
    border-color: var(--color-grey-700);
  }
`;

export default function RoomTypeRow({ roomType }) {
  const { isDeleting, deleteRoomType1 } = useDeleteRoomType();
  const { name, _id } = roomType;
  return (
    <>
      <Table.Row>
        <Cabin>{name}</Cabin>
        <ActionDiv>
          <Modal>
            <Modal.Open opens="cabin-form">
              <DeleteButton>
                <HiOutlineTrash />
              </DeleteButton>
            </Modal.Open>
            <Modal.Window name="cabin-form">
              <ConfirmAction
                action="delete"
                resourceName="Room Types"
                disabled={isDeleting}
                onConfirm={() => deleteRoomType1(_id)}
              />
            </Modal.Window>
          </Modal>
        </ActionDiv>
      </Table.Row>
    </>
  );
}
