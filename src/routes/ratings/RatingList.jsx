import React, { useEffect, useState } from 'react';
import { getRatingByTeacherId } from '../../api/api';
import RatingItem from './RatingItem';
import './RatingList.css';

const RatingList = ({ teacherId }) => {
  const [ratings, setRatings] = useState([]);

  const fetchRatings = async () => {
    try {
      const res = await getRatingByTeacherId(teacherId);
      console.log('Ratings fetched:', res);
      if (Array.isArray(res)) {
        setRatings(res);
      } else {
        console.error('La respuesta de getRatingByTeacherId no es un array:', res);
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [teacherId]);

  return (
    <div className="rating-list">
      <h3>Calificaciones:</h3>
      {ratings.length > 0 ? (
        ratings.map(rating => (
          <RatingItem key={rating.id} rating={rating} />
        ))
      ) : (
        <p>No hay calificaciones disponibles.</p>
      )}
    </div>
  );
};

export default RatingList;