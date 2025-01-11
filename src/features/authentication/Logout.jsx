import Button from "../../ui/Button";
import { useLogout } from "./useLogout";

const Logout = () => {
  const { logout } = useLogout();
  return (
    <>
      <Button onClick={() => logout()}>Logout</Button>
    </>
  );
};

export default Logout;
