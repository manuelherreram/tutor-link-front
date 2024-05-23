import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For navigation
import './Login.css';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import {  auth } from '../../firebase/firebaseConfig';

const Login = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
    };
  }, [auth]);

  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (data) => {
      const { email, password } = data;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCredential.user);
        navigate('/');
      } catch (error) {
        console.error('Login failed:', error);

        if (error.code === 'auth/wrong-password') {
          errors.password = 'Contraseña incorrecta.'; 
        } else if (error.code === 'auth/user-not-found') {
          errors.email = 'Usuario no encontrado.'; 
        } else {
          errors.general = 'Ocurrió un error al iniciar sesión.';
        }
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El email no corresponde')
        .required('El campo es requerido'),
      password: Yup.string()
        .required('obligatorio')
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    }),
    validateOnChange: false,
  });
  const user = auth.currentUser;
console.log('user', user)
  return (
    <main className='container-login'>
      <form className="container-form" onSubmit={handleSubmit}>
        <h3>Iniciar sesión</h3>
        <TextField
          type="email"
          onChange={handleChange}
          name="email"
          label="Ingrese su email"
          variant="outlined"
          error={errors.email ? true : false}
          helperText={errors.email}
        />
        <TextField
          type="password"
          onChange={handleChange}
          name="password"
          label="Ingrese su contraseña"
          variant="outlined"
          autoComplete="off" 
          error={errors.password ? true : false}
          helperText={errors.password}
        />

        <Button type="submit" variant="contained" color="primary">
          Iniciar sesión
        </Button>
      </form>

      {currentUser && (
        <div>

        <p>Usuario actual: {currentUser.email}</p>
        <p>Usuario contraseña: {currentUser.uid}</p>
     
        </div>
      )}
    </main>
  );
};

export default Login;
