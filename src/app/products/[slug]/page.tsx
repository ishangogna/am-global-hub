import { supabase } from "@/lib/supabase";

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!data) return <div>Product not found</div>;

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <div className="container-custom py-24 grid md:grid-cols-2 gap-16">

        <img
          src={data.image_url}
          className="w-full rounded-2xl"
        />

        <div>
          <h1 className="text-4xl font-bold">
            {data.name}
          </h1>

          <p className="mt-4 text-gray-600">
            {data.description}
          </p>

          <div className="mt-6 text-sm text-gray-500">
            Category: {data.category}
          </div>

          <div className="mt-10">
            <button className="bg-black text-white px-6 py-3 rounded-full">
              Request Quote
            </button>
          </div>

        </div>

      </div>
    </main>
  );
}