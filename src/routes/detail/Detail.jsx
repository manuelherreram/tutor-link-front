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
import {
  WhatsappShare,
  FacebookShare,
  LinkedinShare,
  TwitterShare,
} from "react-share-kit";


const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, favorites, fetchFavorites } = useFavorites();
  const [teacherSelected, setTeacherSelected] = useState();
  const [galleryImages, setGalleryImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showPolicies, setShowPolicies] = useState(false);
  const { userId } = useAuth();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const togglePolicies = () => {
    setShowPolicies(!showPolicies);
  };

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

  const shareUrl = window.location.href;
  const shareTitle = teacherSelected ? teacherSelected.name : "Check this out!";

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
            {teacherSelected && <TeacherAvailability teacherId={id} />}
          </div>

          {showPolicies && (
            <div className="policies-wrapper">
              <Policies />
            </div>
          )}
        </div>
      )}

      <div className="share-buttons">
        <WhatsappShare url={shareUrl} title={shareTitle} separator=":: " />
        <FacebookShare url={shareUrl} quote={shareTitle} />
        <LinkedinShare url={shareUrl} title={shareTitle} />
        <TwitterShare url={shareUrl} title={shareTitle} />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Galería de Imágenes"
      >
        <h2>Galería de Imágenes</h2>
        {galleryImages.length > 0 && <ImageGallery items={galleryImages} />}
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
  );
};

export default Detail;
