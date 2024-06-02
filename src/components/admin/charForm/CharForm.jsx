import { Form, Input, Button, } from 'antd';
import { useFormik } from 'formik';
import { useAuth } from '../../../contexts/AuthContext';
import { registerChar } from '../../../api/api';
import "./Charform.css";

const CharForm = ({ onSave, onCancel,characteristic }) => {
  const { idToken } = useAuth();
 
const initialValues= characteristic ??  {
  name: '',
  url: '',
};

  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues,
    onSubmit: async (formData, { setSubmitting }) => {
      try {
       onSave( formData);
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      } finally {
        setSubmitting(false);
      }
    }
  });

 
  return (
    <Form className="characteristics" onFinish={handleSubmit}   >
      <h3>NUEVA CARACTERÍSTICA</h3>
      <Form.Item
        label="Ingrese el nombre de la característica"
        validateStatus={errors.name ? 'error' : ''}
        help={errors.name}
      >
        <Input
          name="name"
          value={values.name}
          onChange={handleChange}
        />
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

export default CharForm;
