import './Header.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Header = () => {
  return (
    <header className="container-header">
      <div className="container-logo">
        <Link to="/" className="element-header">
          <img src="" alt="logotipo" />
        </Link>
        <Link to="/" className="element-header">
          <h3>Tu camino hacia el éxito</h3>
        </Link>
      </div>
      <div>
        <Button className="element-header" variant="outlined">Crear cuenta</Button>
        <Button className="element-header" variant="outlined">Iniciar sesión</Button>
      </div>
    </header>
  );
};

export default Header;
