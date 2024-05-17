import './Panel.css';
import { useState, useEffect, useRef } from 'react';
import { getData, deleteUser } from '../../api/api';
import { DeleteOutlined, EditTwoTone, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Modal, Space, Table, Tag, message, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';

const { Column } = Table;

const Panel = ({ showPanel }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [teacherToDeleteId, setTeacherToDeleteId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  useEffect(() => {
    (async () => {
      if (showPanel) {
        try {
          const teachersData = await getData();
          const processedData = teachersData.map((teacher) => ({
            id: teacher.id,
            nombre: teacher.name,
            dni: teacher.dni,
            materia: teacher.subject.title,
            description: teacher.description,
            images: teacher.images,
          }));
          setData(processedData);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching teachers:', error);
        }
      }
    })();
  }, [showPanel]);

  const getColorBySubject = (subject) => {
    switch (subject.toLowerCase()) {
      case 'historia':
        return 'pink';
      case 'geografia':
        return 'green';
      case 'matematica':
        return 'yellow';
      case 'ingles':
        return 'purple';
      case 'lenguaje':
        return 'red';
      default:
        return 'black';
    }
  };

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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText('');
    confirm();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, confirm)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

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
        <Table dataSource={data} className="table-ant" rowKey="id">
          <Column title="ID" dataIndex="id" key="id" {...getColumnSearchProps('id')} />
          <Column title="Nombre" dataIndex="nombre" key="nombre" {...getColumnSearchProps('nombre')} />
          <Column title="DNI" dataIndex="dni" key="dni" {...getColumnSearchProps('dni')} />
          <Column
            title="Materias"
            dataIndex="materia"
            key="materia"
            render={(materia) => (
              <Tag color={getColorBySubject(materia)}>{materia}</Tag>
            )}
            {...getColumnSearchProps('materia')}
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

export default Panel;
