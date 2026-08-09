import Badge from "./Badge";

type Props = {
  badge: string;
  title: string;
  subtitle: string;
  center?: boolean;
};

export default function SectionHeading({
  badge,
  title,
  subtitle,
  center = true,
}: Props) {
  return (
    <div
      className={`max-w-3xl ${
        center ? "mx-auto text-center" : ""
      }`}
    >
      <Badge color="gold">{badge}</Badge>

      <h2 className="mt-6 text-4xl md:text-5xl font-semibold">
        {title}
      </h2>

      <p className="mt-5 leading-8 text-gray-600">
        {subtitle}
      </p>
    </div>
  );
}