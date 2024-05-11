import { useEffect, useState } from 'react';
import { getDataById } from '../../api/api';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
        <h2>{teacherSelected && teacherSelected.name}</h2>
        <button className="btn-go-back" onClick={() => navigate(-1)}>
          ⬅️
        </button>
      </div>

      {teacherSelected ? (
        <div className="container-teacher">
          <p>{teacherSelected.dni}</p>
          <p> {teacherSelected.description}</p>
        </div>
      ) : (
        <p>Cargando datos del tutor...</p>
      )}
      {teacherSelected && teacherSelected.images && (
      <section className="container-image">
        <div className="cont-first-img">
            <Link to=""><img
              src={teacherSelected.images[0].url}
              alt={`imagen1`}
              className="first-image"
            /></Link>
        </div>
        <div className='container-grid'>
        <div className="cont-other-img">
          {teacherSelected.images.slice(1).map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`imagen${index + 2}`}
              className="item-image"
            />
          ))}
         
        </div>
        <button className="more">ver más</button>
        </div>
      </section>
      )}
    </div>
  );
};

export default Detail;
