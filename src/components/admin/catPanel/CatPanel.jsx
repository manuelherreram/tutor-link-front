
import { Table, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './CatPanel.css'
import Swal from 'sweetalert2';

const CatPanel = ({ dataSource, onEdit, onDelete, onAdd }) => {

  console.log(dataSource);

  const handleDelete = (id, title) => {
    Swal.fire({
      title: '¿Estás seguro de eliminar la categoría ' + title + '?',
      text: "¡Quedarán tutores sin materia asociada!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#fa8c16',
      cancelButtonColor: '#46b9bc',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
        Swal.fire(
          {confirmButtonColor: '#fa8c16',
          title: '¡Eliminado!',
          text: 'La categoría ha sido eliminada.',
          icon: 'success'}
        );
      }
    });
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined onClick={() => onEdit(record)} />
          <DeleteOutlined onClick={() => handleDelete(record.id, record.title)} />
        </Space>
      )
    }
  ];

  return (
    <div className='container-page'>
      <div className='container-catPanel'>
      <h3 className='title-catPanel'>Categorías</h3>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
      <Button type="primary" onClick={onAdd} style={{ marginTop: 16 }}>
        Agregar Categoría
      </Button>
    </div>
  );
};

export default CatPanel;