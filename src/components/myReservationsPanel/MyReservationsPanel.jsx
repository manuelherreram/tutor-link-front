import { useEffect, useState } from 'react';
import {
  getUserReservations,
  deleteUserReservation,
} from '../../api/apiReservations';
import { Table, message, Button, Collapse } from 'antd';
import dayjs from 'dayjs';
import './MyReservationsPanel.css';
import { DeleteOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

const { Panel } = Collapse;

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
          horario: startDate.format('HH:mm') + '-' + endDate.format('HH:mm'),
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
      width: 50,
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
      width: 50,
    },
    {
      title: 'Tutor',
      dataIndex: 'teacher',
      key: 'teacher',
      width: 50,
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
      width: 50,
    },
    {
      title: 'Fecha  ',
      dataIndex: 'fechaInicio',
      key: 'fechaInicio',
    },
    {
      title: 'Horario ',
      dataIndex: 'horario',
      key: 'horario',
      width: 50,
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

  const currentReservations = reservations.filter((reservation) => {
    const fechaInicio = dayjs(reservation.fechaInicio, 'DD-MM-YYYY');

    return (
      fechaInicio.isAfter(dayjs(), 'day') || fechaInicio.isSame(dayjs(), 'day')
    );
  });

  const pastReservations = reservations.filter((reservation) =>
    dayjs(reservation.fechaInicio, 'DD-MM-YYYY').isBefore(dayjs(), 'day')
  );
  const pastColumns = columns.filter((column) => column.key !== 'actions');
  return (
    <div className="container-reservations">
      <h3 className="title-reservations">Mis Reservas Actuales</h3>
      {currentReservations.length > 0 ? (
        <Table
          className="panel-reservations"
          dataSource={currentReservations}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      ) : (
        <h3 className="no-reservations">No tienes reservas actuales</h3>
      )}

      <Collapse defaultActiveKey={['1']}>
        <Panel
          header="Mis Reservas Anteriores"
          key="1"
          className="title-reservations"
        >
          {pastReservations.length > 0 ? (
            <Table
              className="panel-previus-reservations"
              dataSource={pastReservations}
              columns={pastColumns}
              pagination={{ pageSize: 3 }}
            />
          ) : (
            <h3 className="no-reservations">No tienes reservas anteriores</h3>
          )}
        </Panel>
      </Collapse>
    </div>
  );
};

export default MyReservationsPanel;
