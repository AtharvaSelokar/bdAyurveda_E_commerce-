import Container from "@/components/layout/Container";
import {
  Leaf,
  Flower2,
  Sprout,
  Trees,
  Apple,
  HeartPulse,
  Pill,
  FlaskConical,
} from "lucide-react";

const ingredients = [
  {
    name: "Ashwagandha",
    desc: "Supports vitality & wellness",
    icon: HeartPulse,
  },
  {
    name: "Amla",
    desc: "Rich in antioxidants",
    icon: Apple,
  },
  {
    name: "Neem",
    desc: "Traditional herbal care",
    icon: Leaf,
  },
  {
    name: "Tulsi",
    desc: "Everyday immunity support",
    icon: Flower2,
  },
  {
    name: "Giloy",
    desc: "Ayurvedic wellness herb",
    icon: Sprout,
  },
  {
    name: "Shatavari",
    desc: "Nourishing Ayurvedic herb",
    icon: Trees,
  },
  {
    name: "Bhringraj",
    desc: "Hair care ingredient",
    icon: Leaf,
  },
  {
    name: "Herbal Blend",
    desc: "Carefully selected formulation",
    icon: FlaskConical,
  },
];

export default function Ingredients() {
  return (
    <section
      id="ingredients"
      className="bg-[#F8F5EE] py-20"
    >
      <Container>

        <div className="text-center">

          <p className="text-sm uppercase tracking-[0.25em] text-[#B88A44] font-semibold">
            Natural Ingredients
          </p>

          <h2 className="mt-4 text-4xl font-semibold">
            Powered by Ayurveda
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Our formulations are inspired by traditional Ayurvedic herbs,
            selected with care for everyday wellness.
          </p>

        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {ingredients.map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.name}
                className="group rounded-[28px] border border-[#E9E1D4] bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#315243]/10 transition group-hover:bg-[#315243]">

                  <Icon
                    className="text-[#315243] group-hover:text-white"
                    size={26}
                  />

                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  {item.name}
                </h3>

                <p className="mt-2 text-gray-600">
                  {item.desc}
                </p>

              </div>
            );

          })}

        </div>

      </Container>
    </section>
  );
}