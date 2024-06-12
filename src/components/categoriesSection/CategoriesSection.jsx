import { Link } from 'react-router-dom';
import './CategoriesSection.css'

const CategoriesSection = () => {
    return (

        <div className='container-categories-section'>
            <ul className='element-categories-section'>
                <li><Link to={'/filter/Matematicas'}>Matematicas</Link></li>
                <li><Link to={'/filter/Historia'} >Historia</Link></li>
                <li><Link to={'/filter/Geografia'}>Geografía</Link></li>
                <li><Link to={'/filter/Ingles'}>Inglés</Link></li>
                <li><Link to={'/filter/Computacion'}>Computación</Link></li>
                <li><Link to={'/filter/Lenguaje'}>Lenguaje</Link></li>
            </ul>
        </div>




    )
}

export default CategoriesSection;