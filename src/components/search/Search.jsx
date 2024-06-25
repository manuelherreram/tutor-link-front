import { useState } from 'react'
import {
    AutoComplete,
    Input,
    DatePicker,
    notification,
    Checkbox,
    Button,
    Divider,
} from 'antd'
import moment from 'moment'
import './Search.css'
import {
    searchTeachersByKeyword,
    getAvailableTeachersByDate,
} from '../../api/api'
import { SearchOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker

const Search = ({ onSearchResults }) => {
    const [searchValue, setSearchValue] = useState('')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [options, setOptions] = useState([])
    const [isDateFlexible, setIsDateFlexible] = useState(false)

    const today = moment()
    const disabledDate = current => {
        return current && current < moment().startOf('day')
    }
    const handleSearch = async value => {
        setSearchValue(value)
        if (value) {
            try {
                const response = await searchTeachersByKeyword(value)
                const groupedSuggestions = groupSuggestionsBySubject(response)

                // Add a suggestion showing the number of results
                const summaryOption = {
                    value: value,
                    label: (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontWeight: 'bold',
                            }}
                        >
                            <span>
                                <SearchOutlined
                                    style={{ marginRight: '5px' }}
                                />
                                {`"${value}" se encuentra en ${response.length} resultado(s)`}
                            </span>
                        </div>
                    ),
                }

                setOptions([summaryOption, ...groupedSuggestions])
            } catch (error) {
                console.error('Error retrieving teachers by keyword:', error)
            }
        } else {
            setOptions([])
        }
    }

    const handleSubmit = async () => {
        try {
            const keyword = searchValue
            if (!keyword) {
                notification.warning({
                    message: 'Palabra clave requerida',
                    description: 'Por favor, ingresa una palabra para buscar.',
                })
                return
            }
            const keywordResults = await searchTeachersByKeyword(keyword)

            if (!isDateFlexible && (!startDate || !endDate)) {
                notification.warning({
                    message: 'Fechas requeridas',
                    description:
                        'Por favor, selecciona un rango de fechas o marca la opción "Aún no tengo decidido mis fechas".',
                })
                return
            }

            if (!isDateFlexible && startDate && endDate) {
                const availabilityResults = await getAvailableTeachersByDate(
                    startDate,
                    endDate
                )
                const combinedResults = keywordResults.filter(teacher =>
                    availabilityResults.some(
                        availableTeacher => availableTeacher.id === teacher.id
                    )
                )
                console.log(combinedResults, 'resultados combinados')
                if (combinedResults.length > 0) {
                    onSearchResults(combinedResults)
                } else {
                    notification.info({
                        message: 'No hay profesores disponibles',
                        description:
                            'No hay profesores que coincidan con tu búsqueda en las fechas seleccionadas.',
                    })
                }
            } else {
                onSearchResults(keywordResults)
            }
        } catch (error) {
            console.error('Error retrieving teachers:', error)
            notification.error({
                message: 'No hay profesores disponibles',
                description:
                    'No hay profesores que coincidan con tu búsqueda en las fechas seleccionadas.',
            })
        }
    }

    const handleDateChange = (dates, dateStrings) => {
        if (dates) {
            setStartDate(moment(dateStrings[0]).format('YYYY-MM-DD'))
            setEndDate(moment(dateStrings[1]).format('YYYY-MM-DD'))
        } else {
            setStartDate(null)
            setEndDate(null)
        }
    }

    const groupSuggestionsBySubject = teachers => {
        const subjects = {}
        teachers.forEach(teacher => {
            const subjectTitle = teacher.subject.title
            if (!subjects[subjectTitle]) {
                subjects[subjectTitle] = []
            }
            subjects[subjectTitle].push({
                value: teacher.name,
                label: (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        {teacher.name}
                    </div>
                ),
            })
        })

        return Object.keys(subjects).map(subjectTitle => ({
            label: subjectTitle,
            options: subjects[subjectTitle],
        }))
    }

    const handleCheckboxChange = e => {
        setIsDateFlexible(e.target.checked)
    }
    const handleSelectSuggestion = value => {
        setSearchValue(value)
    }

    return (
        <div className="container-search">
            <AutoComplete
                value={searchValue}
                style={{ width: '60%' }}
                options={options}
                onSearch={handleSearch}
                onSelect={handleSelectSuggestion}
                size="large"
            >
                <Input
                    size="large"
                    placeholder={'¿Qué quieres aprender el día de hoy?'}
                    onChange={e => setSearchValue(e.target.value)}
                    className="custom-search-input"
                    allowClear
                    addonBefore={<SearchOutlined style={{ color: 'black' }} />}
                />
            </AutoComplete>
            <Divider
                type="vertical"
                className="divider"
                style={{ borderWidth: '4px', marginLeft: '13px' }}
            />

            {!isDateFlexible && (
                <div className="container-date">
                    <RangePicker
                        style={{ marginLeft: 10 }}
                        onChange={handleDateChange}
                        format="YYYY-MM-DD"
                        className="custom-date-picker"
                        disabledDate={disabledDate}
                    />
                </div>
            )}
            <Checkbox
                style={{ marginLeft: 10 }}
                onChange={handleCheckboxChange}
                className="checkbox-date"
            >
                Aún no decido la fechas
            </Checkbox>
            <Button
                className="btn-submit"
                type="primary"
                style={{ marginLeft: 10 }}
                onClick={handleSubmit}
            >
                Buscar
            </Button>
        </div>
    )
}

export default Search
