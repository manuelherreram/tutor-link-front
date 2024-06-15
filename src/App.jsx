import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./routes/detail/Detail";
import Layout from "./components/layout/Layout";
import Home from "./routes/home/Home";
import Admin from "./routes/admin/Admin.jsx";
import { TeacherContextProvider } from "./contexts/TeacherContext.jsx";
import NewTeacher from "./routes/newTeacher/NewTeacher";
import Login from "./routes/login/Login.jsx";
import Characteristics from "./routes/characteristics/Characteristics.jsx";
import Register from "./routes/register/Register.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import PrivateRoute from "./routes/PrivateRoutes.jsx";
import CategoryFilters from "./routes/catFilter/CategoryFilters.jsx";
import Categories from "./routes/categories/Categories.jsx";
import Users from "./components/admin/users/Users.jsx";
import Profile from "./routes/Profile/Profile.jsx";
import { FavoriteProvider } from "./contexts/FavoriteContexts.jsx";
import Favorites from "./components/favorites/Favorites.jsx";
import Reservations from "./routes/reservations/Reservations.jsx";
function App() {
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <TeacherContextProvider>
          <AuthProvider>
            <FavoriteProvider>
              <Routes>
                {/* Rutas no protegidas */}
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/filter/:category"
                    element={<CategoryFilters />}
                  />
                  <Route path="/detalle/:id" element={<Detail />} />

                  {/* Rutas protegidas sólo para logueados */}
                  <Route
                    path="/Profile"
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/favorites"
                    element={
                      <PrivateRoute>
                        <Favorites />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/reservations"
                    element={
                      <PrivateRoute>
                        <Reservations />
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
            </FavoriteProvider>
          </AuthProvider>
        </TeacherContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
