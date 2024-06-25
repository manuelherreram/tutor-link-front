import { useState, useEffect } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import "./WhatsAppButton.css"; // Importa los estilos

const WhatsAppButton = () => {
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (messageSent) {
      const timer = setTimeout(() => {
        setMessageSent(false);
      }, 3000); // 3 segundos

      return () => clearTimeout(timer); // Limpiar el timeout si el componente se desmonta
    }
  }, [messageSent]);

  const handleSubmit = (event, formValue) => {
    // Simular el envío del mensaje y manejar la notificación de éxito
    setMessageSent(true);
    setError(null);

    // Usar la API de notificaciones del navegador
    if (Notification.permission === "granted") {
      new Notification("Mensaje enviado con éxito!");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Mensaje enviado con éxito!");
        }
      });
    }
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setMessageSent(false);

    // Usar la API de notificaciones del navegador para manejar errores
    if (Notification.permission === "granted") {
      new Notification("Error al enviar el mensaje: " + errorMessage);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Error al enviar el mensaje: " + errorMessage);
        }
      });
    }
  };

  return (
    <div>
      <FloatingWhatsApp
        phoneNumber="+56978517927" // Reemplaza con el número de teléfono del proveedor
        accountName="Tutor Link - Tu camino al éxito"
        //avatar="https://example.com/avatar.png" // URL del avatar opcional
        statusMessage="Normalmente responde en 1 hora"
        chatMessage="¡Hola! ¿Cómo puedo ayudarte?"
        placeholder="Escribe un mensaje..."
        notification
        notificationSound
        darkMode={false}
        style={{ right: "20px", bottom: "20px" }} // Estilo para ubicar el botón en la esquina inferior derecha
        onSubmit={(event, formValue) => handleSubmit(event, formValue)}
      />
      {messageSent && (
        <div className="success-message">Mensaje enviado con éxito!</div>
      )}
      {error && <div className="error-message">Error: {error}</div>}
    </div>
  );
};

export default WhatsAppButton;
