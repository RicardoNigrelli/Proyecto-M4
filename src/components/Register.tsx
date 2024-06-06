/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { registerUser } from "@/helpers/users.helpers";
import { validateUserDtos } from "@/helpers/validate";
import { UserDtos } from "@/types";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { notify } from "@/components/Notifications";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const router = useRouter();
  const [userDtos, setUserDtos] = useState<UserDtos>({
    email: "",
    password: "",
    repeatPassword: "",
    name: "",
    address: "",
    phone: "",
  });

  const [userErrors, setUserErrors] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    name: "",
    address: "",
    phone: "",
  });

  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    name: false,
    address: false,
    phone: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedUserDtos = { ...userDtos, [name]: value };
    setUserDtos(updatedUserDtos);
    const updatedUserErrors = validateUserDtos(updatedUserDtos);
    setUserErrors(updatedUserErrors);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouchedFields({ ...touchedFields, [name]: true });
  };

  const isSubmitDisabled = Object.values(userErrors).some(
    (error) => error !== "",
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await registerUser(userDtos);
      notify("ToastRegular", "Registrado correctamente... ¡Inicia sesión!");
      router.push("/login");
    } catch (error) {
      console.error("Error registering user", error);
    }

    setUserDtos({
      email: "",
      password: "",
      repeatPassword: "",
      name: "",
      address: "",
      phone: "",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="mt-10 flex h-full flex-col items-center justify-center gap-10 lg:mb-10 lg:w-1/2">
        <h1 className="text-[1.3rem] text-white lg:text-2xl xl:text-3xl">
          ¡Registrate <strong>ahora</strong>!
        </h1>
        <div className="h-[300px] w-[300px]">
          <img
            src="/pexels-sevenstormphotography-704767.jpg"
            alt="logo"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <p className="text-white">
          {" "}
          ¿Ya tienes una cuenta?{" "}
          <strong>
            <Link href="/login">Inicia Sesión</Link>{" "}
          </strong>
        </p>
      </div>

      <form action="" className="formStyles" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="marcos@mail.com"
          value={userDtos.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touchedFields.email && userErrors.email && <p>{userErrors.email}</p>}{" "}
        <label htmlFor="password">Contraseña</label>
        <input
          name="password"
          type="password"
          placeholder="********"
          value={userDtos.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touchedFields.password && userErrors.password && (
          <p>{userErrors.password}</p>
        )}
        <label htmlFor="repeatPassword">Repite tu contraseña</label>
        <input
          name="repeatPassword"
          type="password"
          placeholder="********"
          value={userDtos.repeatPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touchedFields.repeatPassword && userErrors.repeatPassword && (
          <p>{userErrors.repeatPassword}</p>
        )}
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          placeholder="Marcos"
          value={userDtos.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touchedFields.name && userErrors.name && <p>{userErrors.name}</p>}
        <label htmlFor="direccion">Address</label>
        <input
          name="address"
          type="text"
          placeholder="Evergreen 742"
          value={userDtos.address}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touchedFields.address && userErrors.address && (
          <p>{userErrors.address}</p>
        )}
        <label htmlFor="phone">Phone</label>
        <input
          name="phone"
          type="text"
          placeholder="1234567890"
          value={userDtos.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touchedFields.phone && userErrors.phone && <p>{userErrors.phone}</p>}
        <button type="submit" disabled={isSubmitDisabled}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
