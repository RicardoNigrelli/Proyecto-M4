/* eslint-disable @next/next/no-img-element */

import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen py-12 text-white">
      <div className="container mx-auto px-6">
        <h1 className="mb-8 text-center text-4xl font-bold">Sobre Nosotros</h1>

        <section className="mb-12">
          <div className="flex flex-col items-center lg:flex-row lg:space-x-6">
            <img
              src="/pexels-ketut-subiyanto-4245903.jpg"
              alt="Fundadores"
              className="mb-6 w-full transform rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 lg:mb-0 lg:w-1/2"
            />
            <div className="lg:w-1/2">
              <h2 className="mb-4 text-3xl font-semibold">Nuestra Historia</h2>
              <p className="mb-4 text-lg text-gray-200">
                Henry Store nació de la pasión de dos amigos por la tecnología y
                la moda. En el verano de 2015, Henry y Laura decidieron fusionar
                sus talentos para crear una tienda única que no solo ofreciera
                productos de calidad, sino también una experiencia inolvidable
                para cada cliente.
              </p>
              <p className="mb-4 text-lg text-gray-200">
                Desde un pequeño garaje, comenzaron con una visión clara:
                transformar la forma en que las personas compran en línea. Su
                compromiso con la innovación y el servicio al cliente pronto los
                convirtió en un nombre respetado en la industria.
              </p>
              <p className="text-lg text-gray-200">
                Hoy en día, Henry Store sigue siendo fiel a sus raíces,
                manteniendo la misma pasión y dedicación que en sus inicios. Nos
                enorgullecemos de ser más que una tienda; somos una comunidad
                que valora la calidad, la confianza y la satisfacción del
                cliente.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex flex-col-reverse items-center lg:flex-row lg:space-x-6">
            <div className="lg:w-1/2">
              <h2 className="mb-4 text-3xl font-semibold">Nuestra Misión</h2>
              <p className="mb-4 text-lg text-gray-200">
                En Henry Store, nuestra misión es ofrecer productos de alta
                calidad que mejoren la vida de nuestros clientes. Creemos en el
                poder de la tecnología y el diseño para crear experiencias
                memorables.
              </p>
              <p className="mb-4 text-lg text-gray-200">
                Trabajamos incansablemente para asegurarnos de que cada
                interacción con nuestra tienda sea positiva, proporcionando un
                servicio al cliente excepcional y una selección curada de
                productos innovadores.
              </p>
              <p className="text-lg text-gray-200">
                Estamos dedicados a hacer que cada visita a Henry Store sea una
                aventura emocionante y satisfactoria, donde nuestros clientes
                puedan encontrar exactamente lo que necesitan.
              </p>
            </div>
            <img
              src="/pexels-tranmautritam-326503.jpg"
              alt="Nuestra Misión"
              className="mb-6 w-full transform rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 lg:mb-0 lg:w-1/2"
            />
          </div>
        </section>

        <section>
          <div className="flex flex-col items-center lg:flex-row lg:space-x-6">
            <img
              src="/pexels-karolina-grabowska-6958615.jpg"
              alt="Nuestra Visión"
              className="mb-6 w-full transform rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 lg:mb-0 lg:w-1/2"
            />
            <div className="lg:w-1/2">
              <h2 className="mb-4 text-3xl font-semibold">Nuestra Visión</h2>
              <p className="mb-4 text-lg text-gray-200">
                Visualizamos un futuro donde Henry Store sea sinónimo de calidad
                y confianza. Nos esforzamos por ser líderes en la industria,
                innovando constantemente y adaptándonos a las necesidades
                cambiantes de nuestros clientes.
              </p>
              <p className="mb-4 text-lg text-gray-200">
                Queremos ser más que una tienda en línea; aspiramos a ser una
                fuente de inspiración y un referente en el sector del comercio
                electrónico. Nuestra visión es crear un impacto positivo en la
                vida de las personas a través de productos excepcionales y un
                servicio al cliente inigualable.
              </p>
              <p className="text-lg text-gray-200">
                A medida que crecemos, seguimos comprometidos con nuestros
                valores fundamentales y la misión que nos inspiró a comenzar
                este viaje.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
