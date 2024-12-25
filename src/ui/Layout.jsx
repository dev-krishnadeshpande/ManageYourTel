// import { Outlet } from "react-router-dom";
// import Header from "./Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./layout.css";

const Layout = () => {
  return (
    <div className="layout-container">
      {/* <Header />
      <Outlet /> */}
      <div className="header-container"></div>
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
