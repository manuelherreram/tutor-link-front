import { useEffect, useState } from "react";
import { getDataById } from "../../api/api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Detail.css";
import Modal from "react-modal";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacherSelected, setTeacherSelected] = useState();
  const [galleryImages, setGalleryImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  // Función para cerrar la modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const getById = async () => {
      let res = await getDataById(id);
      setTeacherSelected(res);
      console.log(teacherSelected);
    };

    getById();
  }, [id]);

  useEffect(() => {
    if (teacherSelected && teacherSelected.images) {
      const formattedImages = teacherSelected.images.map((image, index) => ({
        original: image.url,
        thumbnail: image.url,
        description: `Imagen ${index + 1}`,
      }));
      setGalleryImages(formattedImages);
    }
  }, [teacherSelected]);

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
          <p>{teacherSelected.subject.title}</p>
          <p> {teacherSelected.description}</p>
        </div>
      ) : (
        <p>Cargando datos del tutor...</p>
      )}
      {teacherSelected && teacherSelected.images && (
        <section className="container-image">
          <div className="cont-first-img">
            <Link to="">
              <img
                src={teacherSelected.images[0].url}
                alt={`imagen1`}
                className="first-image"
              />
            </Link>
          </div>
          <div className="container-grid">
            <div className="cont-other-img">
              {teacherSelected.images.slice(1, 5).map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`imagen${index + 2}`}
                  className="item-image"
                />
              ))}
            </div>
            <button className="more" onClick={openModal}>
              ver más
            </button>
          </div>
        </section>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Galería de Imágenes"
      >
        {/* Contenido de la modal */}
        <h2>Galería de Imágenes</h2>
        {galleryImages.length > 0 && <ImageGallery items={galleryImages} />}
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
  );
};

export default Detail;
