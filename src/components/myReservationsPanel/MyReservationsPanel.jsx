import { useEffect, useState } from 'react';
import { getReservationsUser } from '../../api/apiReservations';
import { Table } from 'antd';
import  './MyReservationsPanel.css'
import { useAuth } from '../../contexts/AuthContext';

const MyReservationsPanel = ({ userId }) => {
  const [reservations, setReservations] = useState();
  const {currentUser}=useAuth()

  useEffect(() => {
    const fetchReservations = async () => {
      let res = await getReservationsUser(userId);
      const transformedData = res.map((reservation) => {
        const date = new Date(reservation.startTime);
        const fechaInicio = date.toISOString().split('T')[0]; 
        const horarioInicio = date.toTimeString().split(' ')[0]; 
        const endDate = new Date(reservation.endTime);
        const fechaTermino =endDate.toISOString().split('T')[0]; 
        const horarioTermino = endDate.toTimeString().split(' ')[0]; 

        return {
          key: reservation.id,
          user: reservation.user.firstName+' '+reservation.user.lastName,
          teacher: reservation.teacher.name,
          asignatura:reservation.teacher.subjectTitle,
          email: currentUser.email,
          fechaInicio,
          fechaTermino,
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
      title: 'N° Reserva ',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Usuario ',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Correo electrónico ',
      dataIndex: 'email',
      key: 'email',
    },
  {
    title: 'Tutor ',
    dataIndex: 'teacher',
    key: 'teacher',
  },{
    title: 'Asignatura ',
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
  return <Table   className='panel-reservations'dataSource={reservations} columns={columns}   pagination={{ pageSize: 5}} />;
};

export default MyReservationsPanel;
