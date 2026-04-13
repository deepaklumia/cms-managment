import Layout from '../../components/Layout';
import './RoleDashboard.css';

function AdminDashboard() {
  return (
    <Layout>
      <h1 className="page-title">Admin Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card"><span className="stat-number">18</span><span className="stat-label">Total Users</span></div>
        <div className="stat-card"><span className="stat-number">56</span><span className="stat-label">Total Content</span></div>
        <div className="stat-card"><span className="stat-number">8</span><span className="stat-label">Pending Actions</span></div>
        <div className="stat-card"><span className="stat-number">34</span><span className="stat-label">Published</span></div>
      </div>
      <div className="section-card">
        <h3>User Overview</h3>
        <table className="data-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr><td>John Doe</td><td>john@cms.com</td><td>Maker</td><td><span className="badge approved">Active</span></td></tr>
            <tr><td>Jane Smith</td><td>jane@cms.com</td><td>Checker</td><td><span className="badge approved">Active</span></td></tr>
            <tr><td>Bob Wilson</td><td>bob@cms.com</td><td>Publisher</td><td><span className="badge pending">Inactive</span></td></tr>
            <tr><td>Alice Brown</td><td>alice@cms.com</td><td>Maker</td><td><span className="badge approved">Active</span></td></tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
