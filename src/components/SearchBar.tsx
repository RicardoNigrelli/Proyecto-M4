/* eslint-disable @next/next/no-img-element */
"use client";

import { getProducts } from "@/helpers/product.helper";
import { IProduct } from "@/types";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

export const SearchBar: React.FC<{}> = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<IProduct[]>([]);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const resultsRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const productsGet = async (): Promise<void> => {
      if (!searchText) {
        setResults([]);
        setIsResultsVisible(false);
        return;
      }

      try {
        const products = await getProducts();
        const filteredProducts = products.filter((product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase()),
        );
        setResults(filteredProducts);
        setIsResultsVisible(true);
       
      } catch (error) {
        console.error(error);
      }
    };

    productsGet();
  }, [searchText]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchText(e.target.value);
  }

  function handleClickOutside(e: MouseEvent): void {
    if (!resultsRef.current?.contains(e.target as Node)) {
      setIsResultsVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute -left-4 top-[100%] lg:static">
      <div className="lg:relative">
        <input
          placeholder="Buscar"
          value={searchText}
          onChange={handleChange}
          className="w-45 absolute flex items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900 pl-12 text-lg text-neutral-400 placeholder-neutral-400 lg:relative"
        ></input>
        <FaSearch
          color="white"
          className="absolute left-4 z-10 translate-y-[90%] transform text-neutral-400 lg:static lg:-translate-y-[180%] lg:translate-x-[90%]"
        />
      </div>
      {isResultsVisible && (
        <div
          ref={resultsRef}
          className="absolute top-full mt-[3.3rem] w-60 lg:top-40 lg:mt-3 lg:w-52 xl:mt-8 xl:w-[200px]"
        >
          {results.length === 0 ? (
            <div className="text-[12px] rounded-3xl border border-neutral-700 bg-neutral-900 p-2 text-white">
              ¡Ups! No encontramos lo que estás buscando.
            </div>
          ) : (
            <ul>
              {results.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id}>
                  <li
                    className="relative mb-1 flex items-center rounded-3xl border border-neutral-700 bg-neutral-900 p-2 text-white hover:bg-gray-800"
                    key={product.id}
                  >
                    <img
                      className="h-8 w-8 object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                    {product.name}
                    <IoIosArrowForward className="hover: ml-1" />
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
