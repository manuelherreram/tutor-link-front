import './Panel.css'
import { useState, useEffect } from 'react'
import { getData } from '../../api/api'
import { DeleteOutlined, EditTwoTone, PlusOutlined } from '@ant-design/icons'
import { Space, Table, Tag } from 'antd'
const { Column } = Table

const Panel = ({ showPanel }) => {
    const [data, setData] = useState([]) // Initialize empty data and loading state
    const [isLoading, setIsLoading] = useState(true) // Start with loading state true

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

    return (
        <div className="container-panel">
            <div className="title-panel">
                <h3>Listado de Profesores </h3>
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
                        render={materia => (
                            <Tag color={getColorBySubject(materia)}>
                                {materia}
                            </Tag>
                        )}
                    />
                    <Column
                        title="Acciones"
                        key="accion"
                        render={() => (
                            <Space size="middle">
                                <EditTwoTone style={{ color: 'blue' }} />
                                <DeleteOutlined style={{ color: 'red' }} />
                                <PlusOutlined style={{ color: 'green' }} />
                            </Space>
                        )}
                    />
                </Table>
            )}
        </div>
    )
}

export default Panel
