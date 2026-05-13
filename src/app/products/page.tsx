import { getProducts } from "@/services/products";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#FAF8F5]">

      <div className="container-custom py-24">

        {/* Page Title */}
        <h1 className="text-5xl font-bold">
          Product Collection
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-gray-600 max-w-2xl">
          Curated corporate gifting solutions for modern businesses.
        </p>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>

    </main>
  );
}