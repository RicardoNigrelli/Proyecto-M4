import { notify } from "@/components/Notifications";
import { UserDtos, UserLoginDtos } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(user: UserDtos) {
  try {
    const response = await fetch(`${apiUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      return response.json();
    }
    else {
      notify ("ToastError", "¡Fallo al registrar!");
      
      throw new Error(`Registration failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error registering user", error);
    throw error;
  }
}

export async function loginUser(user: UserLoginDtos) {
    try {
        const response = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        });
    
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Login failed with status: ${response.status}`);
    }
    } catch (error) {
        console.error("Error logging in user", error);
        throw error;
    }
}