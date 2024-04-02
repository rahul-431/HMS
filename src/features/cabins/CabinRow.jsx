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

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
const ActionButton = styled.button`
  border: none;
  background: none;
  outline: none;
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
  &:hover svg {
    color: var(--color-brand-600);
  }
  &:active svg {
    outline: none;
  }
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
      <TableRow role="row">
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
          <ActionButton
            onClick={() => {
              handleDuplicate();
            }}
            title="Duplicate"
          >
            <HiOutlineSquare2Stack />
          </ActionButton>
          <span>
            <Modal>
              <Modal.Open opens="cabin-edit-form">
                <ActionButton title="Edit">
                  <HiOutlinePencilSquare />
                </ActionButton>
              </Modal.Open>
              <Modal.Window name="cabin-edit-form">
                <CabinEditForm editCabin={cabin} />
              </Modal.Window>
            </Modal>
          </span>
          <span>
            <Modal>
              <Modal.Open opens="confirm-delete">
                <ActionButton title="Delete">
                  <HiOutlineTrash />
                </ActionButton>
              </Modal.Open>
              <Modal.Window name="confirm-delete">
                <ConfirmAction
                  action="delete"
                  resourceName="Cabins"
                  disabled={isDeleting}
                  onConfirm={() => deleteCabin(id)}
                />
              </Modal.Window>
            </Modal>
          </span>
        </ActionDiv>
      </TableRow>

      {/* another way of displaying modal except Compund component pattern */}
      {/* {showForm && (
        <Modal closeModal={() => setShowForm(false)}>
          <CabinEditForm editCabin={cabin} setShowForm={setShowForm} />
        </Modal>
      )} */}
    </>
  );
}
