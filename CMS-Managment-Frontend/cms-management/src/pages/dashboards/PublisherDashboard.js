import Layout from '../../components/Layout';
import './RoleDashboard.css';

function PublisherDashboard() {
  return (
    <Layout>
      <h1 className="page-title">Publisher Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card"><span className="stat-number">6</span><span className="stat-label">Ready to Publish</span></div>
        <div className="stat-card"><span className="stat-number">34</span><span className="stat-label">Published</span></div>
        <div className="stat-card"><span className="stat-number">2</span><span className="stat-label">Scheduled</span></div>
        <div className="stat-card"><span className="stat-number">40</span><span className="stat-label">Total Content</span></div>
      </div>
      <div className="section-card">
        <h3>Ready to Publish</h3>
        <table className="data-table">
          <thead>
            <tr><th>Title</th><th>Approved By</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr><td>News Update #5</td><td>checker1@cms.com</td><td>2024-01-10</td><td><span className="badge approved">Approved</span></td></tr>
            <tr><td>Blog Post #4</td><td>checker2@cms.com</td><td>2024-01-09</td><td><span className="badge approved">Approved</span></td></tr>
            <tr><td>Article #7</td><td>checker1@cms.com</td><td>2024-01-08</td><td><span className="badge published">Published</span></td></tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default PublisherDashboard;
