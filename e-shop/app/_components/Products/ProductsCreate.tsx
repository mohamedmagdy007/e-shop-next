"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as yup from "yup";
import React, { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TProduct } from "@/types/Products";

const schema = yup.object().shape({
  title: yup.string().min(3).required(),
  max: yup.number().typeError("duration must be a number").min(1).required(),
  price: yup.number().typeError("price must be a number").min(1).required(),
  image: yup.string().required("An image file is required"),
  description: yup.string().min(10).required(),
});
export default function ProductsCreate({
  edit,
  course,
}: {
  edit?: boolean;
  course?: TProduct;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TProduct>({
    defaultValues: course || {
      title: "",
      max: undefined,
      price: undefined,
      image: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList: File = e.currentTarget?.files![0];
    if (fileList) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setValue("image", fileReader.result);
        }
      };
      fileReader.readAsDataURL(fileList);
    }
  };

  const onSubmit: SubmitHandler<TProduct> = async (data) => {
    if (!edit) {
      try {
        const response = await fetch("http://localhost:3001/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw await response.json();
        }
        router.prefetch("/");
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(
          `http://localhost:3001/products/${course?.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw await response.json();
        }
        router.prefetch("/");
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/products/${course?.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw await response.json();
      }
      router.prefetch("/");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1">
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <h1 className="mb-4 font-bold text-lg">
              {edit ? "Edit Product" : "Create Product"}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid  grid-cols-1 sm:grid-cols-2 gap-1.5">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="title">Name</Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Name"
                    {...register("title")}
                  />
                  {errors.title && (
                    <span className="text-red-800 text-sm">
                      {errors.title?.message}
                    </span>
                  )}
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="quantity"> quantity</Label>
                  <Input
                    type="text"
                    id="quantity"
                    placeholder="quantity"
                    {...register("max")}
                  />
                  {errors.quantity && (
                    <span className="text-red-800 text-sm">
                      {errors.quantity?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid  grid-cols-1 sm:grid-cols-2 gap-1.5">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="price">price</Label>
                  <Input
                    type="text"
                    id="price"
                    placeholder="Price"
                    {...register("price")}
                  />
                  {errors.price && (
                    <span className="text-red-800 text-sm">
                      {errors.price?.message}
                    </span>
                  )}
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="image">Image</Label>
                  <Input id="image" type="file" onChange={handleImage} />
                  {errors.image && (
                    <span className="text-red-800 text-sm">
                      {errors?.image?.message?.toString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid  grid-cols-1 gap-1.5">
                <Label htmlFor="description">description</Label>
                <Textarea
                  placeholder="description"
                  id="description"
                  {...register("description")}
                />
                {errors.description && (
                  <span className="text-red-800 text-sm">
                    {errors.description?.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="inline-block rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
              >
                {edit ? "Edit" : "Create"}
              </button>
              {edit && (
                <button
                  type="button"
                  className="inline-block ml-3 rounded-lg bg-red-900 px-5 py-3 text-sm font-medium text-white"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
