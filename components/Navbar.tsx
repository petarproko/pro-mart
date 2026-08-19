"use client";

import Link from "next/link";
import { useState } from "react";

type NavbarProps = {
  cartItemsCount?: number;
};

export default function Navbar({
  cartItemsCount = 0,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Sports",
    "Accessories",
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#264653] shadow-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="2" y="2" width="36" height="36" rx="10" fill="#E9C46A" />
            <path
              d="M12 12H22C25 12 28 15 28 18C28 21 25 24 22 24H17V29H12V12Z"
              fill="#003049"
            />
            <path
              d="M17 16V20H21.5C22.6 20 23.5 19.1 23.5 18C23.5 16.9 22.6 16 21.5 16H17Z"
              fill="#E9C46A"
            />
          </svg>

          <span className="text-2xl font-bold text-like-blue-main">
            Pro Mart
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          {/* Categories Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => setCategoriesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCategoriesOpen((open) => !open)}
              className="flex items-center gap-1 font-medium text-like-black transition hover:text-like-yellow"
            >
              Categories

              <svg
                className={`transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""
                  }`}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9L12 15L18 9" />
              </svg>
            </button>

            {categoriesOpen && (
              <div className="absolute left-0 top-full z-50 pt-3">
                <div className="w-56 overflow-hidden rounded-xl border border-black/10 bg-like-black shadow-xl">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/categories/${category
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      onClick={() => setCategoriesOpen(false)}
                      className="block px-4 py-3 text-like-red transition-colors hover:bg-like-red hover:text-like-black"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/new-arrivals"
            className="font-medium text-like-black transition hover:text-like-yellow"
          >
            New Arrivals
          </Link>

          <Link
            href="/deals"
            className="font-medium text-like-black transition hover:text-like-red"
          >
            Deals
          </Link>

          <Link
            href="/about"
            className="font-medium text-like-black transition hover:text-like-yellow"
          >
            About
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link
            href="/cart"
            className="relative rounded-lg p-2 text-white transition hover:bg-white/10"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="9" cy="20" r="1" />
              <circle cx="19" cy="20" r="1" />
              <path d="M3 4H5L7.5 15.5C7.7 16.4 8.5 17 9.4 17H18.4C19.3 17 20.1 16.4 20.3 15.5L22 8H6" />
            </svg>

            {cartItemsCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-like-red px-1 text-[10px] font-bold text-white">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* Profile */}
          <Link
            href="/profile"
            className="rounded-lg p-2 text-white transition hover:bg-white/10"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21C5 17 8 14 12 14C16 14 19 17 20 21" />
            </svg>
          </Link>

          {/* Login */}
          <Link
            href="/login"
            className={`hidden items-center 
              gap-2 rounded-lg bg-like-yellow px-4 
              py-2 font-semibold text-like-blue-main transition
               hover:bg-like-yellow active:bg-like-orange sm:flex`
            }
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 3H6C5 3 4 4 4 5V19C4 20 5 21 6 21H15" />
              <path d="M11 12H21" />
              <path d="M18 9L21 12L18 15" />
            </svg>

            Login
          </Link>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-white hover:bg-white/10 md:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileMenuOpen ? (
                <>
                  <path d="M6 6L18 18" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 6H20" />
                  <path d="M4 12H20" />
                  <path d="M4 18H20" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-like-blue-main md:hidden">
          <div className="flex flex-col p-4">
            <Link href="/products" className="py-3 text-white">
              Products
            </Link>

            <div className="py-3">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex w-full items-center justify-between text-white"
              >
                Categories

                <svg
                  className={`transition-transform ${categoriesOpen ? "rotate-180" : ""
                    }`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9L12 15L18 9" />
                </svg>
              </button>

              {categoriesOpen && (
                <div className="mt-2 ml-4 flex flex-col">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/categories/${category.toLowerCase().replace(/\s+/g, "-")}`}
                      className="py-2 text-white/80 hover:text-like-yellow"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/new-arrivals" className="py-3 text-white">
              New Arrivals
            </Link>

            <Link href="/deals" className="py-3 text-like-red">
              Deals
            </Link>

            <Link href="/about" className="py-3 text-white">
              About
            </Link>

            <Link
              href="/login"
              className="mt-4 rounded-lg bg-like-red py-3 text-center font-semibold text-like-blue-main"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}