import { useEffect, useState } from 'react';
import Categories from '../../components/categoriesSection/CategoriesSection';
import Search from '../../components/search/Search';
import Card from '../../components/card/Card';
import './Home.css';

const Home = () => {
    const [randomTeachers, setRandomTeachers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/public/index')
            .then(res => res.json())
            .then(data => setRandomTeachers(data));
    }, []);

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    const teachersToDisplay = searchResults.length > 0 ? searchResults : randomTeachers;

    return (
        <div className="container-home">
            <div className="container-utilities">
                <div className="container-title">
                    <h2>Tu camino al éxito</h2>
                </div>
                <Search onSearchResults={handleSearchResults} />
                <Categories />
            </div>
            <div className="container-cards">
                {teachersToDisplay.map(teacher => (
                    <Card 
                        key={teacher.id} 
                        name={teacher.name} 
                        category={teacher.subject.title} 
                        image={teacher.images[0]?.url} 
                        description={teacher.description} 
                        id={teacher.id} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
