import { useEffect, useState } from "react";
import Button from "./Button";
import CartItem from "./CartItem";
import { router, usePage } from "@inertiajs/react";

export default function Cart({ cart, openLoginModal }) {
    const [ hasErrors, setHasErrors ] = useState(false);
    const { auth } = usePage().props;

    useEffect(() => {
        const errors = cart.errors.length > 0 || cart.items.some(item => item.errors.length > 0);

        setHasErrors(errors);
    }, [cart])

    /**
     * Submit to the server to create the orders
     * @param {Event} e 
     */
    function submit(e) {
        e.preventDefault();

        if (!auth.user) {
            openLoginModal(); 
            return;
        }

        if (confirm('¿Estas seguro de tu compra?'))
            router.post(route('checkout.store'), {}, {});
    }    

    return (
        <div className="flex flex-col justify-between pt-5 gap-2 h-full w-full">
            <div className="w-full overflow-y-auto">
                {cart.items.map((item) => {
                    return (
                        <CartItem key={item.data.id} product={item.data} quantity={item.quantity} errors={item.errors} />
                    );
                })}
            </div>
            <div className="bg-neutral-800 text-neutral-50">
                {hasErrors ? cart.errors.map((error) => (
                    <p className="text-danger text-base bg-neutral-600">{error}</p>
                )) : ''}
                <div className="flex justify-between items-center py-1 px-2">
                    <p className="text-base font-bold font-lora">Precio total: {cart.total_price} €</p>
                    <p className="text-base font-bold">Nº Productos: {cart.total_items}</p>
                </div>
                
                <Button 
                className="w-full rounded-b-[0px]"
                disabled={hasErrors}
                onClick={(e) => {
                    submit(e);
                }}
                >
                    Realizar Pedido
                </Button>
            </div>
        </div>
    );
}