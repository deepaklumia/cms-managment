import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import Layout from '../../components/Layout';
import '../dashboards/RoleDashboard.css';
import './Product.css';

const initialForm = { name: '', description: '', price: '' };

function ProductForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ msg: '', type: '' });
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      api.get(`/products/${id}`)
        .then((res) => setForm({ name: res.data.name, description: res.data.description || '', price: res.data.price }))
        .catch(() => showToast('Failed to load product.', 'error'));
    }
  }, [id]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Product name is required';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      errs.price = 'Enter a valid price';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSave = (sendToChecker = false) => {
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);

    setLoading(true);
    const payload = { ...form, status: sendToChecker ? 'Checker' : 'Maker' };

    const request = isEdit
      ? api.put(`/products/${id}`, payload)
      : api.post('/products', payload);

    request
      .then(() => {
        showToast(
          sendToChecker ? 'Product saved & sent to checker!' : `Product ${isEdit ? 'updated' : 'created'} successfully!`,
          'success'
        );
        setTimeout(() => navigate('/dashboard/products'), 1500);
      })
      .catch(() => showToast('Something went wrong. Please try again.', 'error'))
      .finally(() => setLoading(false));
  };

  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: '' }), 3000);
  };

  return (
    <Layout>
      {toast.msg && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
      <div className="page-header">
        <h1 className="page-title">{isEdit ? 'Edit Product' : 'Create Product'}</h1>
        <button className="btn-secondary" onClick={() => navigate('/dashboard/products')}>
          ← Back to Products
        </button>
      </div>

      <div className="section-card form-card">
        <div className="form-grid">
          <div className="form-group">
            <label>Product Name <span className="required">*</span></label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Price (₹) <span className="required">*</span></label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="0"
            />
            {errors.price && <span className="field-error">{errors.price}</span>}
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={4}
            />
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-secondary" onClick={() => navigate('/dashboard/products')} disabled={loading}>
            Cancel
          </button>
          <button className="btn-primary" onClick={() => handleSave(false)} disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update' : 'Save Draft'}
          </button>
          <button className="btn-send-checker" onClick={() => handleSave(true)} disabled={loading}>
            {loading ? 'Sending...' : '📤 Save & Send to Checker'}
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default ProductForm;
