import React from "react";

import Dropdown from "../Dropdown";
import Image from "next/image";
import ButtonAddCart from "../ButtonAddCart";
import { TProduct } from "@/types/Products";
import WishHeart from "./WishHeart";

export default function ProductItem({ item }: { item: TProduct }) {
  return (
    <div className="border rounded border-primary relative">
      <Dropdown id={item.id!} />
      <WishHeart id={item.id!} />
      <Image
        src={item.image}
        alt={item.title}
        width={200}
        height={200}
        sizes="100vw"
        className="w-full h-96 rounded object-contain"
        key={item.id}
      />
      <div className="p-2">
        <p>{item.title}</p>
        <div className="flex justify-between items-center">
          <p>{item.price} EGP</p>
          <ButtonAddCart id={item.id!} max={item.max} />
        </div>
      </div>
    </div>
  );
}
