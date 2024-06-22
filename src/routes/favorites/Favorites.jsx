import { useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useFavorites } from '../../contexts/FavoriteContexts';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Favorites.css';

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, fetchFavorites } = useFavorites();
  console.log(favorites);
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
      fetchFavorites(userId);
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
          icon={<DeleteOutlined className="deleteFav" />}
          className="deleteFav"
        >
          Eliminar
        </Button>
      ),
    },
  ];

  return (
    <div className="container-favorites">
      <Button className="arrow-favorites" onClick={() => navigate('/profile')}>
        <ArrowLeftOutlined />
        Ir a mi perfil
      </Button>
      <h3 className="favorites-title">Mis Favoritos</h3>
      {favorites.length > 0 ? (
        <Table
          className="favorites-table"
          columns={columns}
          dataSource={favorites}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      ) : (
        <p className="no-favorites">Aún no has seleccionado favoritos</p>
      )}
    </div>
  );
};

export default Favorites;
