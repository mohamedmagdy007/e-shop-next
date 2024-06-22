import { TProduct } from "@/types/Products";
import React from "react";
import ProductItem from "./ProductItem";

async function getServerSideProps() {
  const res = await fetch("http://localhost:3001/products?_limit=9", {
    cache: "no-store",
    next: { tags: ["courses"] },
  });
  const repo = await res.json();
  return repo;
}
export default async function Products() {
  const products = await getServerSideProps();
  return (
    <div className="max-w-screen-xl mx-auto  ">
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
  );
}
