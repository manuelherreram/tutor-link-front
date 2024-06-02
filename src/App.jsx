import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Detail from './routes/detail/Detail'
import Layout from './components/layout/Layout'
import Home from './routes/home/Home'
import Admin from './routes/admin/Admin.jsx'
import { TeacherContextProvider } from './contexts/TeacherContext.jsx'
import NewTeacher from './routes/newTeacher/NewTeacher'
import Login from './routes/login/Login.jsx'
import Characteristics from './routes/characteristics/Characteristics.jsx'
import Register from './routes/register/Register.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import AdminRoute from './routes/AdminRoute.jsx'
import PrivateRoute from './routes/PrivateRoutes.jsx'
import CategoryFilters from './routes/catFilter/CategoryFilters.jsx'
import Categories from './routes/categories/Categories.jsx'
import Users from './components/admin/users/Users.jsx'
import Profile from './routes/Profile/Profile.jsx'

function App() {
    return (
        <>
            <BrowserRouter>
                <TeacherContextProvider>
                    <AuthProvider>
                        <Routes>
                            {/* Rutas no protegidas */}
                            <Route element={<Layout />}>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route
                                    path="/filter/:category"
                                    element={<CategoryFilters />}
                                />
                                {/* Rutas protegidas */}

                                <Route
                                    path="/detalle/:id"
                                    element={
                                        <PrivateRoute>
                                            <Detail />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/Profile"
                                    element={
                                        <PrivateRoute>
                                            <Profile />
                                        </PrivateRoute>
                                    }
                                />
                                {/* Rutas protegidas para administradores */}
                                <Route
                                    path="/admin"
                                    element={
                                        <AdminRoute>
                                            <Admin />
                                        </AdminRoute>
                                    }
                                />
                                
                                <Route
                                    path="/admin/new"
                                    element={
                                        <AdminRoute>
                                            <NewTeacher />
                                        </AdminRoute>
                                    }
                                />
                                <Route
                                    path="/admin/characteristics"
                                    element={
                                        <AdminRoute>
                                            <Characteristics />
                                        </AdminRoute>
                                    }
                                />
                                <Route
                                    path="/admin/users"
                                    element={
                                        <AdminRoute>
                                            <Users />
                                        </AdminRoute>
                                    }
                                />
                                <Route
                                    path="/admin/categories"
                                    element={
                                        <AdminRoute>
                                            <Categories />
                                        </AdminRoute>
                                    }
                                />
                            </Route>
                        </Routes>
                    </AuthProvider>
                </TeacherContextProvider>
            </BrowserRouter>
        </>
    )
}

export default App
