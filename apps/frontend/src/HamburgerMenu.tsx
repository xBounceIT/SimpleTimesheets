import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

// Import SVG icons as React components (assuming Vite/Create React App setup)
// Remove these imports for now
// import DashboardIcon from './assets/icons/dashboard.svg?react';
// import TimeEntriesIcon from './assets/icons/time-entries.svg?react';
// import ProjectsIcon from './assets/icons/projects.svg?react';
// import ClientsIcon from './assets/icons/clients.svg?react';
// import UserManagementIcon from './assets/icons/user-management.svg?react';

interface HamburgerMenuProps {
  onLogout: () => void;
  role: string | null;
}

export function HamburgerMenu({ onLogout, role }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="hamburger-button"
        onClick={toggleSidebar}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Navigation</h3>
          <button onClick={toggleSidebar} className="close-button">&times;</button>
        </div>
        <div className="sidebar-content">
          {role === 'ADMIN' ? (
            // Show only User Management for ADMIN role
            <Link to="/admin/users" className="nav-item" onClick={toggleSidebar}>
               User Management
            </Link>
          ) : (
            // Show all other tabs for non-ADMIN roles
            <>
              <Link to="/" className="nav-item" onClick={toggleSidebar}>
                Dashboard
              </Link>
              <Link to="/projects" className="nav-item" onClick={toggleSidebar}>
                Projects
              </Link>
              <Link to="/clients" className="nav-item" onClick={toggleSidebar}>
                Clients
              </Link>
              <Link to="/tasks" className="nav-item" onClick={toggleSidebar}>
                Tasks
              </Link>
            </>
          )}
          <button className="nav-item logout-button" onClick={onLogout}>Logout</button>
        </div>
      </div>
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}
