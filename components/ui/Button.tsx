import Link from "next/link";

type Props={
href:string;
children:React.ReactNode;
secondary?:boolean;
};

export default function Button({
href,
children,
secondary
}:Props){

return(

<Link

href={href}

className={`inline-flex h-14 items-center justify-center rounded-full px-8 font-medium transition duration-300

${
secondary

? "border border-[var(--border)] bg-white text-[var(--primary)] hover:bg-[var(--secondary)]"

:"bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]"

}

`}
>

{children}

</Link>

);

}