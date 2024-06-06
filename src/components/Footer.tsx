/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="flex h-[full] w-[full] items-center gap-4 rounded-[50px_50px_0px_0px] border border-solid border-[#3d3d3b] bg-[#121212] py-12 pl-3 lg:gap-0">
      <div className="flex w-1/3 justify-center sm:w-1/4">
        <img src="/logo.png" alt="logo" />
      </div>

      <div className="hidden flex-col justify-center sm:flex sm:w-1/4 sm:text-white">
        <div className="text-[11px] font-bold leading-[normal] text-white sm:w-[109px]">
          Contactanos
        </div>

        <p className="text-[10px] font-normal leading-[normal] text-white sm:w-[202px]">
          E: info@henrystore.com.ar
          <br />
          P: +92 151 5468798
          <br />
          A: 1235 Evergrenn St,
          <br />
          Cancún, Mexico
        </p>
      </div>

      <div className="hidden w-1/4 flex-col justify-center sm:flex sm:text-white">
        <div className="text-[11px] font-bold leading-[normal] text-white sm:w-[108px]">
          Links Útiles
        </div>
        <div className="text-[10px] leading-[normal] text-white sm:w-[144px]">
          <Link href="/">Inicio</Link>
          <br />
          <Link href="/products">Productos</Link>
          <br />
          <Link href="/about">Sobre Nosotros</Link>
          <br />
          <Link href="/faq">FAQ</Link>
        </div>
      </div>

      <div className="flex flex-row justify-center gap-5 sm:w-1/4 sm:flex-col sm:gap-1">
        <div className="flew-row flex items-center gap-3 text-[10px] font-normal text-white">
          <img
            className="-[20px] h-[20px]"
            alt="social1"
            src="/whatsapp-svgrepo-com.png"
          />
          <h4 className="hidden sm:flex sm:text-white">
            <a
              href="https://www.whatsapp.com/?lang=es_LA"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </h4>
        </div>
        <div className="flew-row flex items-center gap-3 text-[10px] font-normal text-white">
          <img
            className="-[20px] h-[20px]"
            alt="social2"
            src="/instagram-svgrepo-com.png"
          />
          <h4 className="hidden sm:flex sm:text-white">
            <a
              href="https://www.instagram.com/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </h4>
        </div>
        <div className="flew-row flex items-center gap-3 text-[10px] font-normal text-white">
          <img
            className="h-[20px] w-[20px]"
            alt="social3"
            src="/facebook-svgrepo-com.png"
          />
          <h4 className="hidden sm:flex sm:text-white">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Footer;
