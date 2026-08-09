import Container from "@/components/layout/Container";
import { Leaf, ShieldCheck, Truck, BadgeCheck } from "lucide-react";

const items = [
  {
    icon: Leaf,
    title: "100% Ayurvedic",
  },
  {
    icon: ShieldCheck,
    title: "Quality Tested",
  },
  {
    icon: Truck,
    title: "Free Shipping",
  },
  {
    icon: BadgeCheck,
    title: "Made in India",
  },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-[#E8E2D8] bg-white">
      <Container>
        <div className="grid grid-cols-2 gap-5 py-6 md:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-center gap-3"
            >
              <item.icon className="h-6 w-6 text-[#2F5A46]" />
              <span className="text-sm font-medium text-[#2A2A2A]">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}