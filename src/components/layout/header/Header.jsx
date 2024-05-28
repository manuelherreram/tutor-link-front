import './Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { signOut } from 'firebase/auth'; 
import { auth } from '../../../firebase/firebaseConfig'
import { Avatar } from '@mui/material';
import { orange } from '@mui/material/colors'

const Header = () => {
  const {currentUser,userLoggedIn} = useAuth(); 

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      console.log('User signed out');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getInitials = (email) => {
    if (!email) return '';
    return email.charAt(0).toUpperCase();
  };

  return (
    <header className="container-header">
      <div className="container-logo">
        <Link to="/" className="element-header">
          <img
            src="/tutor-link-logo.png"
            alt="logotipo"
            className="img-header"
          />
        </Link>
        <Link to="/" className="element-header">
          <h4>Tu camino al éxito comienza aquí</h4>
        </Link>
      </div>

      <nav>
        {!userLoggedIn && (
          <Link to="/register">
            <button className="btn btn-sign">
              Registrar
            </button>
          </Link>
        )}
        {userLoggedIn ? (
          <div className="user-info">
            <Avatar sx={{ bgcolor: orange[500] }} className="avatar">
              {getInitials(currentUser.email)}
            </Avatar>
            <div className="user-details">
                <button className="btn btn-logout" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn btn-login">
              Conectar
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;