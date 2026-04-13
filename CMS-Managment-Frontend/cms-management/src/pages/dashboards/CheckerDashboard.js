import Layout from '../../components/Layout';
import './RoleDashboard.css';

function CheckerDashboard() {
  return (
    <Layout>
      <h1 className="page-title">Checker Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card"><span className="stat-number">8</span><span className="stat-label">Pending Review</span></div>
        <div className="stat-card"><span className="stat-number">15</span><span className="stat-label">Approved</span></div>
        <div className="stat-card"><span className="stat-number">4</span><span className="stat-label">Rejected</span></div>
        <div className="stat-card"><span className="stat-number">27</span><span className="stat-label">Total Reviewed</span></div>
      </div>
      <div className="section-card">
        <h3>Pending Review</h3>
        <table className="data-table">
          <thead>
            <tr><th>Title</th><th>Submitted By</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr><td>Article Draft #1</td><td>maker1@cms.com</td><td>2024-01-10</td><td><span className="badge pending">Pending</span></td></tr>
            <tr><td>Blog Post #4</td><td>maker2@cms.com</td><td>2024-01-09</td><td><span className="badge pending">Pending</span></td></tr>
            <tr><td>News Update #5</td><td>maker1@cms.com</td><td>2024-01-08</td><td><span className="badge approved">Approved</span></td></tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default CheckerDashboard;
