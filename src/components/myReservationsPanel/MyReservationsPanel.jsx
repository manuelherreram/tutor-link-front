import { useEffect, useState } from 'react';
import {
  getUserReservations,
  deleteUserReservation,
} from '../../api/apiReservations';
import { Table, message, Button } from 'antd';
import dayjs from 'dayjs';
import './MyReservationsPanel.css';
import { DeleteOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

const MyReservationsPanel = ({ userId }) => {
  const [reservations, setReservations] = useState([]);
  const { currentUser } = useAuth();
  const [reservationDeleted, setReservationDeleted] = useState([]);

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    const fetchReservations = async () => {
      let res = await getUserReservations(userId);
      const transformedData = res.map((reservation) => {
        const startDate = dayjs(reservation.startTime);
        const endDate = dayjs(reservation.endTime);
        const place = `Sala de conferencias ${getRandomInt(1, 100)}`; // Generar número aleatorio para el lugar

        return {
          key: reservation.id,
          status: reservation.status,
          user: `${reservation.user.firstName} ${reservation.user.lastName}`,
          teacher: reservation.teacher.name,
          asignatura: reservation.teacher.subjectTitle,
          email: currentUser.email,
          place, 
          fechaInicio: startDate.format('DD-MM-YYYY'),
          horarioInicio: startDate.format('HH:mm'),
          horarioTermino: endDate.format('HH:mm'),
        };
      });
      setReservations(transformedData);
    };
    fetchReservations();
  }, [userId, currentUser, reservationDeleted]);

  const columns = [
    {
      title: 'N° Reserva',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Usuario',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Correo electrónico',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tutor',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: 'Asignatura',
      dataIndex: 'asignatura',
      key: 'asignatura',
    },
    {
      title: 'Lugar',
      dataIndex: 'place',
      key: 'place',
    },
    {
      title: 'Fecha ',
      dataIndex: 'fechaInicio',
      key: 'fechaInicio',
    },
    {
      title: 'Horario Inicio',
      dataIndex: 'horarioInicio',
      key: 'horarioInicio',
    },
    {
      title: 'Horario Término',
      dataIndex: 'horarioTermino',
      key: 'horarioTermino',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Button
          className="deleteReservation"
          icon={<DeleteOutlined className="deleteReservation" />}
          onClick={() => handleDelete(record.key)}
        >
          Anular
        </Button>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await deleteUserReservation(id);
      const newData = reservations.filter(
        (reservation) => reservation.id !== id
      );
      setReservationDeleted(newData);
      message.success('Reserva eliminada exitosamente');
    } catch (error) {
      console.error('Error deleting reservation:', error);
      message.error('Error al eliminar la reserva');
    }
  };

  return reservations.length > 0 ? (
    <div>
      <h3 className="title-reservations">Mis Reservas</h3>
      <Table
        className="panel-reservations"
        dataSource={reservations}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  ) : (
    <h3 className="no-reservations">No has realizado reservas aún </h3>
  );
};

export default MyReservationsPanel;
