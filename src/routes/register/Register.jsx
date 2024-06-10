import { useState } from 'react';
import { Input, Button, Form } from 'antd';
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
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const Register = () => {
  const [showResendButton, setShowResendButton] = useState(false);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
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
      console.error('Error sending email verification:', error);
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
      phone: '',
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
        if (error.code === 'auth/email-already-in-use') {
          setErrors({
            email: 'Esta dirección de correo ya está en uso.',
          });
        } else if (error.code === 'auth/weak-password') {
          setErrors({ password: 'La contraseña es muy débil.' });
        } else if (
          error.response &&
          error.response.data ===
            'Registration failed: The user with the provided email already exists (EMAIL_EXISTS).'
        ) {
          setErrors({
            email: 'Esta dirección de correo ya está en uso.',
          });
        } else if (error.response) {
          setErrors({ general: error.response.data.message });
        } else {
          setErrors({
            general: 'Ocurrió un error durante el registro.',
          });
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error durante el registro.',
        });
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
      phone: Yup.string().matches(
        /^\d{10}$/,
        'El teléfono debe tener 10 dígitos'
      ),
      address: Yup.string().min(
        5,
        'La dirección debe tener por lo menos 5 caracteres'
      ),
      city: Yup.string().min(
        3,
        'La ciudad debe tener por lo menos 3 caracteres'
      ),
      country: Yup.string().min(
        3,
        'El país debe tener por lo menos 3 caracteres'
      ),
    }),
    validateOnChange: false,
  });

  return (
    <div className="container-register">
      <Form className="container-form-register" onFinish={formik.handleSubmit}>
        <h3 className="h3">Registro de usuario</h3>
        <Form.Item
          validateStatus={formik.errors.name ? 'error' : ''}
          help={formik.errors.name}
        >
          <Input
            name="name"
            placeholder="Nombre"
            onChange={formik.handleChange}
            value={formik.values.name}
            aria-describedby="name-helper-text"
          />
        </Form.Item>
        <Form.Item
          validateStatus={formik.errors.lastName ? 'error' : ''}
          help={formik.errors.lastName}
        >
          <Input
            name="lastName"
            placeholder="Apellido"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            aria-describedby="lastName-helper-text"
          />
        </Form.Item>
        <Form.Item
          validateStatus={formik.errors.email ? 'error' : ''}
          help={formik.errors.email}
        >
          <Input
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
            aria-describedby="email-helper-text"
          />
        </Form.Item>
        <Form.Item
          validateStatus={formik.errors.password ? 'error' : ''}
          help={formik.errors.password}
        >
          <Input.Password
            name="password"
            placeholder="Contraseña"
            onChange={formik.handleChange}
            value={formik.values.password}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            visibilityToggle
            aria-describedby="password-helper-text"
          />
        </Form.Item>
        <Form.Item
          validateStatus={formik.errors.phone ? 'error' : ''}
          help={formik.errors.phone}
        >
          <Input
            name="phone"
            placeholder="Teléfono"
            onChange={formik.handleChange}
            value={formik.values.phone}
            aria-describedby="phone-helper-text"
          />
        </Form.Item>
        <Form.Item
          validateStatus={formik.errors.address ? 'error' : ''}
          help={formik.errors.address}
        >
          <Input
            name="address"
            placeholder="Dirección"
            onChange={formik.handleChange}
            value={formik.values.address}
            aria-describedby="address-helper-text"
          />
        </Form.Item>
        <Form.Item
          validateStatus={formik.errors.city ? 'error' : ''}
          help={formik.errors.city}
        >
          <Input
            name="city"
            placeholder="Ciudad"
            onChange={formik.handleChange}
            value={formik.values.city}
            aria-describedby="city-helper-text"
          />
        </Form.Item>
        <Form.Item
          validateStatus={formik.errors.country ? 'error' : ''}
          help={formik.errors.country}
        >
          <Input
            name="country"
            placeholder="País"
            onChange={formik.handleChange}
            value={formik.values.country}
            aria-describedby="country-helper-text"
          />
        </Form.Item>
        {formik.errors.general && (
          <div className="error-message">{formik.errors.general}</div>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Registrar
          </Button>
        </Form.Item>
        {showResendButton && (
          <Button onClick={handleResendVerification} type="default">
            Reenviar correo de verificación
          </Button>
        )}
      </Form>
    </div>
  );
};

export default Register;
