import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { products } from "@/data/products";

const featuredProducts = products.filter(
  (product) => product.featured
);

export default function ProductCollection() {
  return (
    <section
      id="products"
      className="bg-[#F8F5EE] py-12 md:py-20"
    >
      <Container>

        {/* Heading */}

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#B88A44]">
            OUR COLLECTION
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#1F3527] md:text-5xl">
            Premium Ayurvedic Products
          </h2>

          <p className="mt-4 text-[15px] leading-7 text-gray-600">
            Authentic Ayurvedic formulations crafted using carefully selected
            herbs.
          </p>

        </div>

        {/* Products */}

        <div className="mt-10 grid md:grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {featuredProducts.map((product) => (

            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[32px] border border-[#E8E2D8] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* Image */}

              <div className="bg-[#F7F4ED] p-7">

                <Image
                  src={product.cover}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="mx-auto h-[300px] md:h-[260px] w-auto object-contain transition duration-500 group-hover:scale-105 md:h-[260px]"
                />

              </div>

              {/* Content */}

              <div className="flex flex-1 flex-col p-7">

                <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#B88A44]">
                  {product.category}
                </span>

                <h3 className="mt-2 min-h-[52px] text-[24px] md:text-[22px] font-semibold leading-6 text-[#1F3527] md:text-[22px]">
                  {product.name}
                </h3>

                <div className="mt-2 text-[#F7B500]">
                  ★★★★★
                </div>

                <div className="mt-3 space-y-2">

                  {product.benefits.slice(0, 2).map((item) => (

                    <p
                      key={item}
                      className="text-sm text-gray-600"
                    >
                      ✓ {item}
                    </p>

                  ))}

                </div>

                <div className="mt-auto">

                  <p className="mt-5 text-2xl font-bold text-[#315243]">
                    ₹{product.price}
                  </p>

                  <div className="mt-5 flex h-14 items-center justify-center rounded-full bg-[#315243] text-sm font-semibold text-white transition group-hover:bg-[#274337]">
                    View Product
                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

        {/* View All Products */}

        <div className="mt-12 flex justify-center">

          <Link
            href="/products"
            className="rounded-full border border-[#315243] px-8 py-3 font-semibold text-[#315243] transition hover:bg-[#315243] hover:text-white"
          >
            View All Products
          </Link>

        </div>

      </Container>
    </section>
  );
}