import { useEffect, useState } from "react";
import Button from "./Button";
import CartItem from "./CartItem";
import { router, usePage } from "@inertiajs/react";
import Modal from "./Modal";
import Confirm from "./Confirm";

export default function Cart({ cart, openLoginModal, closeModals, triggerConfirm }) {
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

        // 1 Check if is authed
        if (!auth.user) {
            openLoginModal(); 
            return;
        }

        // 2 Check if has 
        if (!auth.user.address || !auth.user.city || !auth.user.province || !auth.user.postal_code ) {
            closeModals();
            router.visit(route('profile.edit', {
                error: 'Debes completar tus datos de envío para realizar un pedido.',
            }));
            return;
        }

        if (cart.items?.length === 0) {
            return;
        }

        if (hasErrors) {
            return;
        }
        
        triggerConfirm('¿Quieres completar el pedido?', action);
    }    

    const action = () => {
        router.post(route('checkout.store'), {}, {});
    }

    return (
        <div className="relative flex flex-col justify-between mt-14 gap-2 h-full w-full">    


            <div className="w-full overflow-y-auto mb-40">
                {cart.items?.length == 0 ? 
                <p className="heading-6 text-center pt-10">El carrito está vacío</p>
                : cart.items.map((item) => {
                    return (
                        <CartItem key={item.data.id} product={item.data} quantity={item.quantity} errors={item.errors} />
                    );
                })}
            </div>
            <div className="absolute bottom-0 w-full text-neutral-50">
                {hasErrors ? cart.errors.map((error, index) => (
                    <p className="text-danger text-base font-bold p-2 text-center" key={index}>{error}</p>
                )) : ''}
                <div className="bg-neutral-800 w-full">
                    <div className="flex justify-between items-center py-1 px-2 ">
                        <p className="text-base font-bold font-lora">Precio total: {cart.total_price.toFixed(2)} €</p>
                        <p className="text-base font-bold">Nº Productos: {cart.total_items}</p>
                    </div>
                    
                    <Button 
                    className="w-full rounded-b-[0px] text-center"
                    disabled={hasErrors || cart.items?.length == 0}
                    onClick={(e) => {
                        submit(e);
                    }}
                    >
                        Realizar Pedido
                    </Button>
                </div>
                
            </div>
        </div>
    );
}