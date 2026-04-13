import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import './RoleDashboard.css';

function MakerDashboard() {
  const navigate = useNavigate();
  return (
    <Layout>
      <h1 className="page-title">Maker Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card"><span className="stat-number">12</span><span className="stat-label">Total Drafts</span></div>
        <div className="stat-card"><span className="stat-number">5</span><span className="stat-label">Pending Review</span></div>
        <div className="stat-card"><span className="stat-number">3</span><span className="stat-label">Rejected</span></div>
        <div className="stat-card"><span className="stat-number">20</span><span className="stat-label">Total Submitted</span></div>
      </div>
      <div className="section-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>Recent Products</h3>
          <button
            style={{ padding: '7px 16px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}
            onClick={() => navigate('/dashboard/products')}
          >
            View All Products
          </button>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Name</th><th>Category</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr><td>Product A</td><td>Electronics</td><td><span className="badge draft">Draft</span></td></tr>
            <tr><td>Product B</td><td>Clothing</td><td><span className="badge pending">Pending</span></td></tr>
            <tr><td>Product C</td><td>Food</td><td><span className="badge rejected">Rejected</span></td></tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default MakerDashboard;
