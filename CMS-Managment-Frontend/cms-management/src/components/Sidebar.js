import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const roleMenus = {
  maker: [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Products', path: '/dashboard/products' },
    { label: 'Create Product', path: '/dashboard/products/create' },
  ],
  checker: [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Pending Review', path: '/dashboard/pending-review' },
    { label: 'Approved', path: '/dashboard/approved' },
    { label: 'Rejected', path: '/dashboard/rejected' },
  ],
  publisher: [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Ready to Publish', path: '/dashboard/ready-to-publish' },
    { label: 'Published', path: '/dashboard/published' },
  ],
  admin: [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'User Management', path: '/dashboard/users' },
    { label: 'All Content', path: '/dashboard/all-content' },
    { label: 'Reports', path: '/dashboard/reports' },
    { label: 'Settings', path: '/dashboard/settings' },
  ],
};

function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role')?.toLowerCase();
  const user = localStorage.getItem('userName') || 'User';
  const menus = roleMenus[role] || [];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>CMS</h2>
        <span className="role-badge">{role?.toUpperCase()}</span>
      </div>
      <div className="sidebar-user">👤 {user}</div>
      <nav className="sidebar-nav">
        {menus.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Sidebar;
