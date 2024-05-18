import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import './Login.css'


const Login = () => {
  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: (data) => {
      console.log(data);
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El email no corresponde')
        .required('El campo es requerido'),
      password: Yup.string()
        .required('obligatorio')
        
    }),
    validateOnChange: false,
  });
  console.log(values);
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
    </main>
  );
};

export default Login;
