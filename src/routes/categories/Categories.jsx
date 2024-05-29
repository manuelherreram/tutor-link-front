import  { useEffect, useState } from 'react';
import CatPanel from '../../components/admin/catPanel/CatPanel';
import CatForm from '../../components/admin/catForm/CatForm1'
import { useAuth } from '../../contexts/AuthContext';
import './Categories.css'



const Categorias = () => {


    const [dataSource, setDataSource] = useState([]);
    const { idToken } = useAuth();





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
