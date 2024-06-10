import React from 'react';
import { Rate } from 'antd';
import './RatingItem.css';

const RatingItem = ({ rating }) => {
  return (
    <div className="rating-item">
      <div className="rating-header">
        <span>{rating.user.name}</span>
        <Rate disabled value={rating.value} />
      </div>
      <p>{rating.comment}</p>
    </div>
  );
};

export default RatingItem;