import { notify } from "@/components/Notifications";
import { AllOrders, IOrder, OrderDtos } from "@/types";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export async function createOrder(order: OrderDtos): Promise<IOrder> {
  const token = localStorage.getItem("token");
    
  try {
    const response = await fetch(`${apiUrl}/orders`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      return response.json();
    } else {
      notify("ToastError", "¡Fallo al enviar la orden de compra!");

      throw new Error(`${response.status}`);
    }
  } catch (error) {
    console.error("Error enviando la orden", error);
    throw error;
  }
}

export async function getOrders(): Promise<AllOrders[]> {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${apiUrl}/users/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
    });

    console.log(response);

    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    console.error("Error trayendo las ordenes", error);
    throw error;
  }
}
