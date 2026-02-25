import PublicLayout from "@/Layouts/PublicLayout";
import ReactMarkdown from 'react-markdown';
import { Head, router, useForm } from "@inertiajs/react";
import Button from "@/Components/Public/Button";
import { useState } from "react";

const cartDefault = {
    total_items: 0
}

const productDefault = {
    id: 0,
    image_url: "https://placehold.co/600x400",
    name: "Producto muy falso",
    description: `
    # Descripción

    *Producto de prueba* para ver que todo funciona bien. No hay mucho más que ver aquí
    `,
    price_with_iva: 40,
}

export default function ProductDetails({ auth, cart = cartDefault, product = productDefault, canResetPassword, categories, }) {
    const [ isAdding, setIsAdding ] = useState(false);

    function submit(e) {
        e.preventDefault();

        setIsAdding(true);

        router.post(route('cart.add', product.id), {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setIsAdding(false);
            },
            onError: () => {
                setIsAdding(false);
            },
        });
    }

    return (
        <>
        <Head title={product.name} />

        <PublicLayout cart={cart} auth={auth} canResetPassword={canResetPassword} categories={categories} >
            <div className="flex">
                <section className="flex-1 mb-12 px-10">
                    <img src={`/storage/${product.image_url}`} alt={`Foto de ${product.name}`} className="mx-auto"/>
                    <h2 className="lg:heading-3 heading-5 text-center mt-4">{product.name}</h2>
                    <div id="product_description">
                        <ReactMarkdown>
                            {product.description}
                        </ReactMarkdown>
                    </div>
                    
                </section>
                <section>
                    <form onSubmit={submit}
                    className="sticky top-[90px] bg-primary-100 rounded-[10px] px-[42px] py-[25px] lg:flex flex-col items-center gap-[16px] mr-10 hidden"
                    >
                        <h2
                        className="heading-6"
                        >{product.name}</h2>
                        <p className="heading-6">{product.price_with_iva}€</p>
                        <Button type="submit" variant="secondary" disabled={isAdding}>
                            { isAdding ? "Añadiendo ..." : "Añadir al Carrito" }
                        </Button>
                    </form>

                </section>
            </div>

            <form onSubmit={submit}
            className="sticky bottom-0 z-50 bg-primary-100 w-full lg:hidden"
            >
                <h2
                className="heading-6"
                >{product.name}</h2>
                <p className="heading-6">{product.price_with_iva}€</p>
                <Button type="submit" variant="secondary" disabled={isAdding} className="w-full">
                    { isAdding ? "Añadiendo ..." : "Añadir al Carrito" }
                </Button>
            </form>
            
        </PublicLayout>

        </>
    );
}