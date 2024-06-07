import { useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useFavorites } from '../../contexts/FavoriteContexts';
import { useAuth } from '../../contexts/AuthContext';

const Favorites = () => {
    const { favorites, toggleFavorite, fetchFavorites } = useFavorites();
   console.log(favorites)
    const { userId } = useAuth();

    useEffect(() => {
        if (userId) {
            fetchFavorites(userId);
        }
    }, []);

    const handleRemoveFavorite = async (teacherId) => {
        try {
            await toggleFavorite(userId, teacherId);
            message.success('Favorito eliminado con éxito');
            fetchFavorites(userId)

        } catch (error) {
            console.error('Error removing favorite:', error);
            message.error('Error al eliminar el favorito');
        }
    };

    const columns = [
        {
            title: 'Tutor',
            dataIndex: 'name',
            key: 'id',
        },
        {
            title: 'Asignatura',
            dataIndex: ['subject', 'title'],
            key: 'subject',
        },
        {
            title: 'Acción',
            key: 'action',
            render: (text, record) => (
                <Button 
                    onClick={() => handleRemoveFavorite(record.id)} 
                    icon={<DeleteOutlined />}
                    danger
                >
                    Eliminar
                </Button>
            ),
        },
    ];

    return (
        <div className="container-favorites">
            <h3 className="favorites-title">Mis Favoritos</h3>
            <Table columns={columns} dataSource={favorites} rowKey="id" />
        </div>
    );
};

export default Favorites;