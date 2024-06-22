"use client";
import { authLogout } from "@/lib/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import React from "react";
import HeaderBasket from "./HeaderBasket";
import HeaderWishList from "./HeaderWishList";

export default function HeaderAuth() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  return (
    <>
      {user ? <HeaderBasket /> : null}
      {user ? <HeaderWishList /> : null}
      {user?.role === "admin" && (
        <Link
          className="hidden rounded-md  bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary sm:block"
          href="/products/create"
        >
          Add Product
        </Link>
      )}
      {user ? (
        <Link
          href="/"
          className="text-primary  px-5 py-2"
          onClick={() => dispatch(authLogout())}
        >
          Logout
        </Link>
      ) : (
        <>
          <Link
            className="hidden rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 sm:block"
            href="/login"
          >
            Login
          </Link>

          <Link
            className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
            href="/signup"
          >
            Register
          </Link>
        </>
      )}
    </>
  );
}
