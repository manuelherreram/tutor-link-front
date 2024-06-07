
import { useFavorites } from "../../contexts/FavoriteContexts"
import { Table } from 'antd';
import './Favorites.css'
const Favorites = () => {
    const {favorites}=useFavorites([])

    const columns = [
        {
          title: 'Tutor',
          dataIndex: 'name',
          key: 'id',
        },
        {
          title: 'Asignatura',
          dataIndex: ['subject', 'title'],
          key: 'subject',
        },
      ];

  return (
    <div className="container-favorites" >
     <h3 className="favorites-title">Mis Favoritos</h3>
     <Table columns={columns} dataSource={favorites} />
  </div>
  )
}

export default Favorites
