import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getRatingByTeacherId, updateRating } from '../../api/api';
import { Rate, Button, Input, message } from 'antd';
import './UpdateRating.css';

const { TextArea } = Input;

const UpdateRating = ({ ratingId, onRatingUpdated }) => {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState('');
  const { userId } = useAuth();

  useEffect(() => {
    const fetchRating = async () => {
      const rating = await getRatingById(ratingId);
      setValue(rating.value);
      setComment(rating.comment);
    };

    fetchRating();
  }, [ratingId]);

  const handleSubmit = async () => {
    if (value === 0 || comment === '') {
      message.warning('Por favor, completa todos los campos.');
      return;
    }

    const rating = { id: ratingId, value, comment, userId };
    await updateRating(rating);
    message.success('Calificación actualizada con éxito!');
    onRatingUpdated();
  };

  return (
    <div className="update-rating">
      <h3>Actualizar Calificación</h3>
      <Rate onChange={setValue} value={value} />
      <TextArea
        rows={4}
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        placeholder="Escribe tu comentario"
      />
      <Button type="primary" onClick={handleSubmit}>
        Actualizar
      </Button>
    </div>
  );
};

export default UpdateRating;