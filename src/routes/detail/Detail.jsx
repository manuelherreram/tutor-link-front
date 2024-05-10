import { useEffect, useState } from 'react';
import { getDataById } from '../../api/api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Detail.css';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacherSelected, setTeacherSelected] = useState();

  useEffect(() => {
    const getById = async () => {
      let res = await getDataById(id);
      setTeacherSelected(res);
      console.log(teacherSelected);
    };

    getById();
  }, [id]);

  return (
    <div className="container-detail">
      <div className="section-detail">
        <h1>Detalles del Tutor</h1>
        <button className="btn-go-back" onClick={() => navigate(-1)}>
          ⬅️
        </button>
      </div>
      <div className="container-section">
        {teacherSelected ? (
          <div className="container-teacher">
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

        <section className="container-image">
          <img src="/vite.svg " alt="imagen 1 " className="first-image " />
          <img src="/vite.svg" alt="imagen 2 " />
          <img src="/vite.svg" alt="imagen 3" />
          <img src="/vite.svg" alt="imagen 4" />
          <img src="/vite.svg" alt="imagen 5" />
          <button className="more">ver más</button>
        </section>
      </div>
    </div>
  );
};

export default Detail;
