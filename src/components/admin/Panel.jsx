import './Panel.css'
import { useState, useEffect } from 'react'
import { getData, deleteUser } from '../../api/api'; 
import { DeleteOutlined, EditTwoTone, PlusOutlined } from '@ant-design/icons'
import { Modal, Space, Table, Tag, message } from 'antd'
const { Column } = Table

const Panel = ({ showPanel }) => {
    const [data, setData] = useState([]) // Initialize empty data and loading state
    const [isLoading, setIsLoading] = useState(true) // Start with loading state true
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false); // State for delete confirmation modal
    const [teacherToDeleteId, setTeacherToDeleteId] = useState(null); // Store ID for deletion
  
    useEffect(() => {
        (async () => {
            if (showPanel) {
                // Check if showPanel is true
                try {
                    const teachersData = await getData()
                    const processedData = teachersData.map(teacher => {
                        return {
                            id: teacher.id,
                            nombre: teacher.name,
                            dni: teacher.dni,
                            materia: teacher.subject.title,
                            description: teacher.description,
                            images: teacher.images,
                        }
                    })
                    console.log('Processed teachers data:', processedData)
                    setData(processedData)
                    setIsLoading(false) // Set loading state to false when data is loaded
                } catch (error) {
                    console.error('Error fetching teachers:', error)
                }
            }
        })()
    }, [showPanel])

    const getColorBySubject = subject => {
        switch (subject.toLowerCase()) {
            case 'historia':
                return 'pink'
            case 'geografia':
                return 'green'
            case 'matematica':
                return 'yellow'
            case 'ingles':
                return 'purple'
            case 'lenguaje':
                return 'red'
            default:
                return 'black'
        }
    }
    const handleDelete = async (id) => {
      setConfirmDeleteVisible(false); 
  
      try {
        await deleteUser(id); 
        const newData = data.filter((teacher) => teacher.id !== id); 
        setData(newData);
        message.success('Profesor eliminado exitosamente'); 
      } catch (error) {
        console.error('Error deleting teacher:', error);
        message.error('Error al eliminar el profesor'); 
      }
    };
  
    const showDeleteConfirmation = (id) => {
      setTeacherToDeleteId(id); 
      setConfirmDeleteVisible(true); 
    };

   return (
    <div className="container-panel">
      <div className="title-panel">
        <h3>Listado de Profesores</h3>
      </div>
      {isLoading ? (
        <div className="loading">Cargando profesores...</div>
      ) : data.length === 0 ? (
        <div className="no-data">No se encontraron profesores</div>
      ) : (
        <Table dataSource={data} className="table-ant">
          <Column title="ID" dataIndex="id" key="id" />
          <Column title="Nombre" dataIndex="nombre" key="nombre" />
          <Column title="DNI" dataIndex="dni" key="dni" />
          <Column
            title="Materias"
            dataIndex="materia"
            key="materia"
            render={(materia) => (
              <Tag color={getColorBySubject(materia)}>{materia}</Tag>
            )}
          />
          <Column
            title="Acciones"
            key="accion"
            render={(record) => (
              <Space size="middle">
                <EditTwoTone style={{ color: 'blue' }} />
                <DeleteOutlined
                  style={{ color: 'red' }}
                  onClick={() => showDeleteConfirmation(record.id)} 
                />
                <PlusOutlined style={{ color: 'green' }} />
              </Space>
            )}
          />
        </Table>
      )}

      {/* Confirmation Modal */}
      <Modal
        title="Confirmar eliminación"
        visible={confirmDeleteVisible}
        onOk={() => handleDelete(teacherToDeleteId)} 
        onCancel={() => setConfirmDeleteVisible(false)}
      >
        ¿Está seguro que desea eliminar este profesor?
      </Modal>
    </div>
  );
};

export default Panel
