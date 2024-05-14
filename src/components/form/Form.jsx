import { useState } from 'react';
import { useFormik } from 'formik';
import { verificarDNIServidor } from '../../api/api';
import * as Yup from 'yup';
import ImageUploader from './ImageUploader';
import { storage } from './firebaseConfig';
import { Button, TextField, Select, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';
import { register } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Form = () => {
  const [mostrar, setMostrar] = useState(true);


  const navigate = useNavigate();

  const subjectOptions = [
    { value: '', label: 'Seleccionar asignatura' },
    { value: 'historia', label: 'Historia' },
    { value: 'matematicas', label: 'Matemáticas' },
    { value: 'inglés', label: 'Inglés' },
    { value: 'lenguaje', label: 'Lenguaje' },
  ];

  const { handleChange, handleSubmit, errors, values } = useFormik({

    initialValues: {
      name: '',
      dni: '',
      description: '',
      subject: '',
      images:[]
    },

    onSubmit: async (data, {setSubmitting}) => {
      try {
        if (data.images && data.images.length > 0) { // Verifica si hay imágenes seleccionadas
          const imageUrls = await Promise.all(
            data.images.map(async (image) => {
              const storageRef = storage.ref(`images/${image.name}`);
              await storageRef.put(image);
              return await storageRef.getDownloadURL();
            })
          );

        data.images = imageUrls;
        }
        const response = await register(data);
        setMostrar(false);
        console.log('Respuesta del servidor:', response.data);
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'El profesor se ha registrado correctamente.',
        });
            navigate('/admin');
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }finally{
        setSubmitting(false);
      }

    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'El nombre debe tener por lo menos 3 caracteres')
        .max(20, 'El nombre debe tener máximo 20 caracteres')
        .required('El campo es obligatorio')
       ,
      dni: Yup.string()
        .min(8, 'El DNI debe tener por lo menos 8 caracteres')
        .max(11, 'El DNI debe tener máximo 11 caracteres')
        .required('El campo es requerido')
        .test('dni-unico', '¡El DNI ya está en uso!', async function (value) {
          const dniNoExistente = await verificarDNIServidor(value);
          return dniNoExistente;
        }),
      description: Yup.string(),
      subject: Yup.string().required('Seleccione un tema'),
    }),
    validateOnChange: false,
    
  });

  return (
    <main>
      {mostrar && (
        <form className="container-form" onSubmit={handleSubmit}>
          <h2>Formulario de Registro</h2>
          <TextField
            type="text"
            onChange={handleChange}
            name="name"
            label="Ingrese su nombre"
            variant="outlined"
            error={errors.name ? true : false}
            helperText={errors.name}
          />
          <TextField
            type="text"
            onChange={handleChange}
            name="dni"
            label="Ingrese el DNI del profesor"
            variant="outlined"
            autoComplete="off"
            error={errors.dni ? true : false}
            helperText={errors.dni}
          />
          <TextField
            type="text"
            onChange={handleChange}
            name="description"
            label="Ingrese una descripción"
            multiline
            rows={4}
            variant="outlined"
            autoComplete="off"
            error={errors.description ? true : false}
            helperText={errors.description}
          />
          <Select
            value={values.subject}
            onChange={handleChange}
            name="subject"
            label="Subject"
            variant="outlined"
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

          <ImageUploader folderName={values.name}/>

          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </form>
      )}
    </main>
  );
};

export default Form;
