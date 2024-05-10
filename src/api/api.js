import axios from 'axios';

export const getData = async () => {
  let res = await axios.get('http://localhost:8080/api/teachers');
  return res.data;
};
export const getDataById = async (id) => {
  let res = await axios.get(`http://localhost:8080/api/teachers/${id}`);
  // let res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
  return res.data;
};
export const register = async () => {
  const payload = {
    name: '',
    dni: '',
    description: '',
    subject: '',
    images: [],
  };
  let res = await axios.post('http://localhost:8080/api/teachers', payload);
  return res.data;
};
