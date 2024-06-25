import { useState, useEffect } from 'react';
import CharPanel from '../../components/admin/charPanel/CharPanel';
import CharForm from '../../components/admin/charForm/CharForm';
import { registerChar, updateChar, deleteChar, listChar } from '../../api/api';
import { notification } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import './Characteristics.css';

const Characteristics = () => {
  const [data, setData] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newChar, setNewChar] = useState(null);
  const [editFeatureId, setEditFeatureId] = useState(null); 
  const { idToken } = useAuth();

  const fetchData = async () => {
    try {
      const response = await listChar();
      console.log('Datos de la API:', response);
      setData(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddClick = () => {
    setIsAdding(true);
    setNewChar(null);
    setEditFeatureId(null); 
  };

  const handleSave = async (newFeature) => {
    try {
      if (editFeatureId) {
        const updatedFeature = await updateChar(editFeatureId, newFeature, idToken); 
        const updatedData = data.map((item) =>
          item.id === editFeatureId ? { ...item, ...updatedFeature } : item
        );
        setData(updatedData);
        showNotification('success', 'Característica actualizada exitosamente');
      } else {
        console.log("Agregando nueva característica:", newFeature);

        const response = await registerChar(newFeature, idToken);
        setData([...data, { ...newFeature, id: response.id }]);
        showNotification('success', 'Característica agregada exitosamente');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setIsAdding(false);
      setNewChar(null);
      setEditFeatureId(null); 
      fetchData(); 
    }
  };
  const showNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      placement: 'topRight',
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewChar(null);
    setEditFeatureId(null); 
  };

  const handleEdit = (record) => {
    setNewChar(record);
    setEditFeatureId(record.id); 
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteChar(id, idToken);
      fetchData();
      showNotification('success', 'Característica eliminada exitosamente');
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div className="container-characteristics">
      {isAdding ? (
        <CharForm
          initialData={newChar}
          onSave={handleSave}
          onCancel={handleCancel}
          characteristic={newChar}
        />
      ) : (
        <CharPanel
          dataSource={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAddClick}
        />
      )}
    </div>
  );
};

export default Characteristics;
