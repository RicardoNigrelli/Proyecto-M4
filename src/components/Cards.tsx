"use client";
import { getProductById, getProducts } from "@/helpers/product.helper";
import Card from "./Card";
import { IProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Cards = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await getProducts();
        setProducts(product);
        console.log(product);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="mt-10 mb-5 h-14 w-full text-center">
        <span className="text-3xl font-normal text-white md:text-4xl lg:text-5xl">
          OFERTAS <strong>DESTACADAS</strong>
        </span>
        <div className="mt-3 flex justify-center ">
          <button className="bg-primary-500 flex h-[25px] w-[140px] items-center justify-center rounded-3xl border text-white sm:h-[27.5px] sm:w-[165px] lg:h-[30px] lg:w-[190px] xl:h-[30px] xl:w-[190px]">
            <Link href="/product" className="p-1  flex justify-center items-center">
              <span className="text-[7px] sm:text-[10px] font-normal md:text-[10px] lg:text-[11px] xl:text-[11px]">
                IR A <strong>TODOS LOS PRODUCTOS</strong>{" "}
              </span>
            </Link>

            <div className="relative h-[15px] w-[15px] sm:h-[17.5px] sm:w-[17.5px] lg:h-[20px] lg:w-[20px] xl:h-[20px] xl:w-[20px]">
              <Image
                src="/cart-shopping-svgrepo-com (3).svg"
                alt="shop"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </button>
        </div>
      </div>
      <div className="mt-[100px] flex flex-wrap justify-center">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
