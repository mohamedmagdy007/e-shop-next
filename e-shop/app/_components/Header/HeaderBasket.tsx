"use client";
import { getCartTotalQuantitySelector } from "@/lib/store/cart/selectors";
import { useAppSelector } from "@/lib/store/hooks";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function HeaderBasket() {
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);

  return (
    <Link href={"/cart"} className="hidden px-5 py-2 text-sm sm:flex">
      <div className="flex items-center ">
        <div className="relative">
          <ShoppingCart className="w-6" />
          {totalQuantity > 0 && (
            <div
              className={`w-5 h-5 rounded-full flex justify-center items-center absolute top-[-16px] right-[-5px] bg-primary`}
            >
              {totalQuantity}
            </div>
          )}
        </div>
        <h3>Cart</h3>
      </div>
    </Link>
  );
}
