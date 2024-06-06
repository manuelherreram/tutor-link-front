import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Avatar, Typography, Switch, Space, Alert } from 'antd';
import { UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import './Profile.css';

const { Title, Text } = Typography;

const Profile = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [isVerified, setIsVerified] = useState(currentUser?.emailVerified || false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setIsVerified(currentUser.emailVerified);
        } else {
            setError('No se pudo cargar la información del usuario.');
        }
    }, [currentUser]);

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
    useEffect(() => {
        const fetchFavoritos = async () => {
            try {
                // Hacer una llamada a la API para obtener los favoritos del usuario
                // Supongamos que tienes una función fetchFavoritos en tu API que devuelve los favoritos del usuario
                const favoritosData = await fetchFavoritos(currentUser.id);
                setFavoritos(favoritosData);
            } catch (error) {
                setError('No se pudieron cargar los favoritos del usuario.');
            }
        };
    
        if (currentUser) {
            setIsVerified(currentUser.emailVerified);
            fetchFavoritos();
        } else {
            setError('No se pudo cargar la información del usuario.');
        }
    }, [currentUser]);
    return (
        <div className='container-profile'>
            <ArrowLeftOutlined
                style={{ fontSize: '24px', cursor: 'pointer', marginBottom: '20px', marginLeft: '40px', color: '#1d5d90' }}
                onClick={() => navigate('/')}
            />
            <Card style={{ width: 300, margin: '0 auto', textAlign: 'center' }}>
                <Avatar
                    size={100}
                    icon={<UserOutlined />}
                    style={{ marginBottom: 20 }}
                />
                <Title level={2}>{currentUser.displayName || 'Usuario Desconocido'}</Title>
                <Text type="secondary">{currentUser.email || 'Correo no disponible'}</Text>
                <div style={{ marginTop: 20 }}>
                    <Space>
                        <Text>Verificado</Text>
                        <Switch
                            checked={isVerified}
                            disabled
                        />
                    </Space>
                </div>
            </Card>
        </div>
    );
};

export default Profile;