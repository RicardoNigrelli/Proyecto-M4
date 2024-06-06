/* eslint-disable @next/next/no-img-element */
"use client"
import React from "react";
import Link from "next/link";

function Header() {
  return (
    <>
      <div className="flex h-[500px] w-full flex-col justify-center gap-5 p-4 text-white sm:w-1/2 md:pl-12">
        <h1 className="border border-transparent text-[7vw] font-normal text-white sm:text-[5vw] md:text-4xl lg:text-4xl xl:text-5xl">
          LAS MEJORES MARCAS AL <strong>MEJOR PRECIO</strong>
        </h1>
        <p className="h-13 w-4/4 sm:3/4 text-wrap text-[4vw] sm:text-[2.5vw] lg:text-[2vw] xl:text-[1vw] md:w-3/4 lg:w-3/4 xl:w-[400px]">
          Aprovecha nuestras ofertas exclusivas en productos electrónicos de
          alta calidad con envío rápido y soporte excepcional.
        </p>
        <button className=" h-12 items-center justify-center rounded-3xl border border-neutral-700 bg-neutral-900 hover:bg-[#001344] sm:w-[15vw] lg:flex">
          <Link
            href="/product"
            className="Productos text-md text-center font-normal text-neutral-400"
          >
            ¡Compra Ahora!
          </Link>
        </button>
      </div>
      <div className="h-0 w-0 sm:[flex] items-center justify-center sm:h-[80vw] sm:w-1/2 lg:h-[500px]">
        <img
          className="object-cover w-[100%] h-[100%] sm:w-[80%] sm:h-[80%] md:w-[70%] md:h-[70%] lg:w-[100%] lg:h-[100%] xl:w-[100%] xl:h-[100%]"
          alt="Pngwing"
          src="/pngwing.png"
  
        />
      </div>
    </>
  );
}

export default Header;
