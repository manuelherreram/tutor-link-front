import { useEffect, useState } from 'react';
import { getReservationsUser } from '../../api/apiReservations';
import { Table } from 'antd';
import  './MyReservationsPanel.css'

const MyReservationsPanel = ({ userId }) => {
  const [reservations, setReservations] = useState();

  useEffect(() => {
    const fetchReservations = async () => {
      let res = await getReservationsUser(userId);
      const transformedData = res.map((reservation) => {
        const date = new Date(reservation.startTime);
        const fecha = date.toISOString().split('T')[0]; 
        const horarioInicio = date.toTimeString().split(' ')[0]; 

        const endDate = new Date(reservation.endTime);
        const horarioTermino = endDate.toTimeString().split(' ')[0]; 

        return {
          key: reservation.id,
          userId: reservation.userId,
          teacher: reservation.teacher.name,
          fecha,
          horarioInicio,
          horarioTermino,
        };
      });
      setReservations(transformedData);
    };
    fetchReservations();
  }, [userId]);

  const columns = [
  {
    title: 'Tutor ',
    dataIndex: 'teacher',
    key: 'teacher',
  },
  {
    title: 'Fecha',
    dataIndex: 'fecha',
    key: 'fecha',
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
  return <Table  className='Panel-Reservations'dataSource={reservations} columns={columns} />;
};

export default MyReservationsPanel;
