"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
            Premium Corporate Gifting
          </p>

          <h1 className="mt-6 text-6xl md:text-8xl leading-tight max-w-5xl">
            Curated Gifting
            Experiences For
            Modern Businesses
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-gray-600 leading-relaxed">
            Elevate employee, client, and executive relationships
            through thoughtfully curated premium gifting solutions.
          </p>

          <div className="mt-10 flex gap-5">
            <button className="bg-black text-white px-8 py-4 rounded-full">
              Explore Collection
            </button>

            <button className="border border-black px-8 py-4 rounded-full">
              Request Quote
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}