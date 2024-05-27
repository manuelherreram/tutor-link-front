import { TextField,Button } from "@mui/material"
import {useFormik} from "formik"
import { useState } from "react";
import { storage } from '../../../firebase/firebaseConfig';
import { ref, uploadBytes } from "firebase/storage";
import ImageUploader from "../../form/ImageUploader";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import './Charform.css'

const CharForm = ()=>{
  const navigate=useNavigate()
  const { idToken } = useAuth();
  const[mostrar,setMostrar]=useState()
    const {
      handleChange,
      handleSubmit,
      errors,
      values
  
    } = useFormik({
      initialValues: {
        name: '',
        url: '',
        
      },

      onSubmit: async (data, { setSubmitting }) => {
        //manejo de imágenes
        try {
          if (data.images && data.images.length > 0) {
            const imageUrls = await Promise.all(
              data.images.map(async (image) => {
                console.log(storage)
                console.log(image)
                const storageRef = ref(storage, `images/${image.title}`);
      console.log("storageRef", storageRef);
                console.log(`Subiendo imagen: ${image.title}`); 
                const url= await uploadBytes(storageRef,image)
                console.log(url)
                console.log(`URL obtenida: ${url}`); 
                return url;
              })
            );
  
            // data.images = imageUrls;
            console.log('URLs de imágenes:', data.images); 
          } else {
            console.log('No se seleccionaron imágenes.');
          }
          const response = await registerCharacteristic(data, idToken);
        setMostrar(false);
        console.log('Respuesta del servidor:', response);
        navigate('/admin');
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      } finally {
        setSubmitting(false);
      }
        }
    });

    return (

    <form className="characteristics" onSubmit={handleSubmit}>
    <h4>Características del tutor </h4>
    <TextField
      type="text"
      onChange={handleChange}
      name="name"
      label="Ingrese el nombre de la característica"
      variant="outlined"
      error={errors.name ? true : false}
      helperText={errors.name}
    />
    <ImageUploader
            folderName={values.name}
       
          />
    <Button type="submit" variant="contained" color="primary">
      Enviar
    </Button>
  </form>
  )
  
  }
  export default CharForm