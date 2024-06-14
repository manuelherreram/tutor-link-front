import { Button, message } from 'antd';
import { addReservation } from '../api/apiReservations';
import dayjs from 'dayjs';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ReservationForm = ({ userId, teacherId, selectedRange }) => {
  
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleReserve = async () => {
    if (!selectedRange || selectedRange.length !== 2) {
      message.error('Por favor, seleccione un rango de fechas válido.');
      return;
    }

    if (!userLoggedIn) {
      message.info('Debes iniciar sesión para realizar reservas.');
      navigate('/login');
      return;
    }
    if (start.isSame(end)) {
      message.error('El horario de inicio no puede ser igual al de término.');
      return;
    }

    const [start, end] = selectedRange.map(date => dayjs(date));
    console.log('Selected range for reservation:', start, end);

    try {
      await addReservation(userId, teacherId, start, end);
      message.success('Reserva realizada con éxito.');
      navigate('/reservations');
    } catch (error) {
      message.error('Error al realizar la reserva.');
    }
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
    </div>
  );
};

export default ReservationForm;
