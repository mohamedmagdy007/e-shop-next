import ProductsCreate from "@/app/_components/Products/ProductsCreate";
export default async function EditProduct({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(`http://localhost:3001/products/${params.slug}`, {
    cache: "no-store",
  });
  const course = await res.json();
  return <ProductsCreate edit course={course} />;
}
