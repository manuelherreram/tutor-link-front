import  { useState } from 'react';
import CharPanel from '../../components/admin/charPanel/CharPanel';
import CharForm from '../../components/admin/charForm/CharForm';
import './Characteristics.css'


const Caracteristicas = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      id: '1',
      title: 'Licenciado en Educación',
      url: 'https://example.com/1'
    },
    {
      key: '2',
      id: '2',
      title: 'Inglés',
      url: 'https://example.com/2'
    },
    {
      key: '3',
      id: '3',
      title: 'Clase de prueba',
      url: 'https://example.com/3'
    },
    {
      key: '4',
      id: '4',
      title: 'Clases presenciales',
      url: 'https://example.com/4'
    }
  ]);

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
    <div className='container-characteristics'>
      {isAdding ? (
        <CharForm onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <CharPanel
          dataSource={dataSource}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAddClick}
        />
      )}
    </div>
  );
};

export default Caracteristicas;
