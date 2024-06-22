"use client";
import actGetProductsByItems from "@/lib/store/cart/actGetProductsByItems";
import {
  cartItemRemove,
  cleanCartProductsFullInfo,
} from "@/lib/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { Fragment, useCallback, useEffect } from "react";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { TProduct } from "@/types/Products";
import Image from "next/image";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
export default function OrderInfo({
  onSubmit,
  handleSubmit,
}: {
  onSubmit: SubmitHandler<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs, undefined>;
}) {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );
  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );
  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());

    return () => {
      promise.abort();
      dispatch(cleanCartProductsFullInfo());
    };
  }, [dispatch]);
  const products = productsFullInfo.map((el: TProduct) => ({
    ...el,
    quantity: items[el.id!],
  }));
  return (
    <div>
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {products.map((item) => (
            <Fragment key={item.id}>
              <li className="flex items-center gap-4">
                <Image
                  width={200}
                  height={200}
                  sizes="100vw"
                  src={item.image}
                  alt={item.title}
                  className="size-16 rounded object-contain"
                />

                <div>
                  <h3 className="text-sm text-gray-900">{item.title}</h3>

                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                      <dt className="inline">quantity: </dt>
                      <dd className="inline">{item.quantity}</dd>
                    </div>
                    <div>
                      <dt className="inline">Price: </dt>
                      <dd className="inline">{item.price}</dd>
                    </div>
                  </dl>
                </div>

                <div className="flex flex-1 items-center justify-end gap-2">
                  <button
                    className="text-gray-600 transition hover:text-red-600"
                    onClick={() => removeItemHandler(item.id!)}
                  >
                    <Trash2 />
                  </button>
                </div>
              </li>
            </Fragment>
          ))}
        </ul>

        <div className="space-y-4 text-center">
          <Link
            href="/cart"
            className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
          >
            View my cart ({products.length})
          </Link>
        </div>
        <div className="space-y-4 text-center">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="inline-block rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
