import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ImageUploader from './ImageUploader';
import { storage } from '../../firebase/firebaseConfig';
import { Button, TextField, Select, MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Swal from 'sweetalert2';
import { register } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import { useAuth } from '../../contexts/AuthContext';

const Form = () => {
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
    { id: 1, name: 'Licenciado en Educacion' },
    { id:2, name: 'Ingles' },
    { id: 3, name: 'Clase de Prueba' },
    { id: 4, name: 'Clases Presenciales' },
    { id: 5, name: 'Clases Grupales' },
    { id: 6, name: 'SuperProfe',url:"" },
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
        // Manejo de imágenes
        if (data.images && data.images.length > 0) {
          const imageUrls = await Promise.all(
            data.images.map(async (image, index) => {
              const storageRef = storage.ref(`images/${image.name}`);
              await storageRef.put(image);
              const url = await storageRef.getDownloadURL();
              return { url, title: `Imagen ${index + 1} del Profesor` };
            })
          );

          data.images = imageUrls;
        }

        // Construcción del objeto final
        const finalData = {
          name: data.name,
          dni: data.dni,
          description: data.description,
          images: data.images,
          subject: {
            title: data.subject,
          },
          characteristics: characteristicsOptions.filter(option =>
            data.characteristics.includes(option.id)
          ),
        
        };

        const response = await register(finalData, idToken);
        setMostrar(false);
        console.log('Respuesta del servidor:', response);
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
        .required('El campo es requerido'),
      description: Yup.string(),
      subject: Yup.string().required('Seleccione un tema'),
    }),
    validateOnChange: false,
  });

  return (
    <main>
      {mostrar && (
        <form className="container-form" onSubmit={handleSubmitProfessor}>
          <h4>Registro del Tutor</h4>
          <TextField
            type="text"
            onChange={handleChangeProfessor}
            name="name"
            label="Ingrese su nombre"
            variant="outlined"
            error={errorsProfessor.name ? true : false}
            helperText={errorsProfessor.name}
          />
          <TextField
            type="text"
            onChange={handleChangeProfessor}
            name="dni"
            label="Ingrese el DNI del profesor"
            variant="outlined"
            autoComplete="off"
            error={errorsProfessor.dni ? true : false}
            helperText={errorsProfessor.dni}
          />
          <TextField
            type="text"
            onChange={handleChangeProfessor}
            name="description"
            label="Ingrese una descripción"
            multiline
            rows={4}
            variant="outlined"
            autoComplete="off"
            error={errorsProfessor.description ? true : false}
            helperText={errorsProfessor.description}
          />
          <InputLabel id="subject-select-label">Selecciona la asignatura</InputLabel>
          <Select
            labelId="subject-select-label"
            id="subject-select"
            value={valuesProfessor.subject}
            name="subject"
            label="Subject"
            onChange={handleChangeProfessor}
            displayEmpty
            inputProps={{ 'aria-label': 'Subject' }}
            fullWidth
          >
            {subjectOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          <ImageUploader folderName={valuesProfessor.name} setFieldValue={setFieldValue} />

          <h4>Características del Tutor</h4>
          {characteristicsOptions.map((option) => (
            <label key={option.id}>
              <input
                type="checkbox"
                onChange={() => {
                  const updatedCharacteristics = valuesProfessor.characteristics.includes(option.id)
                    ? valuesProfessor.characteristics.filter(id => id !== option.id)
                    : [...valuesProfessor.characteristics, option.id];
                  setFieldValue('characteristics', updatedCharacteristics);
                }}
                checked={valuesProfessor.characteristics.includes(option.id)}
              />{' '}
              {option.name}
            </label>
          ))}

          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </form>
      )}
    </main>
  );
};

export default Form;

