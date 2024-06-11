import { useState, useEffect } from 'react';
import { DatePicker, Space, message } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getAvailabilitiesById } from '../../api/apiReservations';
import './TeacherAvailability.css';

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const TeacherAvailability = ({ teacherId, onSelectRange }) => {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        let availabilityRes = await getAvailabilitiesById(teacherId);
        setAvailability(
          availabilityRes.map((item) => ({
            date: new Date(item.date),
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      current &&
      (current < today ||
        !availability.some(
          (availableDate) =>
            availableDate.date.toDateString() ===
            current.toDate().toDateString()
        ))
    );
  };
  const handleRangeChange = (dates) => {
    if (dates && dates.length === 2) {
      console.log('Rango seleccionado:', dates);
      onSelectRange(dates); 
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
            onChange={handleRangeChange}
          />
        </Space>
      )}
    </div>
  );
};

export default TeacherAvailability;
