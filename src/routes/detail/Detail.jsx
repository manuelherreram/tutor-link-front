import { useEffect, useState } from 'react';
import { getDataById } from '../../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoriteContexts';
import './Detail.css';
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
import AddRating from '../../routes/ratings/AddRating';
import UpdateRating from '../../routes/ratings/UpdateRating';

import {
  WhatsappShare,
  FacebookShare,
  LinkedinShare,
  TwitterShare,
} from 'react-share-kit';

import ReservationForm from '../../components/ReservationForm';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, favorites, fetchFavorites } = useFavorites();
  const [teacherSelected, setTeacherSelected] = useState();
  const [galleryImages, setGalleryImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);
  const [showPolicies, setShowPolicies] = useState(false);
  const { userId } = useAuth();
  const [selectedRange, setSelectedRange] = useState(null);

  //Manejo Imágenes
  useEffect(() => {
    const getById = async () => {
      let res = await getDataById(id);
      setTeacherSelected(res);
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
  //Manejo Galería Imágenes
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  //Manejo Favoritos
  useEffect(() => {
    fetchFavorites(userId);
  }, []);

  const handleToggleFavorite = async () => {
    if (!userId) {
      message.info('Debes iniciar sesión para marcar favoritos.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);

      return;
    }
    await toggleFavorite(userId, id);
  };
  useEffect(() => {
    console.log('mis favoritos:', favorites);
  }, [favorites]);
  const isFavorite = favorites.map(({ id }) => id).includes(id);

  //Manejo Compartir Redes
  const openShareModal = () => {
    setShareModalIsOpen(true);
  };

  const closeShareModal = () => {
    setShareModalIsOpen(false);
  };

  //Manejo Policies
  const togglePolicies = () => {
    setShowPolicies(!showPolicies);
  };

  //Redes
  const shareUrl = window.location.href;
  const shareTitle = teacherSelected ? teacherSelected.name : 'Check this out!';

  //Manejo Disponibilidad
  const handleSelectRange = (range) => {
    setSelectedRange(range);
  };

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
      {teacherSelected && teacherSelected.images && (
        //imágenes
        <div>
          <section className="container-image">
            <div className="cont-first-img">
              <img
                src={teacherSelected.images[0].url}
                alt={`imagen1`}
                className="first-image"
              />
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
            </div>
          </section>
          <div className="container-characteristics-detail">
            <div className="characteristics-wrapper">
              <h3>Características:</h3>
              <div className="characteristics-list">
                {teacherSelected.characteristics.map((character) => (
                  <div key={character.id} className="character-item">
                    {character.name}
                  </div>
                ))}
              </div>
            </div>
            {/* Disponibilidad  */}
            <div>
              {teacherSelected && (
                <TeacherAvailability
                  teacherId={id}
                  userId={userId}
                  onSelectRange={setSelectedRange}
                />
              )}
              {/* Reserva  */}
              {selectedRange && (
                <ReservationForm
                  userId={userId}
                  teacherId={parseInt(id)}
                  selectedRange={selectedRange}
                />
              )}
            </div>
          </div>
          {/* Policies  */}
          {showPolicies && (
            <div className="policies-wrapper">
              <Policies />
            </div>
          )}
        </div>
      )}
      {/* Rating  */}
      {teacherSelected && (
        <div className="container-ratings">
          <RatingList teacherId={id} />
          <AddRating teacherId={id} onRatingAdded={() => {}} />
        </div>
      )}
      {/* Galería  */}
      <Modal
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
      {/* Compartir  */}
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
