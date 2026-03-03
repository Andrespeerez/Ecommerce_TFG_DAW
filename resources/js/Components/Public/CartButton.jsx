import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function CartButton({ onClick, cart }) {
    const [ hasNewItems, sethasNewItems ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);


    useEffect(() => {
        if (!cart || cart.total_items === 0) return;

        sethasNewItems(true);

        const timer = setTimeout(() => {
            sethasNewItems(false);
        }, 2500);

        return () => clearTimeout(timer);
        
    }, [cart.total_items]);

    return (
        <button
        onClick={onClick}
        className="bg-neutral-50 hover:bg-neutral-300 active:bg-neutral-500 flex gap-[10px] items-center px-[10px] py-[5px] relative rounded-[10px] transition duration-150"
        aria-label="Menu de carrito"
        >
            <figure
            aria-label="Carrito" 
            className={`h-[24px] w-[24px] ${ hasNewItems ? 'animate-bounce' : ''}`}
            >
                {isLoading &&
                <Skeleton 
                height="24" 
                width="24" 
                />
                }

                <img 
                src="/assets/images/cart.svg"
                alt="Menu Carrito"
                aria-hidden="true" 
                height="24" 
                width="24" 
                className={`${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
                />
            </figure>

            <span
            className={`absolute bg-success text-white font-semibold rounded-full size-6 -top-1 left-6 texto-base text-center ${hasNewItems ? 'animate-bounce' : ''}`}
            >{cart ? cart.total_items : ''}</span>

            <span className="hidden lg:inline text-primary-900 heading-6">Carrito</span>
        </button>
    );
}