import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './index.scss';

const Sidebar = () => {
  const navigate = useNavigate();
  const sidebarItems = [
    { id: 1, name: "Dashboard", link: "/" },
    { id: 2, name: "Career", link: "/map-career" },
    { id: 3, name: "Add Path", link: "/map-single-path" },
    { id: 4, name: "Documents", link: "/documents" },
    { id: 5, name: "All Paths", link: "/path" },
    // { id: 6, name: "Select Map", link: "/map-selected-path" },
    { id: 7, name: "Profile", link: "" },
    { id: 8, name: "Settings", link: "" },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user-visited-dashboard');
    navigate('/login');
  }

  return (
    <main className='sidebar-section'>
      <div className="sidebar-logo">
        <img src='/images/logo.png' alt='logo' />
      </div>
      {sidebarItems.map((sidebarItem) => (
        sidebarItem.link ? (
          <NavLink
            key={sidebarItem.id}
            to={sidebarItem.link}
            className={({ isActive }) => isActive ? "sidebar-item active" : "sidebar-item"}
          >
            <ul>
              <li>{sidebarItem.name}</li>
            </ul>
          </NavLink>
        ) : (
          <div key={sidebarItem.id} className="sidebar-item inactive">
            <ul>
              <li>{sidebarItem.name}</li>
            </ul>
          </div>
        )
      ))}
      <div className="sidebar-item inactive" onClick={handleLogout}>
        <ul>
          <li>Logout</li>
        </ul>
      </div>
    </main>
  );
}

export default Sidebar;
