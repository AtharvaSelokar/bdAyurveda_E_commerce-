import Container from "@/components/layout/Container";
import { Leaf, ShieldCheck, Truck, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Ayurvedic",
    description:
      "Made with carefully selected herbs inspired by traditional Ayurvedic knowledge.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description:
      "Every product is manufactured with strict quality standards for purity and consistency.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Reliable shipping across India with secure packaging and order tracking.",
  },
  {
    icon: HeartHandshake,
    title: "Trusted Support",
    description:
      "Our team is here to help you choose the right products and answer your questions.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-20">
      <Container>

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#B88A44]">
            Why Choose Us
          </p>

          <h2 className="mt-4 text-4xl font-semibold">
            The BD Ayurved Difference
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            We combine traditional Ayurvedic wisdom with modern manufacturing
            practices to deliver premium wellness products you can trust.
          </p>

        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {features.map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-[28px] border border-[#ECE6DB] bg-[#FDFBF8] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#315243]/10 transition group-hover:bg-[#315243]">

                  <Icon
                    className="text-[#315243] group-hover:text-white"
                    size={30}
                  />

                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {item.description}
                </p>

              </div>
            );

          })}

        </div>

      </Container>
    </section>
  );
}