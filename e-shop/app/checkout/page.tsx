"use client";
import React from "react";
import UserInfo from "./_UserInfo";
import OrderInfo from "./_OrderInfo";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  payment: yup.string().required(),
  address: yup.string().required(),
  mobile: yup.string().length(11).required(),
});
export default function Checkout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { payment: "cash" },
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };
  return (
    <div className="container mt-4">
      <h2 className="mb-5">Cousres Checkout</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <UserInfo register={register} errors={errors} />
        </div>
        <div>
          <OrderInfo onSubmit={onSubmit} handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
