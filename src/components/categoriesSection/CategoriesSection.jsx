import { Link } from 'react-router-dom';
import './CategoriesSection.css'

const CategoriesSection = () => {
    return (

        <div className='container-categories-section'>
            <ul className='element-categories-section'>
                <li><Link to={'/filter/Matematicas'}>Matematicas</Link></li>
                <li><Link to={'/filter/Historia'}>Historia</Link></li>
                <li><Link to={'/filter/Geografia'}>Geografia</Link></li>
                <li><a href="#">Danza</a></li>
                <li><a href="#">Computación</a></li>
                <li><a href="#">Lenguaje</a></li>
            </ul>
        </div>




    )
}

export default CategoriesSection;