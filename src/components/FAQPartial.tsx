/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useState } from "react";

function FAQPartial() {
  const faqData = [
    {
      question: "¿Cómo es el proceso de envío y cuánto tiempo tarda?",
      answer:
        "Una vez que se realiza el pedido, se procesa y se envía dentro de 1-2 días hábiles. El tiempo de entrega puede variar dependiendo de su ubicación, pero generalmente se espera que llegue entre 5-7 días hábiles.",
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

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center p-5">
      <div>
        <h2 className="pb-4 text-xl text-white lg:text-2xl xl:text-3xl">
          Preguntas <strong>Frecuentes</strong>
        </h2>
      </div>

      {faqData.map((faq, index) => (
        <div
          key={index}
          className="mb-3 w-full max-w-2xl rounded-3xl border border-neutral-700 p-5"
        >
          <div className="flex items-center justify-between ">
            <h4 className="w-2/3 text-[10px] text-white sm:text-sm">
              {faq.question}
            </h4>
            <button
              onClick={() => handleToggle(index)}
              className={`flex h-[25px] w-[25px] items-center justify-center rounded-full border border-neutral-700 transition-transform ${
                openIndex === index ? "rotate-0" : "-rotate-180"
              }`}
            >
              <img
                src="/arrow-up-340-svgrepo-com.svg"
                alt="Arrow Up"
                className="h-[20px] w-[20px]"
              />
            </button>
          </div>
          {openIndex === index && (
            <p className="mt-3 w-full transform break-words text-xs text-white transition-all duration-300 ease-out sm:text-sm">
              {" "}
              {faq.answer}
            </p>
          )}
        </div>
      ))}

      <div className="flex h-[25px] w-[140px] items-center justify-center rounded-3xl border border-neutral-700">
        <button className="flex h-[25px] w-[130px] items-center justify-center text-sm text-white">
          <Link href="/faq">Ver Más...</Link>
        </button>
      </div>
    </div>
  );
}

export default FAQPartial;
