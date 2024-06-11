
import { Button, message } from 'antd';
import { addReservation } from '../api/apiReservations';
import dayjs from 'dayjs';

const ReservationForm = ({ userId, teacherId, selectedRange }) => {
  const handleReserve = async () => {
    if (!selectedRange || selectedRange.length !== 2) {
      message.error('Por favor, seleccione un rango de fechas válido.');
      return;
    }

    const [start, end] = selectedRange.map(date => dayjs(date));
    try {
      await addReservation(userId, teacherId, start, end);
      message.success('Reserva realizada con éxito.');
    } catch (error) {
      message.error('Error al realizar la reserva.');
    }
  };

  return (
    <div>
       <Button type="primary" onClick={handleReserve} disabled={!selectedRange || selectedRange.length !== 2}>
        Reservar
      </Button>
    </div>
  );
};

export default ReservationForm;
