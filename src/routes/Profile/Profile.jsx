import  { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Avatar, Typography, Switch, Space, Alert, Button } from 'antd';
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

    return (
        <div className='container-profile'>
            <div className='container-top-elements'>
            <ArrowLeftOutlined
                onClick={() => navigate('/')}
            />
            <Link to="/favorites">
                <Button>Ver Favoritos</Button>
            </Link>
            </div>
            
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