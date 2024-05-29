import  { useEffect, useState } from 'react';
import CatPanel from '../../components/admin/catPanel/CatPanel';

import './Categories.css'


const Categorias = () => {
//   const [dataSource, setDataSource] = useState([
//     {
//       key: '1',
//       id: '1',
//       title: 'Licenciado en Educación',
//       url: 'https://example.com/1'
//     },
//     {
//       key: '2',
//       id: '2',
//       title: 'Inglés',
//       url: 'https://example.com/2'
//     },
//     {
//       key: '3',
//       id: '3',
//       title: 'Clase de prueba',
//       url: 'https://example.com/3'
//     },
//     {
//       key: '4',
//       id: '4',
//       title: 'Clases presenciales',
//       url: 'https://example.com/4'
//     }
//   ]);

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        const url = `http://localhost:8080/api/public/subjects/list`;
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setDataSource(data);
        });
    }, []);



  const [isAdding, setIsAdding] = useState(false);

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleSave = (newFeature) => {
    const newData = [
      ...dataSource,
      {
        ...newFeature,
        key: `${dataSource.length + 1}`,
        id: `${dataSource.length + 1}`
      }
    ];
    setDataSource(newData);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleEdit = (record) => {
    // Aquí puedes agregar la lógica para editar una característica
  };

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  return (
    <div className='container-categories'>
      {isAdding ? (
        <CatForm onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <CatPanel
          dataSource={dataSource}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAddClick}
        />
      )}
    </div>
  );
};

export default Categorias;
