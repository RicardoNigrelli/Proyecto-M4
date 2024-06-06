/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { getOrders } from "@/helpers/order.helpers";
import { AllOrders, IUser } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { notify } from "@/components/Notifications";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [user, setUser] = useState<IUser[]>([]);
  const [ordersGetted, setOrders] = useState<AllOrders[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const userFromLocalStorage =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user") || "[]")
        : [];
    setUser(userFromLocalStorage);
  }, []);

  let username = "";
  let firstletter = "";

  if (user[0]) {
    username = user[0].name;
    firstletter = username.charAt(0).toUpperCase();
  }

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [error, setError] = useState<Error | null>(null);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    async function gettingOrders() {
      try {
        const ordersGetted = await getOrders();
        console.log(ordersGetted);
        setOrders(ordersGetted);
      } catch (error) {
        setError(error as Error);
        setOrders([]);
      }
    }
    gettingOrders();
  }, []);

  if (error && !hasRedirected && ordersGetted.length === 0) {
    notify(
      "ToastError",
      "Debes estar logueado para ver los detalles de usuario. Serás redirigido a la página de inicio de sesión.",
    );
    router.push("/login");
    setHasRedirected(true);
    return null;
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="text-white">
      {user.map((user, index) => (
        <div key={index} className="flex flex-col lg:flex-row">
          <div className="mb-5 flex w-[100%] flex-col items-center justify-center gap-2 rounded-3xl border border-neutral-700 p-4 lg:mt-5 lg:h-[400px] lg:w-[50%]">
            <div className="button-gradient flex h-12 w-12 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-[30px] lg:h-[100px] lg:w-[100px]">
              <div>{firstletter}</div>
            </div>
            <div>
              <strong>Nombre:</strong> {user.name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Dirección:</strong> {user.address}
            </div>
            <div>
              <strong>Teléfono de Contacto:</strong> {user.phone}
            </div>
          </div>
          <div className="mb-3 w-[100%] p-5 lg:ml-8 lg:w-[100%] flex flex-col-reverse">
            {ordersGetted.map((order, index) => (
              <div
                key={index}
                className="mb-3 w-[100%] rounded-3xl border border-neutral-700 p-5 lg:ml-8 lg:w-[100%]"
              >
                <div className="flex flex-row items-center justify-around">
                  <div>
                    <div className="flex items-center gap-2">
                      <div>Estado:</div>
                      <div
                        className={`${
                          order.status === "pending"
                            ? "bg-red-500"
                            : order.status === "processing"
                              ? "bg-yellow-500"
                              : order.status === "approved"
                                ? "bg-green-500"
                                : "bg-gray-500"
                        } flex h-5 w-5 items-center justify-center rounded-full text-white`}
                      ></div>
                    </div>
                    <div className="flex items-center">
                      <strong>Orden de Compra</strong> - Fecha:{" "}
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle(index)}
                    className={`flex h-[50px] w-[50px] items-center justify-center rounded-full border border-neutral-700 transition-transform ${
                      openIndex === index ? "rotate-0" : "-rotate-180"
                    }`}
                  >
                    <img
                      src="/arrow-up-340-svgrepo-com.svg"
                      alt="Arrow Up"
                      className="h-[35px] w-[35px]"
                    />
                  </button>
                </div>
                {openIndex === index && (
                  <>
                    <div className="flex items-center justify-center">
                      <div className="my-4 h-[1px] w-[500px] rounded-3xl bg-neutral-700"></div>
                    </div>
                    {order.products.map((product, idProduct) => (
                      <div
                        key={idProduct}
                        className="m-3 flex flex-row rounded-3xl border border-neutral-700 p-5"
                      >
                        <div className="flex w-[200px] items-center">
                          <div className="text-[15px]">
                            <strong>${product.price}</strong>
                          </div>
                          <div className="flex items-center justify-center">
                            <Image
                              src={product.image || "/default-image-path"}
                              alt={product.name}
                              width={100}
                              height={100}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="w-[400px]">
                          <div>
                            <strong>{product.name}</strong>
                          </div>
                          <div className="text-[10px]">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex flex-col">
                      <div>
                        <strong> Total:</strong> $
                        {order.products.reduce(
                          (acc, item) => acc + item.price,
                          0,
                        )}
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="my-4 h-[1px] w-[500px] rounded-3xl bg-neutral-700"></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
