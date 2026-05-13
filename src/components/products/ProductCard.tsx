import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group border border-black/5 bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500">

      <div className="overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-72 w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      <div className="p-6">

        <p className="text-xs uppercase tracking-widest text-gray-400">
          {product.category}
        </p>

        <h3 className="text-xl font-semibold mt-2">
          {product.name}
        </h3>

        {/* PRICE ADDED HERE */}
        {product.price_range && (
          <p className="mt-2 text-sm font-medium text-black">
            {product.price_range}
          </p>
        )}

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-5 flex justify-between items-center">
          <span className="text-xs text-gray-500">
            MOQ: {product.moq || "N/A"}
          </span>

          <button className="text-sm border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition">
            View
          </button>
        </div>

      </div>
    </div>
  );
}