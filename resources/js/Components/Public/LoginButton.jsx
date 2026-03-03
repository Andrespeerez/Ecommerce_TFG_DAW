import { useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function LoginButton({ onClick }) {
    const [ isLoading, setIsLoading ] = useState(true);

    return (
        <button
        onClick={onClick}
        className="bg-neutral-50 hover:bg-neutral-300 active:bg-neutral-500 flex gap-[10px] items-center px-[10px] py-[5px] rounded-[10px] transition duration-150"
        aria-label="Abrir menú de inicio de sesión"
        >
            <figure
            className="h-[16px] w-[16px]"
            >
                {isLoading &&
                <Skeleton 
                height="16" 
                width="16" 
                />
                }

                <img 
                src="/assets/images/login.svg" 
                alt="Menu Login" 
                aria-hidden="true" 
                height="16" 
                width="16" 
                className={`${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
                />
            </figure>
            

            <span className="hidden lg:inline text-primary-900 heading-6">Login</span>
        </button>
    );
}