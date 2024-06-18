import { useEffect, useState } from 'react';
import { getReservationsUser } from '../../api/apiReservations';
import { Table } from 'antd';
import dayjs from 'dayjs';
import './MyReservationsPanel.css';
import { useAuth } from '../../contexts/AuthContext';

const MyReservationsPanel = ({ userId }) => {
  const [reservations, setReservations] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchReservations = async () => {
      let res = await getReservationsUser(userId);
      const transformedData = res.map((reservation) => {
        const startDate = dayjs(reservation.startTime);
        const endDate = dayjs(reservation.endTime);

        return {
          key: reservation.id,
          user: `${reservation.user.firstName} ${reservation.user.lastName}`,
          teacher: reservation.teacher.name,
          asignatura: reservation.teacher.subjectTitle,
          email: currentUser.email,
          fechaInicio: startDate.format('DD-MM-YYYY'),
          fechaTermino: endDate.format('DD-MM-YYYY'),
          horarioInicio: startDate.format('HH:mm'),
          horarioTermino: endDate.format('HH:mm'),
        };
      });
      setReservations(transformedData);
    };
    fetchReservations();
  }, [userId, currentUser]);

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
      title: 'Fecha Inicio',
      dataIndex: 'fechaInicio',
      key: 'fechaInicio',
    },
    {
      title: 'Fecha Término',
      dataIndex: 'fechaTermino',
      key: 'fechaTermino',
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
  ];

  return (
    <Table
      className='panel-reservations'
      dataSource={reservations}
      columns={columns}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default MyReservationsPanel;
