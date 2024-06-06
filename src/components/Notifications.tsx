import { toast } from "react-toastify";
import React from "react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { IoMdCart } from "react-icons/io";



interface ToastWithButtonsProps {
  message: string;
  onAccept: () => void;
  onCancel: () => void;
}

const ToastRegular: React.FC<ToastWithButtonsProps> = ({
  message,
}) => (
  <div className="flex flex-col items-center justify-center gap-2">
    {message}
  </div>
);

const ToastError: React.FC<ToastWithButtonsProps> = ({ message }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    {message}
  </div>
); 


const ToastRedirect: React.FC<ToastWithButtonsProps> = ({
  message,
  onAccept,
  onCancel,
}) => (
  <div className="flex flex-col items-center justify-center text-center gap-4">
    {message}
    <br />
    <div className="flex flex-row gap-4">
      <Link href="/login">
      <button
        className="rounded-3xl border border-neutral-700 p-2 text-sm"
        onClick={onAccept}>
        ¡Inicia Sesión!
      </button>
      </Link>

      <Link href="/register">
      <button
        className="rounded-3xl border border-neutral-700 p-2 text-sm"
        onClick={onCancel}
      >
        ¡Registrate!
      </button>
      </Link>
    </div>
  </div>
);

const ToastCart: React.FC<ToastWithButtonsProps> = ({
  message,
  onAccept,
  onCancel,
  
}) => (
  <div className="flex flex-col items-center justify-center gap-4 text-center">
    <strong>{message}</strong>
    <div className="flex flex-row gap-4">
      <Link href="/cart">
        <button
          className="flex flex-row items-center justify-center gap-3 rounded-3xl border border-neutral-700 p-2 text-sm"
          onClick={onAccept}
        >
          ¡Ir al Carrito!
          <FiShoppingCart size={20} />
        </button>
      </Link>
    </div>
  </div>
);

const ToastOrders: React.FC<ToastWithButtonsProps> = ({
  message,
  onAccept,
  onCancel,
}) => (
  <div className="flex flex-col items-center justify-center gap-4 text-center">
    <div className="flex flex-row gap-4">
      <Link href="/dashboard">
        <button
          className="flex flex-row items-center justify-center gap-3 rounded-3xl border border-neutral-700 p-2 text-sm"
          onClick={onAccept}
          >
          
          <strong>{message}</strong>
          <IoMdCart size={20} />
        </button>
      </Link>
    </div>
  </div>
);



const ToastDelete: React.FC<ToastWithButtonsProps> = ({
  message,
  onAccept,
  onCancel,
}) => (
  <div className="flex flex-col items-center justify-center gap-4 text-center">
    {message}
    <br />
    <div className="flex flex-row gap-4">
      <button
        className="flex h-12 w-28 items-center justify-center rounded-3xl border border-neutral-700 p-4 text-sm"
        onClick={onAccept}
      >
        Si
      </button>

      <button
        className="items-center w-28 flex h-12 justify-center rounded-3xl border border-neutral-700 p-4 text-sm"
        onClick={onCancel}
      >
        No
      </button>
    </div>
  </div>
);


export const notify = (
  type:
    | "ToastError"
    | "ToastRegular"
    | "ToastRedirect"
    | "ToastCart"
    | "ToastDelete"
    | "ToastOrders",
  message: string,
  onAccept?: () => void,
  onCancel?: () => void,
  removeFromCart?: (id: any) => void,
  id?: any,
) => {
  switch (type) {
    case "ToastError":
      toast(
        <ToastError
          message={message}
          onAccept={() => toast.dismiss()}
          onCancel={() => toast.dismiss()}
        />,
        {
          position: "bottom-right",
          className: "custom-toast",
          style: {
            backgroundColor: "#171717",
            color: "#FFFFFF",
            fontSize: "15px",
            width: "300px",
            border: "1px solid #343434",
          },
          autoClose: 4000,
        },
      );
      break;

    case "ToastRegular":
      toast(
        <ToastRegular
          message={message}
          onAccept={() => toast.dismiss()}
          onCancel={() => toast.dismiss()}
        />,
        {
          position: "bottom-right",
          style: {
            backgroundColor: "#171717",
            color: "#FFFFFF",
            fontSize: "15px",
            width: "300px",
            border: "1px solid #343434",
          },
          autoClose: 4000,
        },
      );
      break;
    case "ToastRedirect":
      toast(
        <ToastRedirect
          message={message}
          onAccept={() => toast.dismiss()}
          onCancel={() => toast.dismiss()}
        />,
        {
          position: "bottom-right",
          style: {
            backgroundColor: "#171717",
            color: "#FFFFFF",
            fontSize: "15px",
            width: "300px",
            border: "1px solid #343434",
          },
          autoClose: 10000,
        },
      );
      break;
    case "ToastCart":
      toast(
        <ToastCart
          message={message}
          onAccept={() => toast.dismiss()}
          onCancel={() => toast.dismiss()}
        />,
        {
          position: "bottom-right",
          style: {
            backgroundColor: "#171717",
            color: "#FFFFFF",
            fontSize: "15px",
            width: "300px",
            border: "1px solid #343434",
          },
          autoClose: 10000,
        },
      );
      break;
    case "ToastOrders":
      toast(
        <ToastOrders
          message={message}
          onAccept={() => toast.dismiss()}
          onCancel={() => toast.dismiss()}
        />,
        {
          position: "bottom-right",
          style: {
            backgroundColor: "#171717",
            color: "#FFFFFF",
            fontSize: "15px",
            width: "300px",
            border: "1px solid #343434",
          },
          autoClose: 10000,
        },
      );
      break;
    case "ToastDelete":
      toast(
        <ToastDelete
          message={message}
          onAccept={() => {
            if (removeFromCart && id) {
              removeFromCart(id);
              toast.dismiss();
            }
          }}
          onCancel={() => toast.dismiss()}
        />,
        {
          position: "bottom-right",
          style: {
            backgroundColor: "#171717",
            color: "#FFFFFF",
            fontSize: "15px",
            width: "300px",
            border: "1px solid #343434",
          },
          autoClose: 4000,
        },
      );
      break;

    default:
      toast(message, {
        position: "top-center",
        style: {
          backgroundColor: "#9E9E9E",
          color: "#FFFFFF",
          fontSize: "20px",
          width: "300px",
        },
      });
  }
};
