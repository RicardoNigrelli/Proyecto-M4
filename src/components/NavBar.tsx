/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { SearchBar } from "./SearchBar";
import NavLink from "./NavLink";
import { NavLinksBg } from "./NavLinksBg";
import { FiMenu, FiShoppingCart, FiUser } from "react-icons/fi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { login, isLoggedIn, logout } = useAuth();
  const { cart } = useCart();
  const router = useRouter();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative mx-auto flex justify-center lg:gap-12">
      <div className="relative mb-[80px] flex items-center justify-center lg:mr-10 lg:pt-[95px]">
        <div className="flex items-center justify-center lg:mr-12">
          <Link href="/">
            <img src="/logo.png" alt="Henry Store Logo" />
          </Link>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
      <div className="lg:ml-[80px] lg:flex lg:items-center lg:justify-center lg:gap-3 xl:ml-5">
        <NavLink href="/">Inicio</NavLink>
        <NavLink href="/product">Productos</NavLink>
        {!isLoggedIn && <NavLink href="/login">Inicio de Sesión</NavLink>}
        {!isLoggedIn && <NavLink href="/register">Registro</NavLink>}
        <NavLink href="/about">Sobre Nosotros</NavLink>
        <NavLink href="/faq">FAQ</NavLink>
        {isLoggedIn && (
          <NavLink href="/cart">
            <div className="relative flex">
              <FiShoppingCart size={32} />
              <div className="absolute -top-4 left-6 flex h-5 w-5 items-center justify-center rounded-full border-2 bg-[#121212]">
                {cart.length}
              </div>
            </div>
          </NavLink>
        )}
        {isLoggedIn && (
          <NavLink href="/dashboard">
            <FiUser size={32} />
          </NavLink>
        )}
        {isLoggedIn && (
          <NavLink onClick={() => logout(true)}>
            <RiLogoutBoxLine size={32} />
          </NavLink>
        )}
      </div>
      <button
        className="absolute right-0 top-3 lg:hidden"
        onClick={handleClick}
        onBlur={handleClick}
      >
        <FiMenu size={32} color="white" />
      </button>
      {isOpen && (
        <div className="absolute right-[30px] top-12 flex h-[300px] w-12 lg:hidden">
          <ul
            className="z-5 absolute flex h-[300px] flex-col"
            onMouseDown={(e) => e.preventDefault()}
          >
            <NavLinksBg href="/">Inicio </NavLinksBg>
            <NavLinksBg href="/product">Productos</NavLinksBg>
            {!isLoggedIn && (
              <NavLinksBg href="/login">Inicio de Sesión</NavLinksBg>
            )}
            {!isLoggedIn && <NavLinksBg href="/register">Registro</NavLinksBg>}
            {isLoggedIn && (
              <NavLinksBg href="/cart">
                <div className="relative flex">
                  <FiShoppingCart size={32} />
                  <div className="absolute -top-4 left-6 flex h-5 w-5 items-center justify-center rounded-full border-2 bg-[#121212]">
                    {cart.length}
                  </div>
                </div>
              </NavLinksBg>
            )}
            <NavLinksBg href="/about">Sobre Nosotros</NavLinksBg>
            <NavLinksBg href="/faq">FAQ</NavLinksBg>
            {isLoggedIn && (
              <NavLinksBg href="/dashboard">
                <FiUser size={32} />
              </NavLinksBg>
            )}
            {isLoggedIn && (
              <NavLinksBg>
                <RiLogoutBoxLine size={35} />
              </NavLinksBg>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavBar;
