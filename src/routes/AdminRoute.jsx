import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { userLoggedIn, isAdmin } = useAuth();

  // Si el usuario no está logueado, redirige a login
  if (!userLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Si el usuario no es admin, redirige al home
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  // Si el usuario es admin, permite el acceso a la ruta protegida
  return children;
};

export default AdminRoute;
