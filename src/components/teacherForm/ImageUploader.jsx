import { useState } from 'react';
import { storage } from '../../firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ImageUploader = ({ folderName, setFieldValue }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    console.log('Archivo seleccionado:', file);

    const storageRef = ref(storage, `images/${folderName}/${file.name}`);
    console.log("storageRef", storageRef);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Progreso de carga:', progress + '% completado');
      },
      (error) => {
        console.error('Error al cargar la imagen:', error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(storageRef); 
          console.log('URL de descarga de la imagen:', downloadURL);
          setImageUrl(downloadURL);
          setFieldValue('images',[{url:downloadURL,title:file.name}])
        } catch (error) {
          console.error('Error al obtener la URL de descarga:', error);
        }
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {imageUrl && (
        <div>
          <h3>Imagen Subida:</h3>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '300px', maxHeight: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;