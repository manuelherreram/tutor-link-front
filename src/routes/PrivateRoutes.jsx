import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { userLoggedIn } = useAuth();

  // Si el usuario no está logueado, redirige al home
  if (!userLoggedIn) {
    return <Navigate to="/" />;
  }

  // Si el usuario está logueado, permite el acceso a la ruta protegida
  return children;
};

export default PrivateRoute;