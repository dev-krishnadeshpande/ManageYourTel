import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./layout.css";

const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      <Sidebar />
      <main>
        <div className="content-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
