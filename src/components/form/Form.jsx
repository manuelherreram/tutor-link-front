import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { storage } from './firebaseConfig'; 
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import './Form.css'

const Form = () => {
  const [mostrar, setMostrar] = useState(true);

  const { handleChange, handleSubmit, errors,  setFieldValue } = useFormik({

    initialValues: {
      name: '',
      dni: '',
      description: '',
      images: [], 
    },
    onSubmit: async (data) => {
      try {
        // Subir cada imagen al almacenamiento de Firebase y obtener las URLs
        const imageUrls = await Promise.all(
          data.images.map(async (image) => {
            const storageRef = storage.ref(`images/${image.name}`);
            await storageRef.put(image);
            return await storageRef.getDownloadURL();
          })
        );

        // Agregar las URLs de las imágenes al objeto de datos
        data.images = imageUrls;

        // Enviar los datos al servidor
        const response = await axios.post('http://localhost:8080/api/teachers', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Respuesta del servidor:', response.data);
        setMostrar(false);
      } catch (error) {
        console.error('Error al enviar los datos:', error);
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
    }),
    validateOnChange: false,

    
  });

  return (
    <main>
      {mostrar ? (
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
            label="Ingrese su área de conocimiento"
            multiline
            rows={4}
            variant="outlined"
            autoComplete="off"
            error={errors.description ? true : false}
            helperText={errors.description}
          />
          <input
            type="file"
            name="images"
            onChange={(event) => setFieldValue('images', Array.from(event.currentTarget.files))}
            multiple
          />
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </form>
      ) : (
        <p>Registro exitoso</p>
      )}
    </main>
  );
};

export default Form;