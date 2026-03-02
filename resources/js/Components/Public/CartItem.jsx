import { useState } from "react";
import Button from "./Button";
import { Link, router } from "@inertiajs/react";

export default function CartItem({ product, quantity, errors }) {
    const [ isUpdating, setIsUpdating ] = useState(false);

    /**
     * Increase quantity in 1
     * @param {Event} e 
     * @param {int} id 
     */
    function addItem(e, id) {
        e.preventDefault();
        setIsUpdating(true);

        router.post(route('cart.add', id), {
            quantity: 1,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setIsUpdating(false);
            },
            onError: () => {
                setIsUpdating(false);
            },
        })
    }

    /**
     * Decrease quantity in 1
     * @param {Event} e 
     * @param {int} id 
     */
    function decreaseItem(e, id) {
        e.preventDefault();
        setIsUpdating(true);

        router.post(route('cart.decrease', id), {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setIsUpdating(false);
            },
            onError: () => {
                setIsUpdating(false);
            },
        })
    }

    /**
     * Remove item from cart
     * @param {Event} e 
     * @param {int} id 
     */
    function removeItem(e, id) {
        e.preventDefault();
        setIsUpdating(true);

        router.delete(route('cart.remove', id), {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setIsUpdating(false);
            },
            onError: () => {
                setIsUpdating(false);
            },
        })
    }

    return (
        <article className="flex gap-6 p-3 w-full border-t-[1px] border-primary-200">
            <Link href={`/productos/${product.id}`}>
                <img src={`/storage/${product.image_preview_url}`} alt="Imagen" className="size-32 flex-shrink-0 object-cover" loading="lazy"/>
            </Link>
            

            <section className="flex flex-col justify-evenly w-full min-w-0">
                <h3 className="heading-6 truncate">
                    {product.name}
                </h3>
                <p>
                    Precio: {product.price_with_iva} €
                </p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <button 
                        aria-label={`Reducir cantidad de ${product.name}`}
                        disabled={isUpdating}
                        onClick={(e) => decreaseItem(e, product.id)}
                        >
                            <img src="/assets/images/minus.svg" alt="Decrementar un producto" />
                        </button>
                        <p>
                            Cantidad: {quantity}
                        </p>
                        <button 
                        disabled={isUpdating}
                        onClick={(e) => addItem(e, product.id)}
                        aria-label={`Aumentar cantidad de ${product.name}`}
                        >
                            <img src="/assets/images/plus.svg" alt="Incrementar un producto" />
                        </button>
                    </div>
                    <button 
                    disabled={isUpdating}
                    onClick={(e) => removeItem(e, product.id)}
                    aria-label={`Borrar ${product.name} del carrito`}
                    >
                        <img src="/assets/images/remove.svg" alt="Elimina el producto" />
                    </button>
                </div>
                {isUpdating ? 'Actualizando ...' : ''}
                {errors.map((error, index) => (
                        <p key={index} className="text-base text-danger font-bold">{error}</p> 
                    ) 
                )}
            </section>
            
        </article>
    );
}