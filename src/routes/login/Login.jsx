import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom' // For navigation
import './Login.css'
import { useAuth } from '../../contexts/AuthContext'
import { doSignInWithEmailAndPassword } from '../../firebase/auth'

const Login = () => {
    const navigate = useNavigate()
    const { userLoggedIn, currentUser } = useAuth()
    const [errors, setErrors] = useState({}) 

    const handleSubmit = async data => {
        const { email, password } = data

        try {
            await doSignInWithEmailAndPassword(email, password)
            console.log(userLoggedIn, 'user')
            navigate('/')
        } catch (error) {
            console.error('Login failed:', error)

            if (error.code === 'auth/wrong-password') {
                setErrors({ password: 'Contraseña incorrecta.' })
            } else if (error.code === 'auth/invalid-credential') {
                setErrors({ email: 'Usuario no encontrado.' })
            } else {
                setErrors({ general: 'Ocurrió un error al iniciar sesión.' })
            }
        }
    }

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
                .required('Obligatorio')
                .min(6, 'La contraseña debe tener al menos 6 caracteres'),
        }),
        validateOnChange: false, // Only validate on submit
    })

    return (
        <main className="container-login">
            <form className="container-form" onSubmit={formik.handleSubmit}>
                <h3>Iniciar sesión</h3>
                <TextField
                    type="email"
                    onChange={formik.handleChange}
                    name="email"
                    label="Ingrese su email"
                    variant="outlined"
                    error={errors.email ? true : false}
                    helperText={errors.email}
                />
                <TextField
                    type="password"
                    onChange={formik.handleChange}
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
                {errors.general && (
                    <p className="error-message">{errors.general}</p>
                )}
            </form>

            {userLoggedIn && (
                <div>
                    <p>
                        Nombre: {currentUser.displayName || currentUser.email}
                    </p>
                    <p>ID de usuario: {currentUser.uid}</p>
                </div>
            )}
        </main>
    )
}

export default Login
