import  { useState, useEffect } from 'react';
import { DatePicker, Space, message, Modal } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getAvailabilitiesById } from '../../api/apiReservations';
import './TeacherAvailability.css';
import { useAuth } from '../../contexts/AuthContext'; 
import ReservationForm from '../../components/ReservationForm'; 
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const TeacherAvailability = ({ userId, teacherId,teacherSelected }) => {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const { userLoggedIn } = useAuth(); 
 const {name, description,images}=teacherSelected
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

    if (type === 'start' || type === 'end') {
      return {
        disabledHours: () =>
          range(0, 24).filter((hour) => !availableHours.includes(hour)),
      };
    }
  };

  const disabledDate = (current) => {
    const today = dayjs().startOf('day');
    return (
      current &&
      (current < today ||
        !availability.some(
          (availableDate) =>
            availableDate.date.isSame(current, 'day')
        ))
    );
  };

  const handleRangeChange = (dates) => {
    console.log('handleRangeChange called with dates:', dates);

    if (dates && dates.length === 2) {
      const [start, end] = dates.map(date => dayjs(date));
      console.log('Parsed dates:', { start, end });

      // Validación del rango de fechas seleccionado
      if (!start.isValid() || !end.isValid()) {
        console.error('Invalid dates:', { start, end });
        message.error('El rango de fechas seleccionado no es válido.');
        return;
      }

      if (start.isAfter(end)) {
        console.error('Start date is after end date:', { start, end });
        message.error('El rango de fechas seleccionado no es válido.');
        return;
      }

      // Validación adicional para las horas
      const startTime = start.hour();
      const endTime = end.hour();
      console.log('Start time:', startTime, 'End time:', endTime);

      if (startTime > endTime) {
        console.error('Start time is after end time:', { startTime, endTime });
        message.error('La hora de inicio debe ser anterior a la hora de fin.');
        return;
      }

      console.log('Valid range selected:', { start, end });
      setSelectedDates(dates);
      setIsModalVisible(true);
    } else {
      console.warn('Dates array is invalid or empty:', dates);
    }
  };

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
              defaultValue: [dayjs('08:00', 'HH:mm'), dayjs('20:00', 'HH:mm')],
            }}
            format="YYYY-MM-DD HH:mm"
            onChange={(dates) => {
              console.log('RangePicker onChange fired with dates:', dates);
              handleRangeChange(dates);
            }}
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
        <p>Está a punto de reservar una hora con {name} {description}desde {selectedDates[0]?.format('YYYY-MM-DD HH:mm')} hasta {selectedDates[1]?.format('YYYY-MM-DD HH:mm')}</p>
        {userLoggedIn ? (
          <ReservationForm 
           userId={userId}
           userLoggedIn={userLoggedIn}
            teacherId={teacherId} 
            selectedRange={selectedDates} 
          />
        ) : (
          <p>Debes iniciar sesión para confirmar la reserva.</p>
        )}
      </Modal>
    </div>
  );
};

export default TeacherAvailability;
