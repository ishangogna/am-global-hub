"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#FAF8F5]/80 backdrop-blur-md border-b border-black/5">
      <div className="container-custom h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-wide"
        >
          AM Global Hub
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-sm uppercase tracking-widest">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <button className="bg-black text-white px-5 py-3 rounded-full text-sm">
          Request Catalog
        </button>
      </div>
    </header>
  );
}