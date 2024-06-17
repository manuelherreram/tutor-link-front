import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ImageUploader from './ImageUploader';
import { storage } from '../../firebase/firebaseConfig';
import { Button, Input, Select, Form, Checkbox } from 'antd';
import Swal from 'sweetalert2';
import { register } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import './TeacherForm.css';
import { useAuth } from '../../contexts/AuthContext';
import { ref, uploadBytes } from "firebase/storage";
import { verificarDNIServidor } from '../../api/api';

const { Option } = Select;

const TeacherForm = () => {
  const [mostrar, setMostrar] = useState(true);
  const navigate = useNavigate();
  const { idToken } = useAuth();

  const subjectOptions = [
    { value: 'Historia', label: 'Historia' },
    { value: 'Matemáticas', label: 'Matemáticas' },
    { value: 'Inglés', label: 'Inglés' },
    { value: 'Lenguaje', label: 'Lenguaje' },
  ];

  const characteristicsOptions = [
    { id: 1, name: 'Licenciado en Educacion', url:'' },
    { id: 2, name: 'Ingles', url: '' },
    { id: 3, name: 'Clase de Prueba', url: '' },
    { id: 4, name: 'Clases Presenciales', url: '' },
    { id: 5, name: 'Clases Grupales', url: '' },
    { id: 6, name: 'SuperProfe', url: '' },
  ];

  const {
    handleChange: handleChangeProfessor,
    handleSubmit: handleSubmitProfessor,
    errors: errorsProfessor,
    values: valuesProfessor,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: '',
      dni: '',
      description: '',
      subject: '',
      images: [],
      characteristics: [],
    },
    onSubmit: async (data, { setSubmitting }) => {
      try {
        if (data.images && data.images.length > 0) {
          const imageUrls = await Promise.all(
            data.images.map(async (image) => {
              const storageRef = ref(storage, `images/${image.title}`);
              const url = await uploadBytes(storageRef, image);
              return url;
            })
          );
        } else {
          console.log('No se seleccionaron imágenes.');
        }

        const finalData = {
          name: data.name,
          dni: data.dni,
          description: data.description,
          images: data.images,
          subject: {
            title: data.subject,
          },
          characteristics: characteristicsOptions.filter((option) =>
            data.characteristics.includes(option.id)
          ),
        };

        const response = await register(finalData, idToken);
        setMostrar(false);
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'El profesor se ha registrado correctamente.',
        });
        navigate('/admin');
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'El nombre debe tener por lo menos 3 caracteres')
        .max(20, 'El nombre debe tener máximo 20 caracteres')
        .required('El campo es obligatorio'),
      dni: Yup.string()
        .min(8, 'El DNI debe tener por lo menos 8 caracteres')
        .max(11, 'El DNI debe tener máximo 11 caracteres')
        .required('El campo es requerido')
        .test(
          'DNI-único',
          'El DNI ya está registrado',
          async function (value) {
            const { path, createError } = this;
            try {
              const isUnique = await verificarDNIServidor(value, idToken);
              if (!isUnique) {
                return createError({ path, message: 'El DNI ya está registrado' });
              }
              return true;
            } catch (error) {
              return createError({ path, message: 'Error al verificar el DNI' });
            }
          }
        ),
      description: Yup.string(),
      subject: Yup.string().required('Seleccione un tema'),
    }),
    validateOnChange: false,
  });

  return (
    <main className="main">
  {mostrar && (
    <Form
      layout="horizontal"
      className="container-form"
      onFinish={handleSubmitProfessor}
    >
      <h4>Registro del Tutor</h4>
      <div className="form-row">
        <Form.Item
          label="Nombre"
          name="name"
          validateStatus={errorsProfessor.name ? 'error' : ''}
          help={errorsProfessor.name}
        >
          <Input
            type="text"
            onChange={handleChangeProfessor}
            name="name"
            placeholder="Ingrese su nombre"
          />
        </Form.Item>
      </div>
      <div className="form-row">
        <Form.Item
          label="DNI"
          name="dni"
          validateStatus={errorsProfessor.dni ? 'error' : ''}
          help={errorsProfessor.dni}
        >
          <Input
            type="text"
            onChange={handleChangeProfessor}
            name="dni"
            placeholder="Ingrese el DNI del profesor"
          />
        </Form.Item>
      </div>
      <div className="form-row">
        <Form.Item
          label="Descripción"
          name="description"
          validateStatus={errorsProfessor.description ? 'error' : ''}
          help={errorsProfessor.description}
        >
          <Input.TextArea
            onChange={handleChangeProfessor}
            name="description"
            placeholder="Ingrese una descripción"
            rows={4}
          />
        </Form.Item>
      </div>
      <div className="form-row">
        <Form.Item
          label="Asignatura"
          name="subject"
          validateStatus={errorsProfessor.subject ? 'error' : ''}
          help={errorsProfessor.subject}
        >
          <Select
            placeholder="Selecciona la asignatura"
            value={valuesProfessor.subject}
            onChange={(value) => setFieldValue('subject', value)}
          >
            {subjectOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className="form-row">
        <Form.Item label="Imágenes">
          <ImageUploader
            folderName={valuesProfessor.name}
            setFieldValue={setFieldValue}
          />
        </Form.Item>
      </div>
      <h4>Características del Tutor</h4>
      <div className="form-row">
        {characteristicsOptions.map((option) => (
          <Form.Item
            key={option.id}
            valuePropName="checked"
          >
            <Checkbox
              onChange={() => {
                const updatedCharacteristics =
                  valuesProfessor.characteristics.includes(option.id)
                    ? valuesProfessor.characteristics.filter(
                        (id) => id !== option.id
                      )
                    : [...valuesProfessor.characteristics, option.id];
                setFieldValue('characteristics', updatedCharacteristics);
              }}
              checked={valuesProfessor.characteristics.includes(option.id)}
            >
              {option.name}
            </Checkbox>
          </Form.Item>
        ))}
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  )}
</main>

  );
};

export default TeacherForm;
