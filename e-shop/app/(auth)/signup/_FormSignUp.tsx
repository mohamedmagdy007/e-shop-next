"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import actAuthRegister from "@/lib/store/auth/actAuthRegister";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(32).required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
});
export default function Form() {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    dispatch(actAuthRegister(data))
      .unwrap()
      .then(() => {
        router.push("/");
      });
  };
  return (
    <form
      className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label htmlFor="username" className="sr-only">
          username
        </label>
        <div className="relative">
          <input
            type="text"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter username"
            {...register("username", { required: true })}
          />
        </div>
        {errors.username && (
          <span className="text-red-800  text-sm">
            {errors.username?.message}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>

        <div className="relative">
          <input
            type="email"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter email"
            {...register("email", { required: true })}
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
        {errors.email && (
          <span className="text-red-800 text-sm">{errors.email?.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>

        <div className="relative">
          <input
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter password"
            {...register("password", { required: true })}
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
        {errors.password && (
          <span className="text-red-800  text-sm">
            {errors.password?.message}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="confirmPassword" className="sr-only">
          Confirm Password
        </label>

        <div className="relative">
          <input
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter confirm Password"
            {...register("confirmPassword", { required: true })}
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
        {errors.confirmPassword && (
          <span className="text-red-800  text-sm">
            {errors.confirmPassword?.message}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Already have an account?
          <Link className="underline" href="/">
            Login
          </Link>
        </p>

        <button
          type="submit"
          className="inline-block rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
          disabled={loading === "pending"}
        >
          {loading === "pending" ? (
            <span className="flex items-center">
              <LoaderCircle className="animate-spin  mr-1" /> loading
            </span>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
      {error && (
        <div className="bg-red-900 text-gray-100 rounded-md p-4">{error}</div>
      )}
    </form>
  );
}
