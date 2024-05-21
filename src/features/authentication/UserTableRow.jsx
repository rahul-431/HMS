/* eslint-disable react/prop-types */
import styled from "styled-components";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmAction from "../../ui/ConfirmAction";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useDeleteUser from "./useDeleteUser";
import Spinner from "../../ui/Spinner";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  align-items: center;
  text-align: center;
`;

const DIV = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  text-align: center;
  justify-content: center;
`;

const ActionDiv = styled.div`
  vertical-align: center;
  align-items: center;
  display: flex;
  gap: 1.4rem;
`;

export default function UserTableRow({ user }) {
  const { isDeleting, deleteSingleUser } = useDeleteUser();
  const { fullName, email, avatar, role, _id } = user;
  console.log("at user table row:", _id);
  if (isDeleting) {
    return <Spinner />;
  }
  return (
    <>
      <Table.Row>
        <Img src={avatar} />
        <DIV>{fullName}</DIV>
        <DIV>{email}</DIV>
        <DIV>{role}</DIV>
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
                  {/* <CabinEditForm editCabin={user} /> */}
                </Modal.Window>
                <Modal.Window name="confirm-delete">
                  <ConfirmAction
                    action="delete"
                    resourceName="User"
                    disabled={isDeleting}
                    onConfirm={() => deleteSingleUser(_id)}
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
