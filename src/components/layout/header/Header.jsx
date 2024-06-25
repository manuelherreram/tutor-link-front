import './Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import { Avatar, Dropdown, Space } from 'antd';
import { UserOutlined, DownOutlined,SettingOutlined,LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { currentUser, userLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getInitials = (email) => {
    if (!email) return '';
    return email.charAt(0).toUpperCase();
  };

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      handleLogout();
    } else {
      navigate(key);
    }
  };

  const menuItems = [
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Ver Perfil',
    },
    isAdmin && {
      key: '/admin',
      icon: <SettingOutlined/>,
      label: 'Admin',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined/>,
      label: 'Cerrar sesión',
    },
  ].filter(Boolean);

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
          <Dropdown 
            menu={{
              items: menuItems,
              onClick: handleMenuClick
            }} 
            trigger={['click']}
          >
            <Space className="user-info" onClick={(e) => e.preventDefault()}>
              <Avatar className="avatar">
                {getInitials(currentUser.email)}
              </Avatar>
              <DownOutlined style={{ cursor: 'pointer' }} />
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
