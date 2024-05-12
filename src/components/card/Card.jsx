import { Link } from 'react-router-dom'
import './Card.css'

const Card = ({name, category, image, description, id}) => {

    return (
        <div className="card">
            <div className="card-image">
                <img src={image} alt="" />
            </div>
            <div className='card-body'>
                <div className='card-name'>
                    <p>{ name }</p>
                </div>
                <div className='card-category'>
                    <p>{ category }</p>
                </div>
                <div className='card-description'>
                    <p>{ description }</p>
                </div>
                
                
            </div>
                <Link to={`http://localhost:8080/api/teachers/${id}`}><button className='card-button'>Conectar</button></Link>
        </div>
    )
}

export default Card