"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { createOrder } from "@/helpers/order.helpers";
import { OrderDtos } from "@/types";
import Link from "next/link";
import { notify } from "@/components/Notifications";
import "react-toastify/dist/ReactToastify.css";

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((acc, product) => acc + product.price, 0);
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [idProducts, setIdProducts] = useState<OrderDtos>({ products: [] });
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  let propertiesFiltered: string[] = [];

  if (cart[0]) {
    const propertiesToExclude = ["id", "description", "stock", "categoryId"];
    propertiesFiltered = Object.keys(cart[0]).filter(
      (key) => !propertiesToExclude.includes(key),
    );
    propertiesFiltered.push("deleteProduct");
  }

  const orderProperties = ["image", "name", "price", "deleteProduct"];
  propertiesFiltered.sort(
    (a, b) => orderProperties.indexOf(a) - orderProperties.indexOf(b),
  );
  

  const renameMap: { [key: string]: string } = {
    image: "Imagen del Producto",
    name: "Nombre",
    price: "Precio",
    deleteProduct: "Eliminar Producto",
  };

  propertiesFiltered = propertiesFiltered.map(
    (prop) => renameMap[prop] || prop,
  );


  const handleRemove = (id: number) => {
    notify(
      "ToastDelete",
      "¿Deseas eliminar este producto del carrito?",
      undefined,
      undefined,
      removeFromCart,
      id,
    );
  };

  const [hasRedirected, setHasRedirected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      setError(new Error("Debes estar logueado para ver el carrito."));
      setIdProducts({ products: [] });
    } else {
      setIdProducts({ products: cart.map((product) => product.id) });
    }
  }, [cart, isLoggedIn]);

  if (error && !hasRedirected && !cart.length) {
    notify("ToastRedirect", "¡Debes tener una cuenta para ver el carrito!");
    router.push("/");
    setHasRedirected(true);
    return null;
  }

  const handleBuy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedOption) {
      notify(
        "ToastError",
        "Por favor, elija una opción de envío antes de comprar.",
      );
      return;
    }
    try {
      const response = await createOrder(idProducts);
      console.log(response);
      notify("ToastRegular", "Compra realizada");
      clearCart();
      notify("ToastOrders", "Ir a las ordenes de compra");
    } catch (error) {
      console.error("Error al realizar la compra", error);
      notify("ToastError", "Error al realizar la compra");
    }
  };


  return (
    <div className="mb-10 flex w-full flex-col text-white">
      <h1 className="m-10 w-[100%] text-2xl">Carrito de Compras</h1>
      {cart.length === 0 ? (
        <div className="flex h-[20vw] flex-col items-center justify-center gap-2">
          <p>No hay productos en el carrito.</p>
          <button className="w-min-[50px] h-12 items-center justify-center rounded-3xl border border-neutral-700 bg-neutral-900 hover:bg-[#001344] sm:w-[10vw] lg:flex">
            <Link
              href="/product"
              className="text-md text-center font-normal text-white"
            >
              ¡Ir a la tienda!
            </Link>
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row lg:justify-around">
            <div className="lg:w-50%] mb-5 lg:h-[100%]">
              <h2 className="w-[100%] lg:text-xl">Productos en el carrito:</h2>
              <div className="h-[2px] w-[100%] bg-neutral-700 lg:w-[80%]"></div>
              <ul>
                {propertiesFiltered.length > 0 && (
                  <li className="flex w-[100%] flex-col gap-1 lg:w-[80%]">
                    <div className="mb-2 mt-2 flex flex-row justify-around rounded-3xl border border-neutral-700">
                      {propertiesFiltered.map((key, index) => (
                        <p
                          key={index}
                          className="ml-3 flex h-10 w-[100px] items-center justify-center text-[10px]"
                        >
                          {key}
                        </p>
                      ))}
                    </div>
                  </li>
                )}
                {cart.map((product) => (
                  <li
                    key={product.id}
                    className="flex w-[100%] flex-col gap-1 lg:w-[80%]"
                  >
                    <div className="flex flex-row items-center justify-around rounded-3xl border border-neutral-700 text-[10px] lg:mb-2 lg:mt-2 lg:text-[15px]">
                      <div className="flex h-10 w-[100px] items-center justify-center lg:h-[80px]">
                        <Image
                          src={product.image || "/default-image-path"}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>

                      <p className="flex h-10 w-[100px] items-center justify-center">
                        {product.name}
                      </p>
                      <p className="flex h-10 w-[100px] items-center justify-center">
                        ${product.price}
                      </p>
                      <div className="flex h-10 w-[100px] items-center justify-center">
                        <button
                          className="trash"
                          onClick={() => handleRemove(product.id)}
                        >
                          <p></p>
                          <span></span>
                          <i></i>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex h-[400px] w-[100%] flex-col items-center justify-center rounded-3xl border border-neutral-700 lg:mt-4 lg:w-[50%]">
              <div>
                <h2 className="mb-2 w-[100%] lg:text-xl">
                  Elige como quieres recibir tu pedido:
                </h2>
                <div className="flex flex-col gap-2">
                  <label
                    className={`radio-button ${
                      selectedOption === "option1"
                        ? "border-white"
                        : "border-neutral-700"
                    }`}
                  >
                    <input
                      type="radio"
                      className={`form-radio h-5 w-5 appearance-none ${
                        selectedOption === "option1"
                          ? "border-white bg-[#121212] ring-0"
                          : "text-[#121212]"
                      }`}
                      value="option1"
                      name="option"
                      onChange={handleOptionChange}
                    />
                    <span className="ml-2 text-white">Andreani</span>
                  </label>
                  <label
                    className={`radio-button ${
                      selectedOption === "option2"
                        ? "border-white"
                        : "border-neutral-700"
                    }`}
                  >
                    <input
                      type="radio"
                      className={`form-radio h-5 w-5 appearance-none ${
                        selectedOption === "option2"
                          ? "border-white bg-[#121212] ring-0"
                          : "text-[#121212]"
                      }`}
                      value="option2"
                      name="option"
                      onChange={handleOptionChange}
                    />
                    <span className="ml-2 text-white">Correo Argentino</span>
                  </label>
                  <label
                    className={`radio-button ${
                      selectedOption === "option3"
                        ? "border-white"
                        : "border-neutral-700"
                    }`}
                  >
                    <input
                      type="radio"
                      className={`form-radio h-5 w-5 appearance-none ${
                        selectedOption === "option3"
                          ? "border-white bg-[#121212] ring-0"
                          : "text-[#121212]"
                      }`}
                      value="option3"
                      name="option"
                      onChange={handleOptionChange}
                    />
                    <span className="ml-2 text-white">
                      Coordinar con vendedor
                    </span>
                  </label>
                </div>
              </div>
              <div className="mb-2 mt-6 h-[1px] w-[250px] bg-neutral-700 lg:w-[305px]"></div>
              <div className="flex flex-row gap-5 lg:gap-[150px]">
                <h2 className="w-[50px] text-xl">Total: </h2>
                <h2 className="w-[80px] text-xl font-bold">
                  ${total.toFixed(2)}
                </h2>
              </div>
              <div className="mb-4 mt-2 h-[1px] w-[250px] bg-neutral-700 lg:w-[305px]"></div>
              <button
                onClick={handleBuy}
                className="mt-2 rounded-3xl border border-neutral-700 bg-[#001344] p-2"
              >
                Comprar ya
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
