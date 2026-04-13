import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Welcome to CMS Dashboard</h1>
      <button onClick={handleLogout} style={{ marginTop: '20px', padding: '8px 20px', cursor: 'pointer' }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
