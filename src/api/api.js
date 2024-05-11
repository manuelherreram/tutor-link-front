import axios from 'axios';



//Peticiones al servidor
//Listar a los profesores
export const getData = async () => {
  let res = await axios.get('http://localhost:8080/api/teachers');
  return res.data;
};

//buscar un profesor por su id
export const getDataById = async (id) => {
  let res = await axios.get(`http://localhost:8080/api/teachers/${id}`);
  return res.data;
};

//Registrar a un nuevo profesor
export const register = async (data) => {

    const response = await axios.post(
      'http://localhost:8080/api/teachers',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
 
};

//Validar nombre del profesor
export const verificarNombreEnServidor = async (name) => {
 
    const response = await axios.get('http://localhost:8080/api/teachers/admin');
    const data = response.data;
    const nombreExistente = data.some(profesor => profesor.name === name);
    return !nombreExistente;
  
 
};