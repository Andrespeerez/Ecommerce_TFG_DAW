import { useEffect, useState } from "react";

export default function CartButton({ onClick, cart }) {
    const [ hasNewItems, sethasNewItems ] = useState(false); 


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
            <img src="/assets/images/cart.svg" alt="Menu Carrito" aria-label="Carrito" className={`${ hasNewItems ? 'animate-bounce' : ''}`}/>

            <span
            className={`absolute bg-success text-white font-semibold rounded-full size-6 -top-1 left-6 texto-base text-center ${hasNewItems ? 'animate-bounce' : ''}`}
            >{cart ? cart.total_items : ''}</span>

            <span className="hidden lg:inline text-primary-900 heading-6">Carrito</span>
        </button>
    );
}