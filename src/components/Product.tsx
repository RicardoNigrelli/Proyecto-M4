/* eslint-disable @next/next/no-img-element */
"use client";

import { getProductById } from "@/helpers/product.helper";
import { IProduct } from "@/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { notify } from "@/components/Notifications";
import "react-toastify/dist/ReactToastify.css";

const DetailProduct = ({ params }: { params: { idProduct: string } }) => {
  const [product, setProduct] = useState<IProduct>();
  const { isLoggedIn } = useAuth();
  const { addToCart, cart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await getProductById(params.idProduct);
        setProduct(product);
        console.log(product);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchData();
  }, [params.idProduct]);

  const handleAddToCart = () => {
    if (product && isLoggedIn) {
      const isProductInCart = cart.some((item) => item.id === product.id);
      if (isProductInCart) {
        notify("ToastError", "¡El producto ya está en el carrito!");

        return;
      }
      addToCart(product);
      notify("ToastCart", "¡Producto agregado!");
    } else if (!isLoggedIn) {
      notify(
        "ToastRedirect",
        "¡Debes tener una cuenta para agregar productos al carrito!",
      );
      router.push("/");
    }
  };

  return (
    <>
      <div className="w-vw mb-10 flex h-full flex-col items-center">
        <Link
          href="/product"
          className="flex h-8 w-[60vw] flex-row items-center gap-1"
        >
          <img
            src={"/arrow-up-340-svgrepo-com.svg"}
            alt="Arrow Up"
            className="h-[20px] w-[30px] -rotate-90"
          />
          <p className="text-white"> Volver a la</p>
          <p className="font-bold text-white"> tienda</p>
        </Link>
        <div className="flex flex-row justify-center gap-2 rounded-3xl border border-neutral-700 p-10">
          <div className="flex w-fit items-center justify-center">
            <div className="w-fit">
              <img
                src={product?.image || "/default-image-path"}
                alt={product?.name || "default alt text"}
                className="m-0 flex min-w-[150px] max-w-[20vw] items-center justify-center rounded-3xl border border-neutral-700 p-0"
              />
            </div>
          </div>
          <div className="flex w-[40vw] flex-col justify-center gap-7">
            <h2 className="text-[15px] font-bold text-white md:text-[1.5vw]">
              {product?.name}
            </h2>
            <div className="h-[2px] w-[40vw] bg-neutral-700"></div>

            <p className="w-fit text-[10px] text-white md:text-[1vw]">
              <u> Descripción:</u> <br /> {product?.description}
            </p>
            <div className="h-[2px] w-[40vw] bg-neutral-700"></div>
            <div className="flex flex-row justify-around">
              <p className="text-[10px] text-white md:text-[1.5vw]">
                ${product?.price}
              </p>

              <div className="mt-2 flex justify-center">
                <button
                  className="bg-primary-500 flex items-center justify-center rounded-3xl border p-1 text-white"
                  onClick={handleAddToCart}
                >
                  <span className="text-[8px] font-normal md:text-[0.8vw]">
                    AGREGAR AL <strong>CARRITO</strong>{" "}
                  </span>

                  <div className="relative h-[10px] w-[10px] md:h-[1vw] md:w-[1vw]">
                    <Image
                      src="/cart-shopping-svgrepo-com (3).svg"
                      alt="svg"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
