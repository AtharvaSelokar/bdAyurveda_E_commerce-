type Props={

children:React.ReactNode;

className?:string;

};

export default function Card({

children,

className=""

}:Props){

return(

<div

className={`rounded-[28px] border border-[var(--border)] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}

>

{children}

</div>

);

}