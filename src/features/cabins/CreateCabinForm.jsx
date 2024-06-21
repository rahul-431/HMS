/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import { useState } from "react";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { StyledSelect } from "../../ui/Select";
import useRoomType from "./useRoomType";
import useUpdateCabin from "./useUpdateCabin";

const StyledOptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
  padding-bottom: 10px;
  max-height: 150px;
  overflow-y: auto;
  width: 100%;
`;
const StyledOption = styled.div`
  border: 1px solid gray;
  margin-left: 5px;
  margin-bottom: 10px;
  border-radius: 12px;
  padding: 8px;
  cursor: pointer;
  &:hover {
    border-color: blue;
  }
`;
function CreateCabinForm({ closeModal, room = {} }) {
  const { roomTypes } = useRoomType();
  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isUpdating } = useUpdateCabin();
  const { _id: editId, facilities, ...editValues } = room;
  const isWorking = isCreating || isUpdating;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const [selectedFacilities, setSelectedFacilities] = useState(
    isEditSession ? facilities : []
  );
  const facilitiesOptions = [
    "Wifi",
    "Laundry",
    "Baathroom",
    "Parking",
    "Television",
    "Telephone",
    "Wardrobe",
    "Air Conditioning(AC)",
    "Safe",
  ];
  const handleCabinFormSubmit = (data) => {
    const { roomNumber, roomType, capacity, images } = data;
    const formData = new FormData();
    formData.append("roomNumber", roomNumber);
    formData.append("roomType", roomType);
    formData.append("capacity", capacity);
    if (!isEditSession) {
      formData.append("roomImage", images);
    }
    formData.append("facilities", selectedFacilities);

    if (isEditSession) {
      const newData = {
        roomNumber,
        roomType,
        capacity,
        facilities: selectedFacilities,
      };
      console.log(newData);
      updateCabin(
        { newRoom: newData, id: editId },
        {
          onSuccess: () => {
            closeModal?.();
          },
        }
      );
    } else {
      createCabin(formData, {
        onSuccess: () => {
          closeModal?.();
        },
      });
    }
  };
  const onError = (errors) => {
    console.log(errors);
  };
  const clear = () => {
    selectedFacilities.length = 0;
  };

  const handleOptionClick = (facility) => {
    setSelectedFacilities((prevFacilities) => {
      if (!prevFacilities.includes(facility)) {
        return [...prevFacilities, facility];
      }
      return prevFacilities;
    });
  };

  return (
    <Form
      onSubmit={handleSubmit(handleCabinFormSubmit, onError)}
      type={closeModal ? "modal" : "regular"}
    >
      <FormRow
        label="Room Number"
        error={errors?.roomNumber?.message}
        id="roomNumber"
      >
        <Input
          type="text"
          id="roomNumber"
          {...register("roomNumber", {
            required: "This Field is required",
          })}
        />
      </FormRow>
      <FormRow
        label={`Room Category ${isEditSession ? "(Note: Double check)" : ""} `}
        error={errors?.roomType?.message}
        id="roomType"
      >
        <StyledSelect
          id="roomType"
          {...register("roomType", { required: "This field is required" })}
        >
          {roomTypes.map((opt) => (
            <option value={opt._id} key={opt._id}>
              {opt.name}
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors?.capacity?.message}
        id="capacity"
      >
        <Input
          type="number"
          id="capacity"
          {...register("capacity", {
            required: "This Field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
            max: {
              value: 10,
              message: "Capacity should less or equal to 10",
            },
          })}
        />
      </FormRow>
      <div
        style={{
          marginTop: "6px",
          marginBottom: "5px",
          display: "flex",
          gap: "18rem",
        }}
      >
        <label
          htmlFor="facilitiesInput"
          style={{
            display: "block",
            marginBottom: "10px",
            fontWeight: "bold",
            fontSize: "15px",
            fontFamily: "sans-serif",
          }}
        >
          Select Facilities
        </label>
        <div>
          <input
            style={{
              width: "500px",
              padding: "10px",
              marginBottom: "10px",
              marginLeft: "5px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              color: "black",
            }}
            type="text"
            id="facilitiesInput"
            name="facilities"
            value={selectedFacilities.join(", ")}
            readOnly
            placeholder="Select facilities..."
            required
          />
          <button
            style={{
              marginLeft: "5px",
              fontSize: "16px",
              padding: "0.4rem",
              alignItems: "center",
              background: "none",
              border: "1px solid gray",
              borderRadius: "5px",
            }}
            onClick={clear}
          >
            <HiXMark />
          </button>
          <StyledOptionContainer id="optionsContainer">
            {facilitiesOptions.map((facility, index) => (
              <StyledOption
                key={index}
                onClick={() => handleOptionClick(facility)}
              >
                {facility}
              </StyledOption>
            ))}
          </StyledOptionContainer>
        </div>
      </div>

      {!isEditSession && (
        <FormRow label="Image" id="images" error={errors?.image?.message}>
          <FileInput
            id="images"
            accept="image/*"
            {...register("images", {
              required: "This Field is required",
            })}
          />
        </FormRow>
      )}

      <FormRow>
        <Button variation="danger" type="reset" onClick={() => closeModal?.()}>
          Cancel
        </Button>
        <Button type="submit" variation="primary" disabled={isWorking}>
          {isEditSession ? "Edit" : "Add"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
