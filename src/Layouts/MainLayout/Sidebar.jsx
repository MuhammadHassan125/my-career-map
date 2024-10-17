import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './index.scss';
import { Snackbar } from '../../Utils/SnackbarUtils';

const Sidebar = () => {
  const navigate = useNavigate();
  const sidebarItems = [
    { id: 1, name: "Dashboard", link: "/" },
    { id: 2, name: "Career", link: "/map-career" },
    { id: 5, name: "All Paths", link: "/path" },
    { id: 8, name: "Settings", link: "/profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user-visited-dashboard');
    navigate('/login');
    Snackbar('Logout successfully', { variant: 'success', style: { backgroundColor:'var(--primary-btn-color)' } });

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
