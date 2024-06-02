import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Card.css'
import { HeartOutlined,  HeartFilled} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import {  notification } from 'antd';


const Card = ({name, category, image, description, id}) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const {userLoggedIn} = useAuth();
   const navigate= useNavigate()
    
    const toggleFavorite = () => {
        if (userLoggedIn) { 
          setIsFavorited(!isFavorited);
          
        } else {
            notification.error({
                message: 'Error',
                description: 'Inicia asesión para poder guardar tus favoritos',
                duration: 3, 
              });
          navigate('/login')
        }
      };

   
return(
    <div className="card">
            <div className="card-image">
                <img src={image} alt="" />
                <div className="favorite-icon" onClick={toggleFavorite}>
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