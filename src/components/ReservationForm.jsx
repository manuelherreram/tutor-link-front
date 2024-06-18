import { Button, message } from 'antd';
import { addReservation } from '../api/apiReservations';
import dayjs from 'dayjs';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ReservationForm = ({ userId, teacherId, selectedRange }) => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleReserve = async () => {
    setIsSubmitting(true);
    const [start, end] = selectedRange.map((date) => dayjs(date));

    if (!selectedRange || selectedRange.length !== 2) {
      message.error('Por favor, seleccione un rango de fechas válido.');
      setIsSubmitting(false);
      return;
    }

    if (!userLoggedIn) {
      message.info('Debes iniciar sesión para realizar reservas.');
      navigate('/login');
      setIsSubmitting(false);
      return;
    }

    if (start.isSame(end)) {
      message.error('El horario de inicio no puede ser igual al de término.');
      setIsSubmitting(false);
      return;
    }

    try {
      await addReservation(userId, teacherId, start, end);
      message.success('Reserva realizada con éxito.');
      navigate('/reservations');
    } catch (error) {
      message.error('Error al realizar la reserva.');
    }
  };
  const handleCancel = () => {
    navigate('/'); 
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={handleReserve}
        disabled={!selectedRange || selectedRange.length !== 2}
      >
        Confirmar Reserva
      </Button>
      <button
      className='btn-cancel'
        type="default"
        onClick={handleCancel}
        
      >
        Cancelar
      </button>
    </div>
  );
};

export default ReservationForm;

