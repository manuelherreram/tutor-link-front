import  { useEffect, useState } from 'react';
import { Rate } from 'antd';
import './RatingItem.css';

import { getUserById } from '../../api/api';

const RatingItem = ({  rating, userId }) => {
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName]=useState('');

 

  useEffect(()=>{
    const getName= async()=>{
      let res= await getUserById(rating.userId)
     setUserName(res.firstName )
     setUserLastName(res.lastName)
    }
getName()
  },[])

  if (!rating.comment) {
    console.error('El objeto de calificación no tiene la estructura esperada:', rating);
    return null; // O renderiza un mensaje de error/aviso
  }

  return (
    <div className="rating-item">
      <p className='rating-item-name'>{rating.userId === userId ? 'Tú' : `${userName} ${userLastName}`}</p>
      <div className="rating-header">
        <Rate disabled value={rating.rating} />
      </div>
      <p>{rating.comment}</p>
    </div>
  );
};

export default RatingItem;