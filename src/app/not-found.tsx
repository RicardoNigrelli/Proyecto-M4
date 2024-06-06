/* eslint-disable @next/next/no-img-element */
// pages/404.tsx

import React from "react";
import Link from "next/link";

const notFound = () => {
  return (
    <div className="min-h-screen py-12 text-white">
      <div className="container mx-auto px-6 text-center">
        <h1 className="mb-8 text-6xl font-bold">404</h1>
        <h2 className="mb-4 text-3xl font-semibold">Página no encontrada</h2>
        <p className="mb-8 text-lg text-gray-200">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>

        <img
          src="/pexels-bakr-magrabi-928159-3385615.jpg"
          alt="Página no encontrada"
          className="mx-auto mb-8 w-full max-w-lg transform rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        />

        <Link
          href="/"
          className="text-lg font-semibold text-blue-500 hover:underline"
        >
          Volver a la página principal
        </Link>
      </div>
    </div>
  );
};

export default notFound;
