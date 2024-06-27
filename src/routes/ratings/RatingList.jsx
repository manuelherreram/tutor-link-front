import  { useEffect, useState } from 'react';
import { getRatingByTeacherId } from '../../api/api';
import RatingItem from './RatingItem';
import './RatingList.css';
import { useAuth } from '../../contexts/AuthContext';
import AddRating from './AddRating';

const RatingList = ({ teacherId }) => {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [showRatings, setShowRatings] = useState(false);
  const { userId } = useAuth();

  const fetchRatings = async () => {
    try {
      const res = await getRatingByTeacherId(teacherId);
      if (Array.isArray(res)) {
        setRatings(res);
        const average = res.reduce((acc, rating) => acc + rating.rating, 0) / res.length;
        setAverageRating(average);
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

  const toggleShowRatings = () => {
    setShowRatings(!showRatings);
  };

  return (
    <div>
    <div className="ratings-list">
      <h3>Calificaciones:</h3>
      <p>Promedio de calificaciones: {averageRating.toFixed(2)}</p>
      <button className="button-comments" onClick={toggleShowRatings}>
        {showRatings ? 'Ocultar comentarios' : 'Ver todas las calificaciones'}
      </button>
      {showRatings && ratings.length > 0 ? (
        ratings.map(rating => (
          <RatingItem key={rating.id} rating={rating} userId={userId}/>
        ))
      ) : (
        <p> </p>
      )}
    </div>
    <AddRating teacherId={teacherId} onRatingAdded={fetchRatings}/>
    </div>
  );
};

export default RatingList;