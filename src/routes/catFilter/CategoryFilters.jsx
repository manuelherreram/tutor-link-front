import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card  from "../../components/card/Card";
import "./CategoryFilter.css";


const CategoryFilters = () => {
    const { category } = useParams();
    const [selectedCategories, setSelectedCategories] = useState([category])
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [totalProducts, setTotalProducts] = useState(0)

    let params = ''

console.log(category);

useEffect(() => {
    const url = `http://localhost:8080/api/public/subjects/list`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        setCategories(data);
    });
    }, [])


useEffect(() => {
    const url = `http://localhost:8080/api/public/teachers/category?subjects=${selectedCategories.join(',')}`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        setProducts(data);
        setTotalProducts(data.totalProducts);
        console.log(url);
        console.log(data);
    });
}, [selectedCategories]);
params = selectedCategories;

console.log(params);

    return (
        <div className='filters-result'>
            <div className='category-filters'>
                <div className='filters'>
                {categories.map((category) => (
                    <label className='filter-label' key={category.id}>
                        <input className='input-checkbox'
                        type="checkbox"
                        checked={selectedCategories.includes(category.title)}
                        onChange={() => {
                            const newSelectedCategories = selectedCategories.includes(category.title)
                            ? selectedCategories.filter((c) => c !== category.title)
                            : [...selectedCategories, category.title];
                            setSelectedCategories(newSelectedCategories);
                        }}
                        value={category.title}
                        />
                        {category.title}
                    </label>
                ))}
                </div>
            </div>
            <div className='card-result'>
                
                {products.map((teacher) => (
                <Card key = {teacher.id} name={teacher.name} category={teacher.subject.title} image={teacher.images[0].url} description={teacher.description} id={teacher.id}/>
                ))}
            </div>
        </div>
    )
};
export default CategoryFilters;