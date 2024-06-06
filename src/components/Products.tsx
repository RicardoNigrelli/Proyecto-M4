"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { getProducts } from "@/helpers/product.helper";
import categoriesToPreLoad from "@/helpers/preloadCategories";
import { IProduct } from "@/types";
import Image from "next/image";
import { MdShoppingCart } from "react-icons/md";
import { notify } from "@/components/Notifications";
import "react-toastify/dist/ReactToastify.css";


const Loading = () => <div>Cargando...</div>;

function ProductsComponent() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const { isLoggedIn } = useAuth();
  const { addToCart, cart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts();
      setProducts(result);

      const category = searchParams.get("category");
      if (category) {
        const categoryIndex = parseInt(category, 10);
        if (!isNaN(categoryIndex)) {
          const filtered = result.filter(
            (product) => product.categoryId === categoryIndex,
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts(result);
        }
      } else {
        setFilteredProducts(result);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const handleAddToCart = (product: IProduct) => {
    if (isLoggedIn) {
      const isProductInCart = cart.some((item) => item.id === product.id);
      if (isProductInCart) {
        notify("ToastError", "¡El producto ya está en el carrito!");
        console.log("¡producto ya en el carrito!");
        return;
      } else {
        addToCart(product);
        notify("ToastCart", "¡Producto agregado!");
        console.log("¡producto agregado!");
      }
    } else {
      notify(
        "ToastRedirect",
        "¡Debes tener una cuenta para agregar productos al carrito!",
      );
    }
  };

  const handleFilter = (categoryIndex: number) => {
    if (categoryIndex === -1) {
      setFilteredProducts(products);
      router.replace(`/product`);
    } else {
      const newFilteredProducts = products.filter(
        (product) => product.categoryId === categoryIndex,
      );
      setFilteredProducts(newFilteredProducts);
      router.replace(`/product?category=${categoryIndex}`);
    }
  };

  return (
    <div>
      <span className="text-2xl font-normal text-white md:text-3xl lg:text-4xl">
        {(() => {
          const categoryParam = searchParams.get("category");
          const categoryIndex = categoryParam
            ? parseInt(categoryParam, 10)
            : null;
          return categoryIndex !== null &&
            !isNaN(categoryIndex) &&
            categoryIndex !== -1
            ? categoriesToPreLoad[categoryIndex].name
            : "Todos los productos";
        })()}
      </span>
      <div>
        <div className="mt-5 flex">
          <div>
            <select
              id="filter"
              className="customSelect"
              onChange={(e) => handleFilter(parseInt(e.target.value))}
            >
              <option value="-1">Todos los productos</option>
              {categoriesToPreLoad.map((category, index) => (
                <option key={index} value={index}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="mb-12 ml-[30px] mr-[30px] flex h-[350px] w-[200px] flex-col items-center justify-center gap-1 rounded-3xl border border-neutral-700 sm:ml-[30px] sm:mr-[30px] sm:h-[350px] sm:w-[200px] lg:ml-[50px] lg:mr-[50px] lg:h-[450px] lg:w-[300px] xl:ml-[50px] xl:mr-[50px] xl:h-[450px] xl:w-[300px]"
              >
                <div className="flex h-[130px] w-[150px] items-center justify-center sm:h-[135px] sm:w-[200px] lg:h-[170px] lg:w-[200px] xl:h-[170px] xl:w-[200px]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={150}
                    height={130}
                    className="object-cover"
                  />
                </div>
                <div className="flex w-full flex-col justify-around pl-4 pr-4">
                  <p className="pb-2 font-bold text-white">{product.name}</p>
                  <div className="mb-2 h-[1px] w-full bg-white text-white"></div>
                  <p
                    className="h-[35px] w-[180px] overflow-hidden text-wrap pr-1 text-[13px] text-white sm:h-[35px] sm:w-[180px] lg:h-[40px] lg:w-[280px] xl:h-[40px] xl:w-[280px]"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {product.description}
                  </p>
                  <div className="mt-2 flex w-full flex-col justify-around gap-1 text-white">
                    <p className="font-bold">${product.price}</p>

                    <p className="text-[11px]">
                      Categoría: {categoriesToPreLoad[product.categoryId].name}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="mt-2 flex h-[15px] w-[200px] justify-center sm:h-[17.5px] sm:w-[250px] lg:h-[20px] lg:w-[300px] xl:h-[20px] xl:w-[300px]">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-primary-500 flex h-[25px] w-[140px] items-center justify-center gap-1 rounded-3xl border text-white sm:h-[27.5px] sm:w-[165px] lg:h-[30px] lg:w-[190px] xl:h-[30px] xl:w-[190px]"
                    >
                      <span className="text-[9px] font-normal md:text-[10px] lg:text-[11px] xl:text-[11px]">
                        AGREGAR AL <strong>CARRITO</strong>{" "}
                      </span>

                      <div className="relative h-[15px] w-[15px] sm:h-[17.5px] sm:w-[17.5px] lg:h-[20px] lg:w-[20px] xl:h-[20px] xl:w-[20px]">
                        <Image
                          src="/cart-shopping-svgrepo-com (3).svg"
                          alt={product.name}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    </button>
                  </div>
                  <div className="mt-2 flex h-[15px] w-[200px] justify-center sm:h-[17.5px] sm:w-[250px] lg:h-[20px] lg:w-[300px] xl:h-[20px] xl:w-[300px]">
                    <button
                      onClick={() => router.push(`/product/${product.id}`)}
                      className="bg-primary-500 flex h-[25px] w-[140px] items-center justify-center gap-1 rounded-3xl border text-white sm:h-[27.5px] sm:w-[165px] lg:h-[30px] lg:w-[190px] xl:h-[30px] xl:w-[190px]"
                    >
                      <span className="text-[9px] font-normal md:text-[10px] lg:text-[11px] xl:text-[11px]">
                        VER <strong>MAS</strong>{" "}
                      </span>

                      <div className="relative h-[15px] w-[15px] sm:h-[17.5px] sm:w-[17.5px] lg:h-[20px] lg:w-[20px] xl:h-[20px] xl:w-[20px]">
                        <Image
                          src="/Vector.png"
                          alt={product.name}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <div className="h-1 bg-white"></div>
              <div className="m-16 flex flex-col">
                <h3 className="text-white">
                  Todavía no existen productos en esta categoría...{" "}
                </h3>
                <div className="flex flex-row gap-2">
                  <h3 className="text-white">
                    Mientras tanto, elige otro filtro por favor
                  </h3>
                  <MdShoppingCart size={25} color="white" />
                </div>
              </div>
              <div className="mb-10 h-1 bg-white"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Products() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsComponent />
    </Suspense>
  );
}

export default Products;
