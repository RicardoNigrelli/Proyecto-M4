import React from "react";
import Image from "next/image";

function Benefits() {
  return (
    <div className="flex h-[300px] w-full items-center">
      <div className="flex w-full sm:w-1/2 flex-col items-center justify-center gap-2">
        <div className="flex gap-2">
          <div className="beneficts-container">
            <div className="flex justify-center">
              <Image
                src="/trophy-svgrepo-com.png"
                alt=""
                width={40}
                height={50}
              />
            </div>
            <p className="beneficts-text">Alta Calidad en Cada Producto</p>
          </div>
          <div className="beneficts-container">
            <div className="flex justify-center">
              <Image
                src="/truck-speed-svgrepo-com.png"
                alt=""
                width={40}
                height={50}
              />
            </div>
            <p className="beneficts-text">Envío Rápido y Seguro</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="beneficts-container">
            <div className="flex justify-center">
              <Image
                src="/discount-svgrepo-com.png"
                alt=""
                width={40}
                height={50}
              />
            </div>
            <p className="beneficts-text">Ofertas Exclusivas</p>
          </div>
          <div className="beneficts-container">
            <div className="flex justify-center">
              <Image
                src="/headphones-alt-2-svgrepo-com.png"
                alt=""
                width={40}
                height={50}
              />
            </div>
            <p className="beneficts-text">Soporte 24/7</p>
          </div>
        </div>
      </div>

      <div className="hidden sm:w-1/2 sm:flex">
        <h2 className="text-xl text-white lg:text-2xl xl:text-3xl">
          Beneficios <strong>por elegirnos</strong>
        </h2>
      </div>
    </div>
  );
}

export default Benefits;
