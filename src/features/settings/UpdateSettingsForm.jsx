import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSetting from "./useSetting";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import useUpdateSetting from "./useUpdateSetting";
function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestPerBooking,
      breakFastPrice,
    } = {},
    isLoading,
  } = useSetting();
  const { handleSubmit, register } = useForm();

  const { updateSettingFn, isUpdating } = useUpdateSetting();
  const handleSettingUpdate = (data) => {
    updateSettingFn(data);
  };
  if (isLoading) return <Spinner />;
  return (
    <Form onSubmit={handleSubmit(handleSettingUpdate)}>
      <FormRow label="Minimum nights/booking" id="minBookingLength">
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={minBookingLength}
          {...register("minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking" id="maxBookingLength">
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          {...register("maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking" id="maxGuestPerBooking">
        <Input
          type="number"
          id="maxGuestPerBooking"
          defaultValue={maxGuestPerBooking}
          {...register("maxGuestPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price" id="breakFastPrice">
        <Input
          type="number"
          id="breakFastPrice"
          defaultValue={breakFastPrice}
          {...register("breakFastPrice")}
        />
      </FormRow>
      <FormRow>
        <Button variation="danger" type="reset">
          Reset
        </Button>
        <Button variation="primary" type="submit" disabled={isUpdating}>
          Update
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
