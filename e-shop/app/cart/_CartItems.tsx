"use client";
import actGetProductsByItems from "@/lib/store/cart/actGetProductsByItems";
import {
  cartItemChangeQuantity,
  cartItemRemove,
  cleanCartProductsFullInfo,
} from "@/lib/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { TProduct } from "@/types/Products";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useCallback, useEffect } from "react";

export default function CartItems() {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const { items, productsFullInfo } = useAppSelector((state) => state.cart);

  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());

    return () => {
      promise.abort();
      dispatch(cleanCartProductsFullInfo());
    };
  }, [dispatch]);

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );

  const products = productsFullInfo.map((el: TProduct) => ({
    ...el,
    quantity: el.id && items[el.id],
  }));
  const subtotal = products.reduce((accumulator, el) => {
    const price = el.price;
    const quantity = el.quantity;
    if (quantity && typeof quantity === "number") {
      return accumulator + +price * quantity;
    } else {
      return accumulator;
    }
  }, 0);

  return (
    <div className="mt-8">
      {products.length ? (
        <>
          <ul className="space-y-4">
            {products.map((items) => (
              <Fragment key={items.id}>
                <li className="flex items-center gap-4">
                  <Image
                    width={200}
                    height={200}
                    sizes="100vw"
                    src={items.image}
                    alt={items.title}
                    className="size-16 rounded object-contain"
                  />

                  <div>
                    <h3 className="text-sm text-gray-900">{items.title}</h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt className="inline">price:</dt>
                        <dd className="inline">{items.price}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <form>
                      <label htmlFor="Line1Qty" className="sr-only">
                        {" "}
                        Quantity{" "}
                      </label>

                      <input
                        type="number"
                        min="1"
                        onChange={(e) => {
                          if (+e.target.value <= items.max) {
                            changeQuantityHandler(items.id!, +e.target.value);
                          }
                        }}
                        value={items.quantity}
                        id="Line1Qty"
                        className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                      />
                    </form>

                    <button
                      className="text-gray-600 transition hover:text-red-600"
                      onClick={() => removeItemHandler(items.id!)}
                    >
                      <Trash2 />
                    </button>
                  </div>
                </li>
              </Fragment>
            ))}
          </ul>

          <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
            <div className="w-screen max-w-lg space-y-4">
              <dl className="space-y-0.5 text-sm text-gray-700">
                <div className="flex justify-between !text-base font-medium">
                  <dt>Total</dt>
                  <dd>{subtotal}</dd>
                </div>
              </dl>

              <div className="flex justify-end">
                <Link
                  href="/checkout"
                  className={`block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 ${
                    (user && user?.role !== "admin") ?? "pointer-events-none"
                  }`}
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-red-900 text-3xl">Your Cart is empty</p>
      )}
    </div>
  );
}
