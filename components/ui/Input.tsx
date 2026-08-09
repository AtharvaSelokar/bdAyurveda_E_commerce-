type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: Props) {
  return (
    <input
      {...props}
      className="h-14 w-full rounded-2xl border border-[#E8DED0] bg-white px-5 outline-none transition focus:border-[#315243]"
    />
  );
}