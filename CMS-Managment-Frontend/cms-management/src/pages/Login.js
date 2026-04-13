import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import api from '../services/api';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit =  async(e) => {
    e.preventDefault();
    console.log('Submitting form:',process.env.REACT_APP_ENDPOINT, form);
    api.post('/users/login', form)
      .then(response => {
        const { token, role, name } = response.data.user;
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('role', role);
        localStorage.setItem('userName', name || form.email);
        if (token) localStorage.setItem('token', token);
        navigate('/dashboard');
      })
      .catch(error => {
        setError('Invalid email or password');
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>CMS Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
export default Login;
