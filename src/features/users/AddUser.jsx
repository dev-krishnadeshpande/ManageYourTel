import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

const AddUser = () => {
  const naviate = useNavigate();

  return (
    <>
      <Button onClick={() => naviate("/signup")}>Add user</Button>
    </>
  );
};

export default AddUser;
