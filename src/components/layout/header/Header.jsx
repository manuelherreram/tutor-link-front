import './Header.css';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import { Avatar, Menu, Dropdown, Space } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { orange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { currentUser, userLoggedIn, isAdmin} = useAuth();
  const navigate = useNavigate();

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
  const handleAvatarClick = () => {
    navigate('/profile');
  };
  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      handleLogout();
    } else {
      navigate(key);
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="/profile" icon={<UserOutlined />}>
        Ver Perfil
      </Menu.Item>
      {isAdmin && (
        <Menu.Item key="/admin" icon={<UserOutlined />}>
          Admin
        </Menu.Item>
      )}
      <Menu.Item key="logout" icon={<UserOutlined />}>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );
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
            <button className="btn btn-sign">Registrar</button>
          </Link>
        )}
        {userLoggedIn ? (
          <Dropdown overlay={menu} trigger={['click']}>
          <Space className="user-info" onClick={(e) => e.preventDefault()}>
              <Avatar
                  sx={{ bgcolor: orange[500], cursor: 'pointer' }}
                  className="avatar"
              >
                  {getInitials(currentUser.email)}
              </Avatar>
              <DownOutlined />
          </Space>
      </Dropdown>
        ) : (
          <Link to="/login">
            <button className="btn btn-login">Conectar</button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
