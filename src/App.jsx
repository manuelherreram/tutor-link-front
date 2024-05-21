import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detail from './routes/detail/Detail';
import Layout from './components/layout/Layout';
import Home from './routes/home/Home';
import Admin from './routes/admin/Admin.jsx';
import { TeacherContextProvider } from './components/utils/context/TeacherContext.jsx';
import NewTeacher from'./routes/newTeacher/NewTeacher'
import Login from'./routes/login/Login.jsx'
import Register from './routes/register/Register.jsx'


function App() {
  return (
    <>
      <BrowserRouter>
      <TeacherContextProvider>
        <Routes>
          
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/detalle/:id" element={<Detail/>} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/new" element={<NewTeacher/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Route>
        </Routes>
        </TeacherContextProvider>
      </BrowserRouter>
    
    </>
  );
}

export default App;
