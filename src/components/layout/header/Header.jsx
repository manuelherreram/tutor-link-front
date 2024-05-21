import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
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
      </div>

      <nav>
        <Link to="/" className="element-header">
          <h4>Tu camino al éxito comienza aquí...</h4>
        </Link>
        <Link to="/register">
          <button className="btn btn-sign" >
           Registrar
          </button>
        </Link>
        <Link to="/login">
          <button className="btn btn-login" >
           Conectar
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
