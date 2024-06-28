import { useEffect, useState } from "react";
import Categories from "../../components/categoriesSection/CategoriesSection";
import Search from "../../components/search/Search";
import Card from "../../components/card/Card";
import WhatsAppButton from "../../components/whatsappFloatingBtn/WhatsAppButton";
import "./Home.css";
import { Pagination } from "antd";
import { BASE_URL } from "../../api/api";

const Home = () => {
  const [randomTeachers, setRandomTeachers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`${BASE_URL}/public/index`)
      .then((res) => res.json())
      .then((data) => setRandomTeachers(data));
  }, []);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const teachersToDisplay =
    searchResults.length > 0 ? searchResults : randomTeachers;

  const [cardPerPage, setCardPerPage] = useState(9);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1240) {
        setCardPerPage(8);
      } else {
        setCardPerPage(9);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderCards = teachersToDisplay.slice(
    (page - 1) * cardPerPage,
    page * cardPerPage
  );

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
        {renderCards.map((teacher) => (
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
      <div className="pagination">
        <Pagination
          defaultCurrent={1}
          pageSize={cardPerPage}
          total={teachersToDisplay.length}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} de ${total} items`
          }
          onChange={(page) => {
            setPage(page);
          }}
        />
      </div>
      <WhatsAppButton />
    </div>
  );
};

export default Home;
