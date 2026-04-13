import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Layout from '../../components/Layout';
import '../dashboards/RoleDashboard.css';
import './Product.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    api.get('/products')
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  };

  const handleSendToChecker = (product) => {
    api.put(`/products/${product.id}`, { ...product, status: 'Checker' })
      .then(() => {
        showToast('Product sent to checker successfully!');
        fetchProducts();
      })
      .catch(() => showToast('Failed to send to checker.'));
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <Layout>
      {toast && <div className="toast success">{toast}</div>}
      <div className="page-header">
        <h1 className="page-title">Products</h1>
        <button className="btn-primary" onClick={() => navigate('/dashboard/products/create')}>
          + Create Product
        </button>
      </div>

      <div className="section-card">
        {loading ? (
          <p className="loading-text">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="empty-text">No products found. Create your first product.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.description || '—'}</td>
                  <td>₹{product.price}</td>
                  <td>
                    <span className={`badge ${product.status?.toLowerCase()}`}>
                      {product.status}
                    </span>
                  </td>
                  <td>{new Date(product.created_at).toLocaleDateString()}</td>
                  <td className="action-btns">
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`/dashboard/products/edit/${product.id}`)}
                      disabled={product.status === 'Checker' || product.status === 'Publisher'}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-send"
                      onClick={() => handleSendToChecker(product)}
                      disabled={product.status === 'Checker' || product.status === 'Publisher'}
                    >
                      Send to Checker
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

export default ProductList;
