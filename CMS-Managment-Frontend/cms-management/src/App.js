import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MakerDashboard from './pages/dashboards/MakerDashboard';
import CheckerDashboard from './pages/dashboards/CheckerDashboard';
import PublisherDashboard from './pages/dashboards/PublisherDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import ProductList from './pages/maker/ProductList';
import ProductForm from './pages/maker/ProductForm';

function PrivateRoute({ children }) {
  return localStorage.getItem('isAuthenticated') ? children : <Navigate to="/login" />;
}

function RoleBasedDashboard() {
  const role = localStorage.getItem('role')?.toLowerCase();
  const dashboards = {
    maker: <MakerDashboard />,
    checker: <CheckerDashboard />,
    publisher: <PublisherDashboard />,
    admin: <AdminDashboard />,
  };
  return dashboards[role] || <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <RoleBasedDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/products"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/products/create"
          element={
            <PrivateRoute>
              <ProductForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/products/edit/:id"
          element={
            <PrivateRoute>
              <ProductForm />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
