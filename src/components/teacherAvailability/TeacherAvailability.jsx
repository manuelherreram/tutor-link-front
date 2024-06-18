import { useState, useEffect } from 'react';
import { DatePicker, Space, message, Modal,Button} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getAvailabilitiesById } from '../../api/apiReservations';
import './TeacherAvailability.css';
import { useAuth } from '../../contexts/AuthContext';
import ReservationForm from '../../components/ReservationForm';
import { useNavigate } from 'react-router-dom';

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const TeacherAvailability = ({ userId, teacherId, teacherSelected }) => {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const { userLoggedIn } = useAuth();
  const { name, description } = teacherSelected;
const navigate= useNavigate()

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        let availabilityRes = await getAvailabilitiesById(teacherId);
        setAvailability(
          availabilityRes.map((item) => ({
            date: dayjs(item.date),
            startTime: item.startTime,
            endTime: item.endTime,
          }))
        );
      } catch (error) {
        message.error('Error al cargar la disponibilidad del tutor.');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [teacherId]);

  const rangePickerDisabledDateTime = (current, type) => {
    const availableHours = availability
      .filter((item) => dayjs(item.date).isSame(current, 'day'))
      .flatMap((item) => {
        const startHour = parseInt(item.startTime.substring(0, 2), 10);
        const endHour = parseInt(item.endTime.substring(0, 2), 10);
        return range(startHour, endHour + 1);
      });

    return {
      disabledHours: () =>
        range(0, 24).filter((hour) => !availableHours.includes(hour)),
      disabledMinutes: (selectedHour) => {
        if (!availableHours.includes(selectedHour)) {
          return range(0, 60);
        }
        const currentHour = dayjs().hour();
        if (selectedHour === currentHour) {
          return range(0, dayjs().minute());
        }
        return [];
      },
      disabledSeconds: () => [],
    };
  };

  const disabledDate = (current) => {
    const today = dayjs().startOf('day');
    return (
      current &&
      (current < today ||
        !availability.some((availableDate) =>
          availableDate.date.isSame(current, 'day')
        ))
    );
  };

  const handleRangeChange = (dates) => {
    if (dates && dates.length === 2) {
      const [start, end] = dates.map((date) => dayjs(date));

      if (!start.isValid() || !end.isValid()) {
        message.error('El rango de fechas seleccionado no es válido.');
        return;
      }

      if (!start.isSame(end, 'day')) {
        message.error('Las horas seleccionadas deben estar en el mismo día.');
        return;
      }

      setSelectedDates(dates);
      setIsModalVisible(true);
    }
  };
 const handleLogin =()=>{
 navigate('/login')
 }

  return (
    <div className="calendar-container">
      <h3>Disponibilidad del Tutor:</h3>

      {loading ? (
        <p>Cargando disponibilidad...</p>
      ) : availability.length === 0 ? (
        <p>
          Actualmente no hay disponibilidad para este tutor. Por favor, consulte
          más tarde.
        </p>
      ) : (
        <Space direction="vertical" size={12}>
          <RangePicker
            disabledDate={disabledDate}
            disabledTime={rangePickerDisabledDateTime}
            showTime={{
              format: 'HH:mm',
              defaultValue: [
                dayjs('08:00', 'HH:mm'),
                dayjs('20:00', 'HH:mm').subtract(1, 'minute'),
              ],
            }}
            format="YYYY-MM-DD HH:mm"
            onChange={(dates) => handleRangeChange(dates)}
          />
        </Space>
      )}

      <Modal
        title="Confirmar Reserva"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        
       
        {userLoggedIn ? (
          <div>
        <div>
          <strong>Está a punto de reservar una hora con {name}</strong>
          <div>{description}</div>
          <div>desde {selectedDates[0]?.format('DD-MM-YYYY HH:mm')}</div>
          <div>hasta {selectedDates[1]?.format('DD-MM-YYYY HH:mm')}</div>
        </div>
        
          <ReservationForm
            userId={userId}
            teacherId={teacherId}
            selectedRange={selectedDates}
          />
          </div>
        ) : (
          <div>
            <strong>Debes iniciar sesión para confirmar la reserva.</strong>
            <Button type="primary" onClick={handleLogin} >Iniciar sesión</Button>
            </div>
        )}
      </Modal>
    </div>
  );
};

export default TeacherAvailability;
