import { useState, useEffect } from 'react';
import { Table, Spin, Alert, Button, Modal, Switch } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getUsers, setUser } from '../../../api/api'; // Asegúrate de importar setUser
import { useAuth } from '../../../contexts/AuthContext';
import './Users.css'

const Users = () => {
  const { idToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers(idToken);
        console.log(usersData)
        setUsers(usersData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [idToken]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsAdmin(user.role === 'ADMIN');
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const newRole = isAdmin ? 'ADMIN' : 'USER';
      await setUser(idToken, selectedUser.uid, newRole);
      setUsers(users.map(user => user.uid === selectedUser.uid ? { ...user, role: newRole } : user));
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error setting user role:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRoleChange = (checked) => {
    setIsAdmin(checked);
  };

  if (isLoading) {
    return <Spin tip="Cargando usuarios..." />;
  }

  if (error) {
    return <Alert message="Error" description={`Error al cargar los usuarios: ${error.message}`} type="error" showIcon />;
  }

  const columns = [
    {
      title: 'UID',
      dataIndex: 'uid',
      key: 'uid',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Nombre',
      dataIndex: 'displayName',
      key: 'displayName',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <EditOutlined 
          style={{ fontSize: '16px', color: '#1890ff', cursor: 'pointer' }} 
          onClick={() => handleEdit(record)} 
        />
      ),
    },
  ];

  return (
    <div className='container-users'>
      <Table dataSource={users} columns={columns} rowKey="uid" />
      <Modal
        title="Editar Rol del Usuario"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{selectedUser && `Editando rol para: ${selectedUser.email}`}</p>
        <Switch 
          checked={isAdmin} 
          onChange={handleRoleChange} 
          checkedChildren="Administrador habilitado" 
          unCheckedChildren="Administrador deshabilitado" 
        />
      </Modal>
    </div>
  );
};

export default Users;