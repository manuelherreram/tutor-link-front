import './Header.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Header = () => {
  return (
    <header className="container-header">
      <div className="container-logo">
        <Link to="/" className="element-header">
          <img src="/tutor-link-logo.png" alt="logotipo" className='img-header' />
        </Link>
        <Link to="/" className="element-header">
          <h3>Tu camino hacia el éxito</h3>
        </Link>
      </div>
      <div>
        <Link to='/register'><Button id="btn" variant="contained">
          Crear cuenta
        </Button></Link>
        <Link to='/login'><Button id="btn" variant="contained">Iniciar sesión</Button></Link>
      </div>
    </header>
  );
};

export default Header;
