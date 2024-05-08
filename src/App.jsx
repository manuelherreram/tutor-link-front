import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detail from './routes/detail/Detail';
import Layout from './components/layout/Layout';
import Home from './routes/home/Home';
import Admin from './routes/admin/Admin.jsx';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/detalle/:id" element={<Detail/>} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
