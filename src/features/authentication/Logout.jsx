import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import LoadingSpinner from "../../ui/LoadingSpinner";

const Logout = () => {
  const { logout, isPending: isLoading } = useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClickHandler={logout}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <LoadingSpinner />}
    </ButtonIcon>
  );
};

export default Logout;
