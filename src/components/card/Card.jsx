import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorites } from '../../contexts/FavoriteContexts';
import { message } from 'antd';
import './Card.css';

const Card = ({ name, category, image, description, id }) => {
  const { favorites, toggleFavorite, fetchFavorites } = useFavorites();
  const { userId } = useAuth();
  const navigate = useNavigate();
  
 //Manejo favoritos
 useEffect(() => {
  fetchFavorites(userId);
}, []);

const handleToggleFavorite = async () => {
  if (!userId) {
    message.info('Debes iniciar sesión para marcar favoritos.');
    setTimeout(() => {
      navigate('/login');
    }, 2000);

    return;
  }
  await toggleFavorite(userId, id);
};

const isFavorite = favorites.map(({ id }) => id).includes(id);

  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt="" />
        <div className="favorite-icon" onClick={handleToggleFavorite}>
          {isFavorite ? (
            <HeartFilled style={{ color: 'red' }} />
          ) : (
            <HeartOutlined style={{ color: 'white' }} />
          )}
        </div>
      </div>
      <div className="card-body">
        <div className="card-name">
          <p>{name}</p>         
        </div>
        <div className="card-category">
          <p>{category}</p>
        </div>
        <div className="card-description">
          <p>{description}</p>
        </div>
      </div>
      <div className="card-footer">
        <Link to={`/detalle/${id}`}>
          <button className="card-button">Conectar</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
