import Container from "@/components/layout/Container";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul S.",
    city: "Nagpur",
    review:
      "The Hair Growth Oil feels premium and blends well into my daily routine. Great packaging and quick delivery.",
  },
  {
    name: "Priya M.",
    city: "Pune",
    review:
      "Loved the quality of the products. The ordering experience was smooth and the customer support was helpful.",
  },
  {
    name: "Amit K.",
    city: "Mumbai",
    review:
      "The products arrived on time and the packaging looked premium. Looking forward to trying more products.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="reviews"
      className="bg-[#F8F5EE] py-20 md:py-28"
    >
      <Container>

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#B88A44]">
            Testimonials
          </p>

          <h2 className="mt-4 text-4xl font-semibold">
            Loved by Our Customers
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Hear what our customers have to say about their experience with
            BD Ayurved.
          </p>

        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">

          {testimonials.map((item) => (

            <div
              key={item.name}
              className="rounded-[28px] bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="mb-6 flex">

                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="fill-[#F7B500] text-[#F7B500]"
                    size={18}
                  />
                ))}

              </div>

              <p className="leading-8 text-gray-600">
                "{item.review}"
              </p>

              <div className="mt-8">

                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.city}
                </p>

              </div>

            </div>

          ))}

        </div>

      </Container>
    </section>
  );
}