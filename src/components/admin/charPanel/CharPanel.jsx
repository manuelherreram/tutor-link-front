import { Table } from 'antd';



const dataSource = [
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
  ];
  
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
    }
    
  ];
  
  
const CharPanel = () => {




  return <Table dataSource={dataSource} columns={columns} />
};

export default CharPanel;
