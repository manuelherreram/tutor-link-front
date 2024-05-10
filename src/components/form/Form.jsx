import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import MenuItem from '@mui/material/MenuItem';
import './Form.css';
import axios from 'axios';


const Form = () => {
  const [mostrar, setMostrar] = useState(true);

  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      name: '',
      dni: '',
      description: '',
      // subject: '',
      // images: [
      //   {
      //     url: '',
      //     title: '',
      //   },
      // ],
    },
    onSubmit: (data) => {
      
      axios.post('http://localhost:8080/api/teachers', data, {  
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        setMostrar(false); 
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
      });
    },
    
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'El nombre debe tener por lo menos 3 caracteres')
        .max(20, 'El nombre debe tener maximo 20 caracteres')
        .required('El campo es obligatorio'),
      dni: Yup.string()
        .min(8, 'El dni debe tener por lo menos 8 caracteres')
        .max(11, 'El nombre debe tener maximo 11 caracteres')
        .required('El campo es requerido'),
      description: Yup.string(),
      // subject: Yup.string().required('Seleccione una categoría'),
      // images: Yup.array()
      //   .required('Debe contener imágenes')
      //   .min(5, 'Debe contener mínimo 5 imágenes'),
    }),
    validateOnChange: false,
  });
 
  console.log(values);

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
          
          {/* <TextField
            select
            label="Seleccione una categoría"
            onChange={handleChange}
            name="subject"
            value={values.subject}
            variant="outlined"
            error={errors.subject ? true : false}
            helperText={errors.subject}
          >
            <MenuItem value="Matemáticas">Matemáticas</MenuItem>
            <MenuItem value="Lenguaje">Lenguaje</MenuItem>
            <MenuItem value="Inglés">Inglés</MenuItem>
            <MenuItem value="Historia">Historia</MenuItem>
          </TextField> */}
          {/* <TextField
            type="file"
            onChange={handleChange}
            name="images"
            variant="outlined"
            autoComplete="off"
          /> */}

          <Button type="submit" variant="contained" color="success">
            Enviar
          </Button>
        </form>
      ) : (
        <p>registro exitoso</p>
      )}
    </main>
  );
};

export default Form;
