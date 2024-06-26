import React, { useEffect, useState } from 'react';
import { getUserId } from '../../api/api';
import { Rate } from 'antd';
import './RatingItem.css';
import {useAuth} from '../../contexts/AuthContext'

const RatingItem = ({ rating, userId }) => {
  const [userName, setUserName] = useState('');
  const {currentUser}=useAuth();

  if (!rating.comment) {
    console.error('El objeto de calificación no tiene la estructura esperada:', rating);
    return null; // O renderiza un mensaje de error/aviso
  }

  return (
    <div className="rating-item">
      <p>{rating.userId === userId ? 'Tú' : currentUser.displayName}</p>
      <div className="rating-header">
        <span>{userName}</span>
        <Rate disabled value={rating.rating} />
      </div>
      <p>{rating.comment}</p>
    </div>
  );
};

export default RatingItem;