import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detail from './routes/detail/Detail';
import Layout from './components/layout/Layout';
import Home from './routes/home/Home';
import Admin from './routes/admin/Admin.jsx';
import { TeacherContextProvider } from './contexts/TeacherContext.jsx';
import NewTeacher from './routes/newTeacher/NewTeacher';
import Login from './routes/login/Login.jsx';
import Characteristics from './routes/characteristics/Characteristics.jsx';
import Register from './routes/register/Register.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import PrivateRoute from './routes/PrivateRoutes.jsx';

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
                <Route path="/detalle/:id" element={<Detail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rutas protegidas */}

                <Route
                  path="/admin"
                  element={
                    <PrivateRoute>
                      <Admin />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/new"
                  element={
                    <PrivateRoute>
                      <NewTeacher />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/characteristics"
                  element={
                    <PrivateRoute>
                      <Characteristics />
                    </PrivateRoute>
                  }
                />
              </Route>
            </Routes>
          </AuthProvider>
        </TeacherContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
