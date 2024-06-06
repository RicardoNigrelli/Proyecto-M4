
import React from "react";

const FAQ: React.FC = () => {
  const faqData = [
    {
      question: "¿Cómo puedo realizar una compra?",
      answer:
        "Para realizar una compra, simplemente navega por nuestros productos, agrega los artículos deseados al carrito y sigue las instrucciones para completar el proceso de pago. Te enviaremos una confirmación por correo electrónico una vez que tu pedido haya sido procesado.",
    },
    {
      question: "¿Cuáles son los métodos de pago aceptados?",
      answer:
        "Aceptamos una variedad de métodos de pago, incluyendo tarjetas de crédito, débito y pagos a través de PayPal. Todos los pagos son seguros y están encriptados para proteger tu información.",
    },
    {
      question: "¿Cómo es el proceso de envío y cuánto tiempo tarda?",
      answer:
        "Una vez que se realiza el pedido, se procesa y se envía dentro de 1-2 días hábiles. El tiempo de entrega puede variar dependiendo de su ubicación, pero generalmente se espera que llegue entre 5-7 días hábiles.",
    },
    {
      question: "¿Puedo devolver un producto?",
      answer:
        "Sí, aceptamos devoluciones dentro de los 30 días posteriores a la compra. Los productos deben estar en su estado original y sin usar. Para iniciar una devolución, por favor contáctanos a través de nuestro servicio de atención al cliente.",
    },
    {
      question: "¿Qué garantías ofrecen en sus productos?",
      answer:
        "Ofrecemos una garantía de 30 días en todos nuestros productos. Si no está satisfecho con su compra por cualquier motivo, puede devolverla para un reembolso completo o un cambio dentro de ese período.",
    },
    {
      question: "¿Cómo puedo contactar con el servicio al cliente?",
      answer:
        "Puede contactar con nuestro servicio al cliente a través de nuestro formulario de contacto en la página web, o directamente por correo electrónico a servicioalcliente@nuestraempresa.com. Nos esforzamos por responder a todas las consultas dentro de 24 horas.",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          Preguntas Frecuentes
        </h1>

        <section className="mb-12">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="mb-6 transform rounded-lg border border-neutral-700 p-6 shadow-md transition-transform duration-300 hover:scale-105"
            >
              <h2 className="mb-4 text-2xl font-semibold text-white">
                {item.question}
              </h2>
              <p className="text-lg text-gray-300">{item.answer}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default FAQ;
