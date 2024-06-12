import  { useEffect, useState } from 'react';
import CatPanel from '../../components/admin/catPanel/CatPanel';
import CatForm from '../../components/admin/catForm/CatForm1'
import { useAuth } from '../../contexts/AuthContext';
import './Categories.css'
import { deleteCategories } from '../../api/api';


const Categorias = () => {
  const [dataSource, setDataSource] = useState([]);
  const { idToken } = useAuth();

  useEffect(() => {
    const url = `http://localhost:8080/api/public/subjects/list`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data);
        console.log(data);
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
        key: newFeature.id
      }
    ];
    setDataSource(newData);
    console.log(newData);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleEdit = (record) => {
    // Aquí puedes agregar la lógica para editar una característica
  };

  const handleDelete = async (id, title) => {
    try {
      await deleteCategories(id, idToken);
      const newData = dataSource.filter((item) => item.id !== id);
      setDataSource(newData);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
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
