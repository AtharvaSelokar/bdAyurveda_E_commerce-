type Props = {
  children: React.ReactNode;
  color?: "green" | "gold";
};

export default function Badge({
  children,
  color = "green",
}: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold tracking-wide uppercase
      ${
        color === "green"
          ? "bg-[#EAF2EC] text-[#315243]"
          : "bg-[#F6E9CF] text-[#B88A44]"
      }`}
    >
      {children}
    </span>
  );
}