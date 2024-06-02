import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../../contexts/AuthContext';
import { doSignInWithEmailAndPassword } from '../../firebase/auth';

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser, setUserLoggedIn } = useAuth();

  const handleSubmit = async (values, formikBag) => {
    const { email, password } = values;

    try {
      const userCredential = await doSignInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      setCurrentUser(user);
      setUserLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      if (error.code === 'auth/wrong-password') {
        formikBag.setFieldError('password', 'Contraseña incorrecta.');
      } else if (error.code === 'auth/user-not-found') {
        formikBag.setFieldError('email', 'Usuario no encontrado.');
      } else if (error.code === 'auth/invalid-email') {
        formikBag.setFieldError('email', 'Email no válido.');
      } else {
        formikBag.setFieldError('general', 'Ocurrió un error al iniciar sesión.');
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleSubmit,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El email no corresponde')
        .required('El campo es requerido'),
      password: Yup.string()
        .required('El campo es requerido')
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    }),
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <main className="container-login">
      <form
        className="container-form-login"
        onSubmit={formik.handleSubmit}
       
      >
        <h3>Iniciar sesión</h3>
        <Input
          type="email"
          onChange={formik.handleChange}
          name="email"
          placeholder="Ingrese su email"
          value={formik.values.email}
          className={formik.errors.email && 'error'}
          size="large"
        />
        {formik.errors.email && <p className="error-message">{formik.errors.email}</p>}
        <Input.Password
          onChange={formik.handleChange}
          name="password"
          placeholder="Ingrese su contraseña"
          value={formik.values.password}
          className={formik.errors.password && 'error'}
          size="large"
        />
        {formik.errors.password && <p className="error-message">{formik.errors.password}</p>}
        <Button type="primary" htmlType="submit">
          Iniciar sesión
        </Button>
        {formik.errors.general && <p className="error-message">{formik.errors.general}</p>}
      </form>
    </main>
  );
};

export default Login;