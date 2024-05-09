import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Detail.css';

const Detail = () => {
  const { id } = useParams();
  const { teacherSelected, setTeacherSelected } = useState();

  useEffect(() => {
    const getDataById = async (id) => {
      let res = await axios.get(`http://localhost:8080/api/teachers/${id}`);
      setTeacherSelected(res.data);
      console.log(teacherSelected);
    };

    getDataById();
  }, [id]);

  return (
    <div className="container-detail">
      <h1>Detalles del Tutor</h1>

      {teacherSelected && teacherSelected.length > 0 ? (
        <div>
          <h2>Nombre: {teacherSelected.name}</h2>
          <p>DNI: {teacherSelected.dni}</p>
          <p>Descripción: {teacherSelected.description}</p>
          <img
            src={teacherSelected.img}
            alt={`imagen de ${teacherSelected.name}`}
          />
        </div>
      ) : (
        <p>Cargando datos del tutor...</p>
      )}
    </div>
  );
};

export default Detail;
