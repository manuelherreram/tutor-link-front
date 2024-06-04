import { useState } from 'react';
import { Input, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import Swal from 'sweetalert2';
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { createUser } from '../../api/api';
import { auth } from '../../firebase/firebaseConfig';

const Register = () => {
  const [showResendButton, setShowResendButton] = useState(false);
  const navigate = useNavigate();

  const handleResendVerification = async () => {
    try {
      auth.languageCode = 'es';
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        Swal.fire({
          icon: 'success',
          title: 'Correo de verificación reenviado',
          text: 'Por favor, revisa tu correo electrónico.',
        });
      }
    } catch (error) {
      console.error(
        'Error sending email verification:',
        error.code === 'auth/too-many-requests'
      );
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Muchas solicitudes, intente nuevamente en 1 minuto',
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      phone: 0,
      address: '',
      city: '',
      country: '',
    },
    onSubmit: async (data, { setErrors }) => {
      const { name, lastName, email, password, phone, address, city, country } =
        data;
      try {
        // Crear usuario en la API
        await createUser({
          email,
          password,
          firstName: name,
          lastName: lastName,
          phone: phone,
          address: address,
          city: city,
          country: country,
        });

        // Iniciar sesión con el usuario recién creado
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Enviar correo de verificación
        await sendEmailVerification(user);

        console.log('User created successfully:', user);
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Usuario registrado exitosamente. Revisa tu correo para verificar tu cuenta.',
        });

        setShowResendButton(true);
        navigate('/');
      } catch (error) {
        console.error('Registration failed:', error);
        if (
          error.code === 'auth/email-already-in-use' ||
          error.response.data ===
            'Registration failed: The user with the provided email already exists (EMAIL_EXISTS).'
        ) {
          console.log(error, 'error-response');
          setErrors({
            email: 'Esta dirección de correo ya está en uso.',
          });
        } else if (error.code === 'auth/weak-password') {
          setErrors({ password: 'La contraseña es muy débil.' });
        } else if (error.response) {
          setErrors({ general: error.response.data.message });
        } else {
          setErrors({
            general: 'Ocurrió un error durante el registro.',
          });
        }
      }
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'El nombre debe tener por lo menos 3 caracteres')
        .max(15, 'El nombre no puede exceder los 15 caracteres')
        .required('Este campo es obligatorio'),
      lastName: Yup.string()
        .min(3, 'El apellido debe tener por lo menos 3 caracteres')
        .max(15, 'El apellido no puede exceder los 15 caracteres')
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
      <form className="container-form-register" onSubmit={formik.handleSubmit}>
        <h3 className="h3">Registro de usuario</h3>
        <Input
          name="name"
          placeholder="Nombre"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name ? true : false}
          //   helperText={formik.errors.name}
        />
        <Input
          name="lastName"
          placeholder="Apellido"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          error={formik.errors.lastName ? true : false}
        />
        <Input
          name="email"
          placeholder="Email"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email ? true : false}
        />
        <Input
          name="password"
          placeholder="Contraseña"
          variant="outlined"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password ? true : false}
        />
        <Input
          name="phone"
          placeholder="Teléfono"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone ? true : false}
        />
        <Input
          name="address"
          placeholder="Dirección"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.errors.address ? true : false}
        />
        <Input
          name="city"
          placeholder="Ciudad"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.city}
          error={formik.errors.city ? true : false}
        />
        <Input
          name="country"
          placeholder="Country"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.country}
          error={formik.errors.country ? true : false}
        />
        {formik.errors.general && (
          <div className="error-message">{formik.errors.general}</div>
        )}
        <Button type="submit" variant="contained">
          Registrar
        </Button>
        {showResendButton && (
          <Button onClick={handleResendVerification}>
            Reenviar correo de verificación
          </Button>
        )}
      </form>
    </div>
  );
};

export default Register;
