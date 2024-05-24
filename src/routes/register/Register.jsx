import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { auth } from '../../firebase/firebaseConfig';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import Swal from 'sweetalert2';

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      rol: 'USER'
    },
    onSubmit: async (data, { setErrors }) => {
      const { name, lastName, email, password } = data;
      try {
        const userCredential = await doCreateUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log('User created successfully:', user);
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Usuario registrado exitosamente',
        });

        navigate('/login');
      } catch (error) {
        console.error('Registration failed:', error);
        if (error.code === 'auth/email-already-in-use') {
          setErrors({ email: 'This email address is already in use.' });
        } else if (error.code === 'auth/weak-password') {
          setErrors({ password: 'Password is too weak.' });
        } else if (error.response) {
          setErrors({ general: error.response.data.message });
        } else {
          setErrors({ general: 'An error occurred during registration.' });
        }
      }
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'El nombre debe tener por lo menos 3 caracteres')
        .max(10, 'El nombre no puede exceder los 10 caracteres')
        .required('Este campo es obligatorio'),
      lastName: Yup.string()
        .min(3, 'El apellido debe tener por lo menos 3 caracteres')
        .max(10, 'El apellido no puede exceder los 10 caracteres')
        .required('Este campo es obligatorio'),
      email: Yup.string()
        .email('El email no corresponde')
        .required('El campo es requerido'),
      password: Yup.string()
        .required('Este campo es obligatorio')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          'La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un dígito'
        ),
    }),
    validateOnChange: false,
  });

  return (
    <div className="container-register">
      <form className="container-form" onSubmit={formik.handleSubmit}>
        <h3>Registro de estudiante</h3>
        <TextField
          name="name"
          label="Nombre"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name ? true : false}
          helperText={formik.errors.name}
        />
        <TextField
          name="lastName"
          label="Apellido"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          error={formik.errors.lastName ? true : false}
          helperText={formik.errors.lastName}
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email ? true : false}
          helperText={formik.errors.email}
        />
        <TextField
          name="password"
          label="Contraseña"
          variant="outlined"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password ? true : false}
          helperText={formik.errors.password}
        />

        {formik.errors.general && (
          <div className="error-message">
            {formik.errors.general}
          </div>
        )}

        <Button type="submit" variant="contained">
          Registrar
        </Button>
      </form>
    </div>
  );
};

export default Register;
