import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

const Sidebar = () => {
  const sidebarItems = [
    { id: 1, name: "Dashboard", link: "/dashboard" },
    { id: 2, name: "Career", link: "/map-career" },
    { id: 3, name: "Add Path", link: "/map-single-path" },
    { id: 4, name: "Documents", link: "/documents" },
    { id: 5, name: "Paths", link: "/path" },
    { id: 6, name: "Select Map", link: "/map-selected-path" },
    { id: 7, name: "Profile", link: "" },
    { id: 8, name: "Settings", link: "" },
    { id: 9, name: "Logout", link: "/login" }
  ];

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
    </main>
  );
}

export default Sidebar;
