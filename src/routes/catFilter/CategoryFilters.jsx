import { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import Card  from "../../components/card/Card";
import "./CategoryFilter.css";
import { Badge, Button, Pagination } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";


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
    const url = `http://localhost:8080/api/public/subjects/list`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        setCategories(data);
    });
    const url2 = `http://localhost:8080/api/public/characteristics/list`;
    fetch(url2)
    .then((response) => response.json())
    .then((data) => {
        setCharacteristics(data);
    });
    }, [])

console.log(characteristics);
useEffect(() => {

    const url = selectedCategories.length > 0 && selectedCharacteristics.length > 0 ? `http://localhost:8080/api/teachers/search?subjects=${selectedCategories.join(',')}&characteristicIds=${selectedCharacteristics.join(',')}` : `http://localhost:8080/api/public/teachers/category?subjects=${selectedCategories.join(',')}`
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        setProducts(data);
        console.log(url);
        console.log(data); 
    });

}, [selectedCategories, selectedCharacteristics]);
console.log(products);



const cardPerPage = 6;
const renderCards = products.slice((page - 1) * cardPerPage, page * cardPerPage);


const swalWithAntButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn ant-btn btn-primary",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });





const clearFilters = () => {

            setSelectedCharacteristics([]);
            setSelectedCategories([category]);
            setPage(1);
       
}

    return (
        <div className='filters-result'>
            <div className='category-filters'>
            <ArrowLeftOutlined className="arrow-icon"
                onClick={() => navigate('/')}
            />
                <div className='filters'>
                
                {categories.map((categories) => (                   
                    <label className='filter-label' key={categories.id}>
                        <input className='input-checkbox'
                        type="checkbox"
                        checked={selectedCategories.includes(categories.title)}
                       disabled={category === categories.title}
                        onChange={() => {
                            const newSelectedCategories = selectedCategories.includes(categories.title)
                            ? selectedCategories.filter((c) => c !== categories.title)
                            : [...selectedCategories, categories.title];
                            setSelectedCategories(newSelectedCategories);
                        }}
                        value={categories.title}
                        />
                        {categories.title}
                        <Badge className='badge' count={counter[categories.title] || 0} style={{ backgroundColor: "#F58220" }}showZero/>
                    </label>                   
                ))}


                <div className='filter-title-container'>
                    <span className='filter-title'>Categorias</span> 
                    <button className='clear-button' onClick={() => clearFilters()}>Limpiar</button>
                </div>
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
            <div className="card-result-container">
                <div className='card-result'>
                    
                    {selectedCategories.length < 1 ? <span style={{color: "red", height: "100%"}}>No se han encontrado resultados</span> :
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
    )
};
export default CategoryFilters;


