/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client";
import { notify } from "@/components/Notifications";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "@/helpers/users.helpers";
import { validateUserLoginDtos } from "@/helpers/validate";
import { UserFilterDto, UserLoginDtos, UserLoginTouchedDtos } from "@/types";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";


function Login() {
  const [userDtos, setUserDtos] = useState<UserLoginDtos>({
    email: "",
    password: "",
  });

  const [userErrors, setUserErrors] = useState<UserLoginDtos>({
    email: "",
    password: "",
  });

  const [touchedFields, setTouchedFields] = useState<UserLoginTouchedDtos>({
    email: false,
    password: false,
  });

  const { login, isLoggedIn } = useAuth();

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedUserDtos = { ...userDtos, [name]: value };
    setUserDtos(updatedUserDtos);

    const updatedUserErrors = validateUserLoginDtos(updatedUserDtos);
    setUserErrors(updatedUserErrors);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouchedFields({ ...touchedFields, [name]: true });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedTouchedFields = {
      email: true,
      password: true,
    };
    setTouchedFields(updatedTouchedFields);
    const updatedUserErrors = validateUserLoginDtos(userDtos);
    setUserErrors(updatedUserErrors);
    const hasErrors = Object.values(updatedUserErrors).some(
      (error) => error !== "",
    );
    if (hasErrors) {
      return;
    }

    try {
      const response = await loginUser(userDtos);
      localStorage.setItem("token", response.token);
      const allUserDtos = response.user;
      const dtosFiltered = Object.keys(allUserDtos)
        .filter((key) => key !== "credential")
        .reduce((obj: UserFilterDto, key: string) => {
          obj[key] = allUserDtos[key];
          return obj;
        }, {});
      const userArray = [dtosFiltered];
      localStorage.setItem("user", JSON.stringify(userArray));
      login();
      notify("ToastRegular", "¡Sesión iniciada!");
      router.push("/");
      setUserDtos({
        email: "",
        password: ""
      })
    } catch (error) {
      console.error("Error logging in user", error);
      notify("ToastError", "¡Datos Incorrectos!");
      setUserDtos({
      email: userDtos.email,
      password: userDtos.password,
    });
    } 
  };

  if (isLoggedIn) {
          notify("ToastRegular", "Ya has iniciado sesión!");
          router.push("/product");
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex h-full flex-col items-center justify-center gap-10 lg:mb-10 lg:w-1/2">
            <h1 className="text-[1.3rem] text-white lg:text-2xl xl:text-3xl">
          Inicia <strong>Sesión</strong>!
        </h1>
        <div className="h-[300px] w-[300px]">
          <img
            src="/shopping-cart-commerce-graphic-symbol-icon.jpg"
            alt="logo"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <p className="text-white">
          {" "}
          ¿Aún no tienes una cuenta?{" "}
          <strong>
            {" "}
            <Link href="/register">Registrate</Link>
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
        <button>Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
