/* eslint-disable react/prop-types */
import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmAction({
  resourceName,
  action = "other",
  disabled,
  onConfirm,
  closeModal,
}) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">
        {action === "delete"
          ? `Delete ${resourceName}`
          : `Update ${resourceName}`}
      </Heading>
      <p>
        {action === "delete"
          ? `Are you sure you want to delete this ${resourceName} permanently? This
          action cannot be undone.`
          : `Are you Sure you want to update?`}
      </p>

      <div>
        <Button variation="secondary" disabled={disabled} onClick={closeModal}>
          Cancel
        </Button>
        <Button
          variation="danger"
          disabled={disabled}
          onClick={onConfirm}
          type="submit"
        >
          {action === "delete" ? `Delete` : `update`}
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmAction;
