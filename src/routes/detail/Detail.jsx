import { useEffect, useState } from 'react';
import { getDataById } from '../../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoriteContexts';
import Modal from 'react-modal';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Policies from './Policies';
import {
  HeartOutlined,
  HeartFilled,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { Button, message } from 'antd';
import TeacherAvailability from '../../components/teacherAvailability/TeacherAvailability';
import RatingList from '../../routes/ratings/RatingList';
import ImageSection from '../../components/imageSection/ImageSection';
import {
  WhatsappShare,
  FacebookShare,
  LinkedinShare,
  TwitterShare,
} from 'react-share-kit';
import ReservationForm from '../../components/ReservationForm';
import './Detail.css';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, favorites, fetchFavorites } = useFavorites();
  const { userId } = useAuth();
  const [teacherSelected, setTeacherSelected] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);
  const [showPolicies, setShowPolicies] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const [isFavorite,setIsFavorite]=useState()

  // Información tutor
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDataById(id);
        setTeacherSelected(res);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      }
    };

    fetchData();
  }, [id]);

  //Manejo imágenes
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

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  //Manejo favoritos
  useEffect(() => {
    fetchFavorites(userId);
  }, []);
  useEffect(() => {
    if (favorites.length > 0) {
      const idTeacher = parseInt(id);
      const isFavorited = favorites.map(favorite => favorite.id.toString()).includes(idTeacher.toString());
      setIsFavorite(isFavorited);
    }
  }, [favorites, id]);

  const handleToggleFavorite = async () => {
    const idTeacher= parseInt(id)
    if (!userId) {
      message.info('Debes iniciar sesión para marcar favoritos.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);

      return;
    }
    await toggleFavorite(userId, idTeacher);
  };
  
  //Manejo compartir redes
  const openShareModal = () => {
    setShareModalIsOpen(true);
  };

  const closeShareModal = () => {
    setShareModalIsOpen(false);
  };

  //Manejo políticas
  const togglePolicies = () => {
    setShowPolicies(!showPolicies);
  };
  //Redes
  const shareUrl = window.location.href;
  const shareTitle = teacherSelected ? teacherSelected.name : 'Check this out!';

  return (
    <div className="container-detail">
      <div className="section-detail">
        <h2>{teacherSelected && teacherSelected.name}</h2>
        <Button className="btn-go-back" onClick={() => navigate(-1)}>
          <ArrowLeftOutlined className="go-back" />
          Volver
        </Button>
      </div>

      {teacherSelected ? (
        <div className="container-teacher">
          <div className="container-title-detail">
            <p>{teacherSelected.subject.title}</p>
            <p>{teacherSelected.description}</p>
          </div>

          {isFavorite ? (
            <HeartFilled
              onClick={handleToggleFavorite}
              style={{ color: 'red', fontSize: '24px' }}
            />
          ) : (
            <HeartOutlined
              className="not-favorite-icon"
              onClick={handleToggleFavorite}
            />
          )}
        </div>
      ) : (
        <p>Cargando datos del tutor...</p>
      )}

      {/* Sección de imágenes */}
      {teacherSelected && <ImageSection teacherSelected={teacherSelected} />}

      {/* Botones de acción */}
      <div className="buttons-container">
        <button className="more" onClick={openModal}>
          Ver más
        </button>
        <button className="toggle-policies" onClick={togglePolicies}>
          {showPolicies ? 'Ocultar Políticas' : 'Ver Políticas'}
        </button>
        <button className="share" onClick={openShareModal}>
          Compartir
        </button>
      </div>

      {/* Detalles adicionales */}
      <div className="container-characteristics-detail">
        <div className="characteristics-wrapper">
          <h3>Características:</h3>
          <div className="characteristics-list">
            {teacherSelected?.characteristics.map((character) => (
              <div key={character.id} className="character-item">
                <img
                  className="icon-characteristic"
                  src={character.url}
                  alt="icono"
                />
                {character.name}
              </div>
            ))}
          </div>
        </div>

        {/* Disponibilidad y reserva */}
        <div>
          {teacherSelected && (
            <TeacherAvailability
              teacherId={id}
              teacherSelected={teacherSelected}
              userId={userId}
              onSelectRange={setSelectedRange}
            />
          )}
        </div>
      </div>

      {/* Políticas */}
      {showPolicies && (
        <div className="policies-wrapper">
          <Policies />
        </div>
      )}

      {/* Rating */}
      {teacherSelected && (
        <div className="container-ratings">
          <RatingList teacherId={id} />
        </div>
      )}

      {/* Modal de Galería */}
      <Modal
      className="container-gallery"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Galería de Imágenes"
      >
        <h2>Galería de Imágenes</h2>
        {galleryImages.length > 0 && <ImageGallery items={galleryImages} />}
        <Button className="close-button" onClick={closeModal}>
          Cerrar
        </Button>
      </Modal>

      {/* Modal de Compartir */}
      <Modal
        className="share-modal"
        isOpen={shareModalIsOpen}
        onRequestClose={closeShareModal}
        contentLabel="Compartir Producto"
      >
        <div className="share-modal-content">
          <h2>Compartir Producto</h2>
          {teacherSelected && (
            <>
              <img
                src={teacherSelected.images[0].url}
                alt="Imagen principal"
                className="share-image"
              />
              <p>{teacherSelected.description}</p>
              <div className="share-buttons">
                <WhatsappShare
                  url={shareUrl}
                  title={shareTitle}
                  separator=":: "
                />
                <FacebookShare url={shareUrl} quote={shareTitle} />
                <LinkedinShare url={shareUrl} title={shareTitle} />
                <TwitterShare url={shareUrl} title={shareTitle} />
              </div>
              <button className="close-button" onClick={closeShareModal}>
                Cerrar
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Detail;