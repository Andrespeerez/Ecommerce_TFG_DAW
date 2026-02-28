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
        <Head>
            <title>{product.name}</title>
            <meta name="description" content="Carpintería Barberes es un negocio local de elaboración de muebles y objetos de madera de forma tradicional y artesanal. Nuestra tienda online muestra productos de madera de la más alta calidad fabricados a mano. Ofrecemos servicios para remodelar baño, cocinas, armarios empotrados y parqué. " />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Carpintería Barberes" />
            <meta property="og:description" content="Muebles y reformas de madera a medida con acabado artesanal." />
        </Head>

        <PublicLayout cart={cart} auth={auth} canResetPassword={canResetPassword} categories={categories} >
            <button
            onClick={() => window.history.back()}
            className="text-accent-800 heading-6 p-5 mb-3"
            >
                Volver
            </button>

            <div className="flex">
                <section className="flex-1 mb-12 px-10">
                    <img src={`/storage/${product.image_url}`} alt={`Foto de ${product.name}`} className="mx-auto"/>
                    <h2 className="lg:heading-3 heading-5 text-center my-4">{product.name}</h2>
                    <div id="product_description">
                        <ReactMarkdown>
                            {product.description}
                        </ReactMarkdown>
                    </div>
                    <div>
                        <h3 className="heading-6">Caraterísticas:</h3>
                        
                        <h4 className="text-base font-lora font-bold">Dimensiones:</h4>
                        <ul>
                            <li
                            className="font-semibold"
                            >
                                Ancho: 
                                <span className="font-normal"> {product.width_cm} cm</span>
                            </li>
                            <li
                            className="font-semibold"
                            >
                                Alto: 
                                <span className="font-normal"> {product.height_cm} cm</span>
                            </li>
                            <li
                            className="font-semibold"
                            >
                                Profundo: 
                                <span className="font-normal"> {product.depth_cm} cm</span>
                            </li>
                        </ul>
                    </div>
                    
                </section>
                <aside className="w-1/3 2xl:w-fit lg:block hidden">
                    <form onSubmit={submit}
                    className="sticky top-[90px] bg-primary-100 rounded-[10px] px-[42px] py-[25px] lg:flex flex-col items-center gap-[16px] mr-10 hidden"
                    >
                        <h2
                        className="heading-6 text-center"
                        >{product.name}</h2>
                        <p className="heading-6">{product.price_with_iva}€</p>
                        <Button type="submit" variant="secondary" disabled={isAdding}>
                            { isAdding ? "Añadiendo ..." : "Añadir al Carrito" }
                        </Button>
                    </form>

                </aside>
            </div>

            <form onSubmit={submit}
            className="sticky bottom-0 z-40 bg-primary-100 w-full lg:hidden"
            >
                <p className="heading-6 text-center">{product.price_with_iva}€</p>
                <Button type="submit" variant="secondary" disabled={isAdding} className="w-full rounded-b-[0px] heading-6">
                    { isAdding ? "Añadiendo ..." : "Añadir al Carrito" }
                </Button>
            </form>
            
        </PublicLayout>

        </>
    );
}