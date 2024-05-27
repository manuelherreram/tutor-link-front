import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
    const { userLoggedIn } = useAuth();

    return userLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;