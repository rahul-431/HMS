/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
// import { useState } from "react";
import {
  HiOutlinePencilSquare,
  HiOutlineSquare2Stack,
  HiOutlineTrash,
} from "react-icons/hi2";
import CabinEditForm from "./CabinEditForm";
import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmAction from "../../ui/ConfirmAction";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

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

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
const ActionDiv = styled.div`
  vertical-align: center;
  align-items: center;
  display: flex;
  gap: 1.4rem;
`;

export default function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { name, description, maxCapacity, regularPrice, discount, image, id } =
    cabin;
  const { isCreating, createCabin } = useCreateCabin();
  function handleDuplicate() {
    createCabin({
      name: `copy of ${name}`,
      description,
      maxCapacity,
      regularPrice,
      discount,
      image,
    });
  }
  if (isCreating) return <Spinner />;
  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits upto {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>{description}</div>
        <ActionDiv>
          <span>
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={id} />
                <Menus.List id={id}>
                  <Menus.Button
                    icon={<HiOutlineSquare2Stack />}
                    onClick={() => {
                      handleDuplicate();
                    }}
                  >
                    Duplicate
                  </Menus.Button>
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
                  <CabinEditForm editCabin={cabin} />
                </Modal.Window>
                <Modal.Window name="confirm-delete">
                  <ConfirmAction
                    action="delete"
                    resourceName="Cabins"
                    disabled={isDeleting}
                    onConfirm={() => deleteCabin(id)}
                  />
                </Modal.Window>
              </Menus.Menu>
            </Modal>
          </span>
        </ActionDiv>
      </Table.Row>

      {/* another way of displaying modal except Compund component pattern */}
      {/* {showForm && (
        <Modal closeModal={() => setShowForm(false)}>
          <CabinEditForm editCabin={cabin} setShowForm={setShowForm} />
        </Modal>
      )} */}
    </>
  );
}
