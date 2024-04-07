import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
function logout() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon onClick={logout} disabled={isLoading}>
      {isLoading ? <SpinnerMini /> : <HiOutlineArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default logout;
