import './ImageSection.css'
const ImageSection = ({ teacherSelected }) => {
    return (
      <div className="image-section">
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
          </div>
        </section>
      </div>
    );
  };
  
  export default ImageSection;