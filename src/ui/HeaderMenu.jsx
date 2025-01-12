import "./headerMenu.css";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const HeaderMenu = () => {
  const navigate = useNavigate();

  function userAccountClickHandler() {
    navigate("/account");
  }

  return (
    <ul className="header-menu-container">
      <li>
        <ButtonIcon onClickHandler={userAccountClickHandler}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
};

export default HeaderMenu;
