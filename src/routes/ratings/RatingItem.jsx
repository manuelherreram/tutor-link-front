import React from 'react';
import { Rate } from 'antd';
import './RatingItem.css';

const RatingItem = ({ rating }) => {
  if (rating.userId === undefined || rating.rating === undefined || !rating.comment) {
    console.error('El objeto de calificación no tiene la estructura esperada:', rating);
    return null; // O renderiza un mensaje de error/aviso
  }

  return (
    <div className="rating-item">
      <div className="rating-header">
        <span>Usuario ID: {rating.userId}</span>
        <Rate disabled value={rating.rating} />
      </div>
      <p>{rating.comment}</p>
    </div>
  );
};

export default RatingItem;