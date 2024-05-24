import './Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { signOut } from 'firebase/auth'; 
import { auth } from '../../../firebase/firebaseConfig'

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
        <Link to="/register">
          <button className="btn btn-sign" >
           Registrar
          </button>
        </Link>
        {userLoggedIn ? (
          <button className="btn btn-login" onClick={handleLogout}>
            Cerrar sesión
          </button>
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