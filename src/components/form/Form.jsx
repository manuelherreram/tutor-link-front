import { useState } from 'react';
import { useFormik } from 'formik';
import { verificarDNIServidor } from '../../api/api';
import * as Yup from 'yup';
import ImageUploader from './ImageUploader';
import { storage } from '../../firebase/firebaseConfig';
import { Button, TextField, Select, MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Swal from 'sweetalert2';
import { register } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Form = () => {
  const [mostrar, setMostrar] = useState(true);
  const navigate = useNavigate();

  const subjectOptions = [
    { value: 'historia', label: 'Historia' },
    { value: 'matematicas', label: 'Matemáticas' },
    { value: 'inglés', label: 'Inglés' },
    { value: 'lenguaje', label: 'Lenguaje' },
  ];

  const {
    handleChange: handleChangeCategories,
    handleSubmit: handleSubmitCategories,
    values: valuesCategories,
  } = useFormik({
    initialValues: {
      isCertificate:false,
      trialClass:false,
      languages:false,
      isPresencial:false,
      isGroup:false,
      studyMaterial:false,
      exams:false,
      superTeacher:false
    
    },
    onSubmit: () => {
      // Envía el formulario principal cuando se envía el formulario de categorías
      handleSubmitProfessor();
    },
  });

  const {
    handleChange: handleChangeProfessor,
    handleSubmit: handleSubmitProfessor,
    errors: errorsProfessor,
    values: valuesProfessor,
  } = useFormik({
    initialValues: {
      name: '',
      dni: '',
      description: '',
      subject: '',
      images: [],
    },
    onSubmit: async (data, { setSubmitting }) => {
      try {
        if (data.images && data.images.length > 0) {
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
        <>
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
            <InputLabel id="demo-simple-select-label">
              Selecciona la asignatura
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
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

            <ImageUploader folderName={valuesProfessor.name} />
          </form>

          <form
            className="container-form categorias"
            onSubmit={handleSubmitCategories}
          >
            <h4>Características del Tutor</h4>
            <label>
              <input
                type="checkbox"
                onChange={handleChangeCategories}
                name="isCertificate"
                checked={valuesCategories.isOnline}
              />{' '}
              ¿Está certificado en su área de enseñanza?
            </label>
           
            <label>
            <input
                type="checkbox"
                onChange={handleChangeCategories}
                name="trialClass"
                checked={valuesCategories.isGroup}
              />{' '}
              ¿Ofrece clase de prueba?
            </label>
            <label>
              <input
                type="checkbox"
                onChange={handleChangeCategories}
                name="languages"
                checked={valuesCategories.isBilingual}
              />{' '}
              ¿Otros idiomas?
            </label>
            <label>
              <input
                type="checkbox"
                onChange={handleChangeCategories}
                name="isPresencial"
                checked={valuesCategories.isOnline}
              />{' '}
              ¿Realiza clases individuales?
            </label>
            <label>
              <input
                type="checkbox"
                onChange={handleChangeCategories}
                name="isGroup"
                checked={valuesCategories.isGroup}
              />{' '}
              ¿Realiza clases grupales?
            </label>
            <label>
              <input
                type="checkbox"
                onChange={handleChangeCategories}
                name="studyMaterial"
                checked={valuesCategories.isOnline}
              />{' '}
              ¿Entrega material de estudio?
            </label>
            <label>
              <input
                type="checkbox"
                onChange={handleChangeCategories}
                name="exams"
                checked={valuesCategories.isOnline}
              />{' '}
              ¿Realiza preparación para exámenes?
            </label>
            <label>
              <input
                type="checkbox"
                onChange={handleChangeCategories}
                name="superTeacher"
                checked={valuesCategories.isOnline}
              />{' '}
              SuperProfesor
            </label>
           
           
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </form>
        </>
      )}
    </main>
  );
};

export default Form;
