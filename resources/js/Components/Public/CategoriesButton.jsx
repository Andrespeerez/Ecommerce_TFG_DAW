import { useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function CategoriesButton({ onClick }) {
    const [ isLoading, setIsLoading ] = useState(true);

    return (
        <button
        onClick={onClick}
        className="bg-neutral-50 hover:bg-neutral-300 active:bg-neutral-500 flex gap-[10px] items-center px-[10px] py-[5px] rounded-[10px] transition duration-150"
        aria-label="Abrir menú de categorías"
        >
            <figure
            className="h-[24px] w-[24px]"
            >
                {isLoading &&
                <Skeleton 
                height="24" 
                width="24" 
                />
                }

                <img 
                src="/assets/images/categories.svg"
                alt="Menu categorías"
                aria-hidden="true" 
                height="24" 
                width="24" 
                className={`${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
                />
            </figure>

            <span className="hidden lg:inline text-primary-900 heading-6">Categorías</span>
        </button>
    );
}