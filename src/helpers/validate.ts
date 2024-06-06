import { UserDtos, UserLoginDtos } from "@/types";

export function validateUserDtos(datos: UserDtos) {
  let errors: UserDtos = {
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    repeatPassword: "",
  };

  if (
    !datos.name ||
    typeof datos.name !== "string" ||
    datos.name.trim() === ""
  ) {
    errors.name = "El nombre es requerido";
  }

  if (!datos.email || typeof datos.email !== "string") {
    errors.email =
      "El email es requerido";
  }

  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(datos.email)) {
    errors.email =
      "El email debe ser una cadena válida de correo electrónico";}

  if (
    !datos.address ||
    typeof datos.address !== "string" ||
    datos.address.trim() === ""
  ) {
    errors.address = "La dirección es requerida";
  }

  if (
    !datos.phone ||
    typeof datos.phone !== "string" ||
    datos.phone.trim() === ""
  ) {
    errors.phone = "El número de teléfono es requerido";
  }

  if (
    !datos.password ||
    typeof datos.password !== "string" ||
    datos.password.trim() === ""
  ) {
    errors.password = "La contraseña es requerida";
  }

  if (
    !datos.repeatPassword ||
    typeof datos.repeatPassword !== "string" ||
    datos.repeatPassword.trim() === ""
  ) {
    errors.repeatPassword = "Repetir la contraseña es requerido";
  }

  if (
    datos.password &&
    datos.repeatPassword &&
    datos.password !== datos.repeatPassword
  ) {
    errors.repeatPassword = "Las contraseñas no coinciden";
  }

  return errors;
}


export function validateUserLoginDtos(datos: UserLoginDtos) {
  let errors: UserLoginDtos = {
    email: "",
    password: "",
  };


  if (!datos.email || typeof datos.email !== "string") {
    errors.email = "El email es requerido";
  }

  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(datos.email)) {
    errors.email = "El email debe ser una cadena válida de correo electrónico";
  }

  if (
    !datos.password ||
    typeof datos.password !== "string" ||
    datos.password.trim() === ""
  ) {
    errors.password = "La contraseña es requerida";
  }

  return errors;
}
