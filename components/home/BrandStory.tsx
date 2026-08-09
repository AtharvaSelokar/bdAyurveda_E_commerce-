import Image from "next/image";
import Container from "@/components/layout/Container";

export default function BrandStory() {
  return (
    <section
      id="story"
      className="bg-white py-20 md:py-28"
    >
      <Container>

        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Image */}

          <div className="relative">

            <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-[#E7EFEA] blur-3xl"></div>

            <Image
              src="/brand/story.jpg"
              alt="BD Ayurved"
              width={650}
              height={700}
              className="relative z-10 rounded-[32px] object-cover shadow-xl"
            />

          </div>

          {/* Content */}

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#B88A44]">
              Our Story
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight">
              Rooted in Ayurveda.
              <br />
              Crafted for Modern Living.
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              At BD Ayurved, we believe wellness begins with nature.
              Our products are inspired by traditional Ayurvedic knowledge
              and created using carefully selected herbal ingredients to
              support everyday health.
            </p>

            <p className="mt-6 leading-8 text-gray-600">
              Every formulation reflects our commitment to purity,
              quality, and trust, helping families embrace a healthier
              lifestyle with confidence.
            </p>

            <button className="mt-10 rounded-full bg-[#315243] px-8 py-4 text-white transition hover:bg-[#274337]">
              Learn More
            </button>

          </div>

        </div>

      </Container>
    </section>
  );
}