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
    const [ quantity, setQuantity ] = useState(1);

    function submit(e) {
        e.preventDefault();

        setIsAdding(true);

        router.post(route('cart.add', product.id), {
            quantity: quantity
        }, {
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

        <PublicLayout canResetPassword={canResetPassword} >
            <button
            onClick={() => window.history.back()}
            className="text-accent-800 heading-6 p-5 mb-3"
            >
                Volver
            </button>

            <div className="flex">
                <section className="flex-1 mb-12 px-10">
                    <img src={`/storage/${product.image_url}`} alt={`Foto de ${product.name}`} className="mx-auto" fetchpriority="high"/>
                    <h2 className="lg:heading-3 heading-5 text-center my-4">{product.name}</h2>
                    <div id="product_description" className="pb-6">
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

                        <div className="text-center p-4 flex gap-4 justify-center items-center">
                            <button type="button"
                            aria-label="Menos producto"
                            onClick={() => setQuantity(prev => {
                                if (prev <= 1) return prev;
                                
                                return prev - 1;
                            })}
                            >
                                <img src="/assets/images/minus.svg" alt="Menos producto" />   
                            </button>
                            <input type="number" 
                            value={quantity}
                            onChange={(e) => {
                                setQuantity(e.target.value)
                            }}
                            className="w-12 text-center px-3 rounded-md"
                            step="1"
                            min="1" /> 
                            <button type="button"
                            aria-label="Más producto"
                            onClick={() => setQuantity(prev => {
                                return prev + 1;
                            })}
                            >
                                <img src="/assets/images/plus.svg" alt="Más producto" />
                            </button>
                        </div>

                        <Button type="submit" variant="secondary" disabled={isAdding}>
                            { isAdding ? "Añadiendo ..." : "Añadir al Carrito" }
                        </Button>
                    </form>

                </aside>
            </div>

            <form onSubmit={submit}
            className="sticky bottom-0 z-40 bg-primary-100 w-full lg:hidden border-t-2 border-t-primary-400"
            >
                <p className="heading-6 text-center">{product.price_with_iva}€ / unidad</p>
                
                <div className="text-center p-4 flex gap-4 justify-center items-center">
                    <button type="button"
                    aria-label="Menos producto"
                    onClick={() => setQuantity(prev => {
                        if (prev <= 1) return prev;
                        
                        return prev - 1;
                    })}
                    >
                        <img src="/assets/images/minus.svg" alt="Menos producto" />   
                    </button>
                    <input type="number" 
                    value={quantity}
                    onChange={(e) => {
                        setQuantity(e.target.value)
                    }}
                    step="1"
                    className="w-12 text-center px-3 rounded-md"
                    min="1" /> 
                    <button type="button"
                    aria-label="Más producto"
                    onClick={() => setQuantity(prev => {
                        return prev + 1;
                    })}
                    >
                        <img src="/assets/images/plus.svg" alt="Más producto" />
                    </button>
                </div>

                <Button type="submit" variant="secondary" disabled={isAdding} className="w-full rounded-b-[0px] heading-6">
                    { isAdding ? "Añadiendo ..." : "Añadir al Carrito" }
                </Button>
            </form>
            
        </PublicLayout>

        </>
    );
}