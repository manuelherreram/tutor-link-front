import { useState } from 'react'
import Panel from '../../components/admin/Panel' // Import Panel component
import { Menu } from 'antd' // Import useNavigate

import './Admin.css'
import { UserAddOutlined, WalletOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
    const items = [
        {
            label: 'Todos los Profesores',
            key: 'profesores',
            icon: <WalletOutlined />,
        },
        {
            label: 'Agregar un Profesor',
            key: 'agregar',
            icon: <UserAddOutlined />,
        },
    ]
    const [showPanel, setShowPanel] = useState(false)
    const [current, setCurrent] = useState('mail')
    const navigate = useNavigate()

    const onClick = e => {
        console.log('click ', e)
        setCurrent(e.key)

        if (e.key === 'profesores') {
            setShowPanel(true)
        } else if (e.key === 'agregar') {
            navigate('/admin/new')
        }
    }

    return (
        <div className="button-panel">
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
            />
            {showPanel && <Panel showPanel={showPanel} />}
        </div>
    )
}

export default Admin
