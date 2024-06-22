import { CreditCard } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export default function UserInfo({
  register,
  errors,
}: {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
}) {
  return (
    <div className="p">
      <div className="mb-5">
        <h3 className="mb-3">Shipping Address</h3>
        <div className="p-4 border border-gray-400 rounded-lg grid gap-3">
          <label htmlFor="address">Address *</label>
          <input
            id="address"
            placeholder="Enter Your Address"
            className="rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            {...register("address", { required: true })}
          />
          {errors.address && (
            <span className="text-red-800 text-sm">
              {errors.address?.message}
            </span>
          )}
        </div>
      </div>
      <div className="mb-5">
        <h3 className="mb-3">Content Info</h3>
        <div className="p-4 border border-gray-400 rounded-lg grid gap-3">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            placeholder="Enter Your Email"
            className="rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-800 text-sm">
              {errors.email?.message}
            </span>
          )}
        </div>
        <div className="p-4 mt-3 border border-gray-400 rounded-lg grid gap-3">
          <label htmlFor="mobile">Mobile Number *</label>
          <input
            id="mobile"
            placeholder="Enter Your Mobile Number"
            className="rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            {...register("mobile", { required: true })}
          />
          {errors.mobile && (
            <span className="text-red-800 text-sm">
              {errors.mobile?.message}
            </span>
          )}
        </div>
      </div>
      <div className="mb-5">
        <h3 className="mb-3">Payment Method</h3>
        <div className="p-4 border border-gray-400 rounded-lg flex gap-3">
          <input
            value={"credit"}
            id="creditCard"
            type="radio"
            className="rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            {...register("payment", { required: true })}
          />
          <label htmlFor="creditCard" className="flex items-center gap-2">
            <span className="border rounded-md p-2">
              <CreditCard />
            </span>
            Credit Card
          </label>
        </div>
        <div className="p-4 mt-3 border border-gray-400 rounded-lg flex gap-3">
          <input
            type="radio"
            id="cash"
            className="rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            value={"cash"}
            {...register("payment", { required: true })}
          />
          <label htmlFor="cash" className="flex items-center gap-2">
            <span className="border rounded-md p-2">
              <Image src={"/cash.svg"} alt="logo" width={25} height={25} />
            </span>
            Cash on Delivery{" "}
          </label>
        </div>
      </div>
    </div>
  );
}
