import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Avatar, Typography, Switch, Space, Alert, Button } from 'antd';
import { UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { getUserById } from '../../api/api';
import './Profile.css';
import { Content } from 'antd/es/layout/layout';

const { Title, Text } = Typography;

const Profile = () => {
    const navigate = useNavigate();
    const { currentUser, userId } = useAuth();
    const [isVerified, setIsVerified] = useState(currentUser?.emailVerified || false);
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
            <div className='container-profile'>
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                />
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className='container-profile'>
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
        <div className='container-profile'>
            <ArrowLeftOutlined onClick={() => navigate('/')} />
            <Card className='card-container'>
                <Avatar
                    size={100}
                    icon={<UserOutlined />}
                    className='avatar'
                />
                <Title className='title'>{currentUser.displayName || 'Usuario Desconocido'}</Title>
                <Text className='secondary-text'>{currentUser.email || 'Correo no disponible'}</Text>
                <div className='switch-container'>
                    <Space>
                        <Text className='text'>Verificado</Text>
                        <Switch
                            checked={isVerified}
                            disabled
                        />
                    </Space>
                </div>
                <Content className='text'> Teléfono: {userData.phone || 'Teléfono No disponible'}</Content>
                <p className='text'> Dirección: {userData.address || 'La dirección no está disponible'}</p>
                <p className='text'> Ciudad: {userData.city|| 'La ciudad no está disponible'}</p>
                <p className='text'> País: {userData.country || 'El país no está disponible'}</p>
                <p className='text'> Rol: {userData.role || 'Rol sin asignar'}</p>
                
                
            </Card>
            <Link to="/favorites">
                    <Button>Ver Favoritos</Button>
            </Link>
        </div>
    );
};

export default Profile;
