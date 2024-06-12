import Categories from "../../components/categoriesSection/CategoriesSection"
import Search from "../../components/search/Search"
import Card from "../../components/card/Card"
import "./Home.css"
import { useEffect, useState } from "react"

const Home = () => {

 const [ randomTeachers, setRandomTeachers ] =  useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/public/index')
    .then(res => res.json())
    .then(data => setRandomTeachers(data))
  },[])

console.log(randomTeachers);


  return (
    <div className="container-home">
      <div className="container-utilities">
        <div className="container-title">
          <h2>Tu camino al éxito</h2>
        </div>
        <Search />
        <Categories />
      </div>
      <div className="container-cards">

        {randomTeachers.map(teacher => <Card key = {teacher.id} name={teacher.name} category={teacher.subjet !== null ? teacher.subject.title : "Sin materia"} image={teacher.images[0].url} description={teacher.description} id={teacher.id}/>)}

      </div>
    </div>
  )
}

export default Home
