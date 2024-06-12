import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Avatar, Typography, Switch, Space, Alert, Button } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { getUserById } from '../../api/api';
import './Profile.css';
import MyReservationsPanel from '../../components/myReservationsPanel/MyReservationsPanel';

const { Title, Text } = Typography;

const Profile = () => {
  const { currentUser, userId } = useAuth();
  const [isVerified, setIsVerified] = useState(
    currentUser?.emailVerified || false
  );
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (currentUser) {
      setIsVerified(currentUser.emailVerified);
    } else {
      setError('No se pudo cargar la información del usuario.');
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserById(userId);
        setUserData(res);
      } catch (error) {
        setError('Error al cargar la información del usuario.');
      }
    };

    fetchData();
  }, [userId]);

  const handleVerificationChange = (checked) => {
    setIsVerified(checked);
  };

  if (error) {
    return (
      <div className="container-profile">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="container-profile">
        <Alert
          message="Cargando"
          description="Cargando información del usuario..."
          type="info"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="container-profile">
      <Card className="card-profile">
        <Avatar icon={<UserOutlined />} className="avatar-profile" />
        <Title className="title">
          {currentUser.displayName || 'Usuario Desconocido'}
        </Title>
        <div className="switch-container">
          <Space>
            <Text className="text">Verificado</Text>
            <Switch checked={isVerified} disabled />
          </Space>
        </div>
        <Text className="secondary-text">
          <MailOutlined /> {currentUser.email || 'Correo no disponible'}
        </Text>
      </Card>
      <div>
        <Card className="container-text">
          <h3 className="title-card-text">Información del Usuario</h3>
          <p className="text">
            {' '}
            <b>Teléfono:</b> {userData.phone || 'Teléfono No disponible'}
          </p>
          <p className="text">
            {' '}
            <b>Dirección:</b>{' '}
            {userData.address || 'La dirección no está disponible'}
          </p>
          <p className="text">
            {' '}
            <b>Ciudad:</b> {userData.city || 'La ciudad no está disponible'}
          </p>
          <p className="text">
            {' '}
            <b>País:</b> {userData.country || 'El país no está disponible'}
          </p>
          <p className="text">
            {' '}
            <b>Rol:</b> {userData.role || 'Rol sin asignar'}
          </p>
          <Link to="/">
            <Button className="btn-profile">Ir al inicio</Button>
          </Link>
          <Link to="/favorites">
            <Button>Ver Favoritos</Button>
          </Link>
        </Card>
        <div>
          <Card className="reservation">Mis reservas <MyReservationsPanel userId={userId} /></Card>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
