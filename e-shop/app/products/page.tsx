"use client";
import React, { useEffect, useRef, useState } from "react";
import { TProduct } from "@/types/Products";
import ProductItem from "../_components/Products/ProductItem";
export default function Products() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const refSearch = useRef<HTMLInputElement>(null);
  async function fetchData(search?: string) {
    const res = await fetch(
      search
        ? `http://localhost:3001/products?title=${search || ""}`
        : `http://localhost:3001/products`
    );
    const repo = await res.json();
    setProducts(repo);
  }
  const hendleSearch = async () => {
    const search = refSearch?.current?.value;
    fetchData(search);
  };
  const resetSearch = () => {
    if (refSearch.current) {
      refSearch.current.value = "";
    }
    fetchData("");
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="max-w-screen-xl mx-auto  ">
        <div className="my-4 flex gap-4 items-center">
          <input
            className="rounded-lg border border-gray-200 p-2 w-[200px] text-sm shadow-sm"
            placeholder="Search"
            ref={refSearch}
          />
          <button
            className="inline-block rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
            onClick={hendleSearch}
          >
            Search
          </button>
          <button
            className="inline-block rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-white"
            onClick={resetSearch}
          >
            reset
          </button>
        </div>
        {products.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {products.map((item: TProduct, index: number) => (
              <ProductItem key={index} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-red-900 text-3xl">
            there are no products
          </p>
        )}
      </div>
    </>
  );
}
