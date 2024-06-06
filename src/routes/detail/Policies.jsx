import React from 'react';
import './Policies.css';

const policiesData = [
  {
    title: "Política de Reservas",
    description: "Las reservas deben ser realizadas con al menos 24 horas de antelación. Cancelaciones deben ser hechas con 12 horas de antelación para obtener un reembolso completo."
  },
  {
    title: "Política de Asistencia",
    description: "Los profesores deben llegar puntualmente a las clases reservadas. Los alumnos también deben estar presentes a la hora de inicio de la clase."
  },
  {
    title: "Política de Cancelaciones",
    description: "Las cancelaciones realizadas con menos de 12 horas de antelación no serán reembolsadas. Los profesores que cancelen una clase deben informar a los alumnos lo antes posible."
  },
  {
    title: "Política de Pago",
    description: "Los pagos deben ser realizados a través de la plataforma antes del inicio de la clase. No se aceptan pagos en efectivo."
  },
  {
    title: "Política de Comportamiento",
    description: "Se espera que tanto profesores como alumnos mantengan un comportamiento respetuoso durante las clases. Cualquier forma de acoso o comportamiento inapropiado no será tolerado."
  }
];

const Policies = () => {
  return (
    <div className="policies-container">
      <h2 className="policies-title">Políticas de Uso</h2>
      <div className="policies-columns">
        {policiesData.map((policy, index) => (
          <div key={index} className="policy">
            <h3 className="policy-title">{policy.title}</h3>
            <p className="policy-description">{policy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policies;