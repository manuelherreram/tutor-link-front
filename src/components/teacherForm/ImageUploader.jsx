import { useState } from 'react';
import { storage } from '../../firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const ImageUploader = ({ folderName, setFieldValue }) => {
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    console.log('Archivos seleccionados:', files);
  
    if (files && files.length > 0) { // Verificar si se han seleccionado archivos
      const urlsPromises = Array.from(files).map(async (file) => {
        if (file) { // Verificar si el archivo es válido
          const storageRef = ref(storage, `images/${folderName}/${file.name}`);
          console.log("storageRef", storageRef);
  
          const uploadTask = uploadBytesResumable(storageRef, file);
  
          await uploadTask.on('state_changed',
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
                setImageUrls(prevUrls => [...prevUrls, { url: downloadURL, title: file.name }]);
              } catch (error) {
                console.error('Error al obtener la URL de descarga:', error);
              }
            }
          );
        }
      });
  
      await Promise.all(urlsPromises);
      setFieldValue('images', imageUrls);
    } else {
      console.warn('No se seleccionaron archivos.');
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleImageUpload} />
      {imageUrls.map((imageUrl, index) => (
        <div key={index}>
          <h3>Imagen Subida:</h3>
          <img
            src={imageUrl.url}
            alt="Uploaded"
            style={{ maxWidth: '300px', maxHeight: '300px' }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageUploader;
