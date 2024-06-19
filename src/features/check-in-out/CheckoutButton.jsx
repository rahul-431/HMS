/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import Button from "../../ui/Button";
import useBooking from "../bookings/useBooking";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId, variation = "primary" }) {
  const { checkout, isCheckingOut } = useCheckout();
  const { booking } = useBooking();
  const { isPaid, otherPaid } = booking;
  const disabled = Boolean(isPaid && otherPaid);
  if (!disabled) {
    return (
      <Button
        variation={variation}
        size="small"
        onClick={() => toast.error("Guest have due amount to pay")}
      >
        Check out
      </Button>
    );
  }
  return (
    <Button
      variation={variation}
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
