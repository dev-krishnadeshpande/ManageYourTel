// src/Sidebar.js
import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <NavLink className="sidebar-item" to="/">
          Home
        </NavLink>
        <NavLink className="sidebar-item" to="/bookings">
          Bookings
        </NavLink>
        <NavLink className="sidebar-item" to="/cabins">
          Cabins
        </NavLink>
        <NavLink className="sidebar-item" to="/users">
          Users
        </NavLink>
        <NavLink className="sidebar-item" to="/settings">
          Settings
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
