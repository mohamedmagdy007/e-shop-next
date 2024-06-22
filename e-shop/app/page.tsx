import Hero from "@/app/_components/Hero";
import Products from "./_components/Products/Product";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="max-w-screen-xl mx-auto flex justify-between">
        <h2 className="my-4 font-bold text-2xl">Products</h2>
        <Link
          href={"/products"}
          className="my-4 font-bold text-xl text-teal-700 hover:text-teal-400"
        >
          See More
        </Link>
      </div>
      <Products />
    </main>
  );
}
