import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import "./main-nav.css"; // Import the CSS file
import { FaDatabase } from "react-icons/fa";

function MainNav() {
  return (
    <nav>
      <ul className="nav-list">
        <li>
          <NavLink to="/dashboard" className="styled-navlink">
            <HiOutlineHome />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookings" className="styled-navlink">
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/cabins" className="styled-navlink">
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className="styled-navlink">
            <HiOutlineUsers />
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className="styled-navlink">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/data" className="styled-navlink">
            <FaDatabase />
            <span>Data</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
