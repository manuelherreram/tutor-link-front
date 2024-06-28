import { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import Card  from "../../components/card/Card";
import "./CategoryFilter.css";
import { Badge, Button, Pagination } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../api/api";


const CategoryFilters = () => {
    const { category } = useParams();
    const [selectedCategories, setSelectedCategories] = useState([category])
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])    
    const [selectedCharacteristics, setSelectedCharacteristics] = useState([])
    const [characteristics, setCharacteristics] = useState([])
    const [page, setPage] = useState(1)
    const navigate = useNavigate();

console.log(category);


const counter = products.reduce((count, product) => {
    if (count[product.subject.title]) {
      count[product.subject.title]++;
    } else {
      count[product.subject.title] = 1;
    }
    return count;
  }, {});

  const counter2 = products.reduce((count, product) => {
    product.characteristics.forEach((characteristic) => {
        if(!count[characteristic.name]) {
            count[characteristic.name] = 0;
        }
        count[characteristic.name]++;
    })
    return count;
}, {});

  console.log(counter2);

useEffect(() => {
    const url = `${BASE_URL}/public/subjects/list`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        setCategories(data);
    });
    const url2 = `${BASE_URL}/public/characteristics/list`;
    fetch(url2)
    .then((response) => response.json())
    .then((data) => {
        setCharacteristics(data);
    });
    }, [])

console.log(characteristics);
useEffect(() => {

    const url = selectedCategories.length > 0 && selectedCharacteristics.length > 0 ? `${BASE_URL}/teachers/search?subjects=${selectedCategories.join(',')}&characteristicIds=${selectedCharacteristics.join(',')}` : `${BASE_URL}/public/teachers/category?subjects=${selectedCategories.join(',')}`
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        setProducts(data);
        console.log(url);
        console.log(data); 
    });

}, [ selectedCharacteristics]);

console.log(products);

const cardPerPage = 6;
const renderCards = products.slice((page - 1) * cardPerPage, page * cardPerPage);


const clearFilters = () => {

            setSelectedCharacteristics([]);
            setSelectedCategories([category]);
            setPage(1);       
}

const noResults = () => {
    return (
        <div className="no-results">
            <h3>No se encontraron resultados</h3>
            <p>Por favor intenta con otras busquedas</p>
        </div>
    )
}

    return (
        <div className='filters-result'>
            <div className="title-filters-result">
                <div>
                    <h3>Resultados de la busqueda: <span>{category}</span><Badge className='badge' count={counter[products[0]?.subject?.title] || 0} style={{ backgroundColor: "#F58220" }}showZero/></h3>
                </div>
            </div>
            <div className="filters-results-container">
                <div className="filters-container">
                    <div className="accesories-filter">
                        <div>
                            <ArrowLeftOutlined className="arrow-icon"
                            onClick={() => navigate('/')}
                            />
                        </div>  
                        <div>  
                            <button className='clear-button' onClick={() => clearFilters()}>Limpiar</button>
                        </div>
                    </div>
                    <div className="characteristics-filter">
                    {characteristics.map((characteristics) => (                   
                    <label className='filter-label' key={characteristics.id}>
                        <input className='input-checkbox'
                        type="checkbox"
                        checked={selectedCharacteristics.includes(characteristics.id)}
                        // disabled={category === categories.title}
                        onChange={() => {
                            const newSelectedCharacteristics = selectedCharacteristics.includes(characteristics.id)
                            ? selectedCharacteristics.filter((c) => c !== characteristics.id)
                            : [...selectedCharacteristics, characteristics.id];
                            setSelectedCharacteristics(newSelectedCharacteristics);
                        }}
                        value={characteristics.id}
                        />
                        {characteristics.name}
                        <Badge className='badge' count={counter2[characteristics.name] || 0} style={{ backgroundColor: "#F58220" }}showZero/>
                    </label>                   
                ))}
                    </div>
                </div>
                <div className="cards-result">
                    <div className='cards-result-container'>
                    {products.length < 1 ? noResults() :
                    renderCards.map((teacher) => (
                    <Card key = {teacher.id} name={teacher.name} category={teacher.subject.title} image={teacher.images[0].url} description={teacher.description} id={teacher.id}/>
                    ))}
                    </div>
                    <div className="pagination">
                        <Pagination
                        defaultCurrent={1}
                        defaultPageSize={6}
                        total={products.length}
                        showTotal={(total, range) => `${range[0]}-${range[1]} de ${total} items`}
                        onChange={(page) => {
                            setPage(page);
                        }}
                        /> 
                    </div>
                </div>
            </div>



        </div>
    )
};
export default CategoryFilters;


