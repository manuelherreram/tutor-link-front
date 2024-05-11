import React, { useState } from 'react';
import { storage } from './firebaseConfig';

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState(''); // Estado para almacenar la URL de descarga de la imagen

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]; // Obtener el archivo seleccionado por el usuario
    console.log('Archivo seleccionado:', file);

    const storageRef = storage.ref(`images/${file.name}`); // Referencia al archivo en Firebase Storage
    const uploadTask = storageRef.put(file); // Subir el archivo a Firebase Storage

    uploadTask.on('state_changed',
      (snapshot) => {
        // Aquí puedes manejar el progreso de la carga si lo deseas
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Progreso de carga:', progress + '% completado');
      },
      (error) => {
        console.error('Error al cargar la imagen:', error);
      },
      async () => {
        // La carga se ha completado con éxito
        const url = await storageRef.getDownloadURL(); // Obtener la URL de descarga de la imagen subida
        console.log('URL de descarga de la imagen:', url);
        setImageUrl(url); // Establecer la URL de descarga en el estado para mostrar la imagen
      }
    );
  };

  return (
    <div>
      {/* Input para seleccionar una imagen */}
      <input type="file" onChange={handleImageUpload} />

      {/* Mostrar la imagen subida si hay una URL de descarga */}
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