import { useState, useEffect } from 'react';
import Panel from '../../components/admin/panel/Panel';
import NewTeacher from '../newTeacher/NewTeacher';
import Characteristics from '../../routes/characteristics/Characteristics'
import Categories from '../categories/Categories';
import Users from '../../components/admin/users/Users'
import { Button, Menu, Result } from 'antd';
import { UserAddOutlined, WalletOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
    const items = [
        {
            label: 'Todos los Profesores',
            key: 'profesores',
            icon: <WalletOutlined />,
        },
        {
            label: 'Agregar un Profesor',
            key: 'agregar',
            icon: <UserAddOutlined />,
        },
        {
            label: 'Administrar características',
            key: 'caracteristicas',
            icon: <UserAddOutlined />,
        },
        {
            label: 'Administrar categorias',
            key: 'categorias',
            icon: <UserAddOutlined />,
        },
        {
            label: 'Todos los usuarios ',
            key: 'usuarios',
            icon: <WalletOutlined />,
        },
    ];

    const [current, setCurrent] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [showPanel, setShowPanel] = useState(false); // State to control the panel visibility
    const [selectedComponent, setSelectedComponent] = useState(null); // State to control which component to render
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMenuClick = e => {
        setCurrent(e.key);

        if (e.key === 'profesores') {
            setShowPanel(true);
            setSelectedComponent(null);
        } else if (e.key === 'agregar') {
            setSelectedComponent(< NewTeacher/>);
            setShowPanel(false);
        } else if (e.key === 'caracteristicas') {
            setSelectedComponent(<Characteristics />);
            setShowPanel(false);
        } else if (e.key === 'usuarios') {
            setSelectedComponent(<Users />);
            setShowPanel(false);
        } else if (e.key === 'categorias') {
            setSelectedComponent(<Categories />);
            setShowPanel(false);
        }
    };

    const handleGoHome = () => {
        navigate('/'); // Navigate to the root path
    };

    const renderContent = () => {
        if (isMobile) {
            return (
                <div className="container-not-available">
                    <Result
                        status="warning"
                        title="Panel no disponible en dispositivos móviles."
                        extra={
                            <Button
                                type="primary"
                                key="console"
                                onClick={handleGoHome}
                            >
                                Ir al Inicio
                            </Button>
                        }
                    />
                </div>
            );
        } else {
            return (
                <>
                    <Menu
                        onClick={handleMenuClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={items}
                    />
                    {selectedComponent}
                    {showPanel && <Panel showPanel={showPanel} />}
                </>
            );
        }
    };

    return <div className="admin-container">{renderContent()}</div>;
};

export default Admin;
