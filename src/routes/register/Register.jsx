import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Register.css';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../../firebase/firebaseConfig'; 

const Register = () => {
  const navigate = useNavigate();

  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
    },
    onSubmit: async (data) => {
      const { email, password } = data;

      try {
        const auth = getAuth(app);

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created successfully:', userCredential.user);
        navigate('/login'); 
      } catch (error) {
        console.error('Registration failed:', error);
        // Handle specific errors (example shown below)
        if (error.code === 'auth/email-already-in-use') {
          errors.email = 'This email address is already in use.';
        } else if (error.code === 'auth/weak-password') {
          errors.password = 'Password is too weak.';
        } else {
          errors.general = 'An error occurred during registration.';
        }
      }
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'El nombre debe tener por lo menos 3 caracteres')
        .max(10)
        .required('Este campo es obligatorio'),
      lastName: Yup.string().required('Este campo es obligatorio'),
      email: Yup.string()
        .email('El email no corresponde')
        .required('El campo es requerido'),
      password: Yup.string()
        .required('obligatorio')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          'debe tener al menos una letra mayúscula,una letra minúscula y un digito'
        ),
    }),
    validateOnChange: false,
  });

  console.log(values);

  return (
    <div className="container-register">
      <form className="container-form" onSubmit={handleSubmit}>
        <h3>Registro de estudiante</h3>
        <TextField
          name="name"
          label="Nombre"
          variant="outlined"
          onChange={handleChange}
          error={errors.name ? true : false}
          helperText={errors.name}
        />
        <TextField
          name="lastName"
          label="Apellido"
          variant="outlined"
          onChange={handleChange}
          error={errors.lastName ? true : false}
          helperText={errors.lastName}
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          onChange={handleChange}
          error={errors.email ? true : false}
          helperText={errors.email}
        />
        <TextField
          name="password"
          label="Contraseña"
          variant="outlined"
          onChange={handleChange}
          error={errors.password ? true : false}
          helperText={errors.password}
        />

        <Button type="submit" variant="contained">
          Registrar
        </Button>
      </form>
    </div>
  );
};

export default Register;