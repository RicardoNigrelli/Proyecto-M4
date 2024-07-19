/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Review } from "@/types";
import React, { useEffect, useState } from "react";

const reviews: Review[] = [
  {
    name: "Javier, Buenos Aires",
    image: "/persona0.jpg",
    review:
      "El servicio al cliente es excepcional. Siempre están dispuestos a ayudar y resolver cualquier problema de manera eficiente.",
  },
  {
    name: "Lucia, Santa Fe",
    image: "/persona1.jpg",
    review:
      "Los productos son de alta calidad y siempre llegan a tiempo. Estoy muy satisfecha con mi experiencia de compra.",
  },
  {
    name: "Juana, Córdoba",
    image: "/persona3.jpg",
    review:
      "La empresa muestra un alto nivel de profesionalismo. Siempre se esfuerzan por superar las expectativas.",
  },
  {
    name: "Andrés, Mendoza",
    image: "/persona4.jpg",
    review:
      "La página web es muy fácil de usar y tiene una gran variedad de productos. Hace que comprar sea una experiencia agradable.",
  },
  {
    name: "Pedro, Tucumán",
    image: "/persona5.jpg",
    review:
      "Estoy impresionado con su compromiso con la sostenibilidad. Es una empresa que realmente se preocupa por el medio ambiente.",
  },
];

function Reviews() {
const [activeIndex, setActiveIndex] = useState<number>(0);
const [nextClicked, setNextClicked] = useState<boolean>(false);
const [prevClicked, setPrevClicked] = useState<boolean>(false);

const handleNext: (event: React.MouseEvent<HTMLButtonElement>) => void = (
  event,
) => {
  if (activeIndex === reviews.length - 1) {
    setActiveIndex(0);
  } else {
    setActiveIndex(activeIndex + 1);
  }
  setNextClicked(true);
};

const handlePrev: (event: React.MouseEvent<HTMLButtonElement>) => void = (
  event,
) => {
  if (activeIndex === 0) {
    setActiveIndex(reviews.length - 1);
  } else {
    setActiveIndex(activeIndex - 1);
  }
  setPrevClicked(true);
};

  useEffect(() => {
    if (prevClicked) {
      const timer = setTimeout(() => {
        setPrevClicked(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [prevClicked]);

  useEffect(() => {
    if (nextClicked) {
      const timer = setTimeout(() => {
        setNextClicked(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [nextClicked]);

  return (
    <div className="flex p-4">
      <div className="hidden items-center justify-center sm:flex sm:w-2/5">
        <h2 className="text-xl text-white lg:text-2xl xl:text-3xl">
          Nuestros <strong>Clientes</strong>
        </h2>
      </div>

      <div className="flex w-full sm:w-3/5 flex-col items-center justify-center">
        <button
          onClick={handlePrev}
          className="flex h-[25px] w-[116px] items-center justify-center rounded-3xl border border-neutral-700"
        >
          <img
            src={"/arrow-up-340-svgrepo-com.svg"}
            alt="Arrow Up"
            className="h-[20px] w-[30px]"
          />
        </button>
        <div className={`review ${prevClicked ? "animate-pulseIn" : ""}`}>
          <div className="m-2 flex w-full items-center justify-center p-0 sm:w-2/4">
            <img
              src={reviews[activeIndex].image}
              alt={reviews[activeIndex].name}
            />
          </div>
          <div className="w-full sm:w-2/4">
            <h3>{reviews[activeIndex].name}</h3>
            <p>"{reviews[activeIndex].review}"</p>
          </div>
        </div>
        <div className={`review ${nextClicked ? "animate-pulseIn" : ""}`}>
          <div className="m-2 flex w-full items-center justify-center p-0 sm:w-2/4">
            <img
              src={reviews[(activeIndex + 1) % reviews.length].image}
              alt={reviews[(activeIndex + 1) % reviews.length].name}
            />
          </div>
          <div className="w-full sm:w-2/4">
            <h3>{reviews[(activeIndex + 1) % reviews.length].name}</h3>
            <p>"{reviews[(activeIndex + 1) % reviews.length].review}"</p>
          </div>
        </div>
        <button
          onClick={handleNext}
          className="flex h-[25px] w-[116px] -rotate-180 items-center justify-center rounded-3xl border border-neutral-700"
        >
          <img
            src={"/arrow-up-340-svgrepo-com.svg"}
            alt="Arrow Up"
            className="h-[20px] w-[30px]"
          />
        </button>
      </div>
    </div>
  );
}

export default Reviews;
