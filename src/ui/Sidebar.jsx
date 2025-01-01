import Logo from "./Logo";
import MainNav from "./MainNav";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar-container">
      <Logo />
      <MainNav />
    </aside>
  );
};

export default Sidebar;
