import { useState } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { storage } from '../../../firebase/firebaseConfig';
import { ref, uploadBytes } from 'firebase/storage';
import { useAuth } from '../../../contexts/AuthContext';
import "./CatForm.css";
import { registerCategories } from '../../../api/api';


const CatForm = ({ onSave, onCancel }) => {
  const { idToken } = useAuth();
  const [imageList, setImageList] = useState([]);

  const { handleChange, handleSubmit, errors, values, setFieldValue } = useFormik({
    initialValues: {
      title: '',
      images: []
    },
    onSubmit: async (data, { setSubmitting }) => {
      try {
        if (imageList && imageList.length > 0) {
          const imageUrls = await Promise.all(
            imageList.map(async (file) => {
              const storageRef = ref(storage, `images/${file.name}`);
              const snapshot = await uploadBytes(storageRef, file);
              const url = await getDownloadURL(snapshot.ref);
              return url;
            })
          );
          data.images = imageUrls;
        } else {
          console.log('No se seleccionaron imágenes.');
        }
        const response = await registerCategories(data, idToken);
        onSave(response); // Asegúrate de pasar la respuesta directamente
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  const handleUploadChange = ({ fileList }) => {
    setImageList(fileList.map(file => file.originFileObj));
    setFieldValue('images', fileList.map(file => file.originFileObj));
  };

  return (
    <Form className="categories" onFinish={handleSubmit}>
      <h3>NUEVA CATEGORÍA</h3>
      <Form.Item
        label="Ingrese el nombre de la categoria"
        validateStatus={errors.title ? 'error' : ''}
        help={errors.title}
      >
        <Input
          name="title"
          value={values.title}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Cargar Imágenes">
        <Upload
          multiple
          listType="picture"
          beforeUpload={() => false} // Prevents automatic upload
          onChange={handleUploadChange}
        >
          <Button icon={<UploadOutlined />}>Seleccionar Imágenes</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
          Enviar
        </Button>
        <Button onClick={onCancel}>
          Cancelar
        </Button>
      </Form.Item>
    </Form>
  );
};



export default CatForm;