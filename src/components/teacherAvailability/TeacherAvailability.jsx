import { useState, useEffect } from "react";
import { DatePicker, message } from 'antd';
import { getAvailabilitiesById } from "../../api/api";
import './TeacherAvailability.css'

const { RangePicker } = DatePicker;

const TeacherAvailability = ({ teacherId }) => {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        let availabilityRes = await getAvailabilitiesById(teacherId);
        setAvailability(availabilityRes.map(item => ({
          date: new Date(item.date)
        })));
      } catch (error) {
        message.error('Error al cargar la disponibilidad del tutor.');
    } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [teacherId]);

  const disabledDate = (current) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    return current && (current < today || !availability.some(availableDate => 
      availableDate.date.toDateString() === current.toDate().toDateString()
    ));
  };

  return (
    <div className="calendar-container">
      <h3>Disponibilidad del Tutor:</h3>
     
      {loading ? (
        <p>Cargando disponibilidad...</p>
      ) : availability.length === 0 ? (
        <p>Actualmente no hay disponibilidad para este tutor. Por favor, consulte más tarde.</p>
      ) : (
        <RangePicker
          disabledDate={disabledDate}
        />
      )}
    </div>
  );
};

export default TeacherAvailability;
