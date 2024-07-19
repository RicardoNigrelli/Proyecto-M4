"use client"

import { IProduct } from "@/types";
import React from "react";
import Image from "next/image";
import categoriesToPreLoad from "@/helpers/preloadCategories";

const Card: React.FC<IProduct> = ({
  image,
  name,
  description,
  price,
  categoryId,
}) => {
  return (
    <div className="mb-12 ml-[30px] mr-[30px] flex h-[350px] w-[200px] flex-col items-center justify-center gap-1 rounded-3xl border border-neutral-700 sm:ml-[30px] sm:mr-[30px] sm:h-[350px] sm:w-[200px] lg:ml-[50px] lg:mr-[50px] lg:h-[450px] lg:w-[300px] xl:ml-[50px] xl:mr-[50px] xl:h-[450px] xl:w-[300px]">
      <div className="flex h-[130px] w-[150px] items-center justify-center sm:h-[135px] sm:w-[200px] lg:h-[170px] lg:w-[200px] xl:h-[170px] xl:w-[200px]">
        <Image
          src={image}
          alt={name}
          width={150}
          height={130}
          className="object-cover"
        />
      </div>
      <div className="flex w-full flex-col justify-around pl-4 pr-4">
        <p className="pb-2 font-bold text-white">{name}</p>
        <div className="mb-2 h-[1px] w-full bg-white text-white"></div>
        <p
          className="h-[35px] w-[180px] overflow-hidden text-wrap pr-1 text-[13px] text-white sm:h-[35px] sm:w-[180px] lg:h-[40px] lg:w-[280px] xl:h-[40px] xl:w-[280px]"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </p>
        <div className="mt-2 flex w-full flex-col justify-around gap-1 text-white">
          <p className="font-bold">${price}</p>
          <p className="text-[11px]">
            Categoría: {categoriesToPreLoad[categoryId].name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
