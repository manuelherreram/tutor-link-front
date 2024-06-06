import { Link, useNavigate } from 'react-router-dom';
import './Card.css'
import { HeartOutlined,  HeartFilled} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import {  notification } from 'antd';
import {useFavorites} from '../../contexts/FavoriteContexts'


const Card = ({name, category, image, description, id}) => {
    const {favorites, toggleFavorite} = useFavorites();
    const isFavorited = favorites.includes(id);
    const {userLoggedIn} = useAuth();
   const navigate= useNavigate()
    
   const handleToggleFavorite = () => {
    if (userLoggedIn) {
        toggleFavorite(id);
    } else {
        notification.error({
            message: 'Error',
            description: 'Inicia sesión para poder guardar tus favoritos',
            duration: 3,
        });
        navigate('/login');
    }
};

   
return(
    <div className="card">
            <div className="card-image">
                <img src={image} alt="" />
                <div className="favorite-icon" onClick={handleToggleFavorite}>
                    {isFavorited ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined style={{ color: 'white' }} />}
                </div>
            </div>
            <div className='card-body'>
                <div className='card-name'>
                    <p>{ name }</p>
                </div>
                <div className='card-category'>
                    <p>{ category }</p>
                </div>
                <div className='card-description'>
                    <p>{ description }</p>
                </div>
            </div>
            <div className='card-footer'>
                <Link to={`detalle/${id}`}><button className='card-button'>Conectar</button></Link>
            </div>
        </div>
    );
};

export default Card;