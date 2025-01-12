// import Logout from "../features/authentication/Logout";
import UserAvatar from "../features/authentication/UserAvatar";
import "./header.css";
import HeaderMenu from "./HeaderMenu";

const Header = () => {
  return (
    <header className="header-container">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
};

export default Header;
