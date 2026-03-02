import PublicLayout from "@/Layouts/PublicLayout";
import ReactMarkdown from 'react-markdown';
import { Head, router, useForm } from "@inertiajs/react";
import Button from "@/Components/Public/Button";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

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
    const [ isLoading, setIsLoading ] = useState(true);
    const [ quantity, setQuantity ] = useState(1);

    function submit(e) {
        e.preventDefault();

        if (quantity === '' || quantity === null || quantity < 1) {
            return; 
        }

        setIsAdding(true);

        router.post(route('cart.add', product.id), {
            quantity: quantity,
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

    function validateInput(currentQuantity) {
        if (currentQuantity < 1) {
            setQuantity(1);
            return false;
        }

        if (currentQuantity > 99) {
            setQuantity(99);
            return false;
        }

        return true;
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
                <section className="flex-1 mb-12 px-10 flex flex-col items-center">
                    {isLoading && 
                    <Skeleton 
                    height="600px"
                    width="600px"
                    className={`rounded-2xl`}
                    />
                    }

                    <img src={`/storage/${product.image_url}`} 
                    height="600px"
                    width="600px"
                    alt={`Foto de ${product.name}`}
                    onLoad={() => setIsLoading(false)} 
                    className={`rounded-2xl ${isLoading ? 'hidden' : 'block'}`}
                    fetchpriority="high" 
                    loading="eager"/>
                    <h2 className="lg:heading-3 heading-5 text-center my-4">{product.name}</h2>

                    <div id="product_description" className="pb-6 w-full">
                        <ReactMarkdown>
                            {product.description}
                        </ReactMarkdown>
                    </div>
                    <div className="w-full">
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
                                if (!validateInput(prev - 1)) {
                                    return;
                                }

                                return prev - 1;
                            })}
                            >
                                <img src="/assets/images/minus.svg" alt="Menos producto" />   
                            </button>
                            <input type="number" 
                            value={quantity}
                            onChange={(e) => {
                                const val = e.target.value;

                                if (val === '') {
                                    setQuantity(''); 
                                    return;
                                }

                                let currentQuantity = Math.abs(parseInt(val, 10));

                                if (!isNaN(currentQuantity) || currentQuantity === 0) {
                                    if (validateInput(currentQuantity)) {
                                        setQuantity(currentQuantity);
                                    }
                                }
                            }}
                            className="max-w-20 text-center px-3 rounded-md"
                            step="1"
                            min="1" /> 
                            <button type="button"
                            aria-label="Más producto"
                            onClick={() => setQuantity(prev => {
                                if (!validateInput(prev + 1)) {
                                    return;
                                }

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
                        if (!validateInput(prev - 1)) {
                            return;
                        }

                        return prev - 1;
                    })}
                    >
                        <img src="/assets/images/minus.svg" alt="Menos producto" />   
                    </button>
                    <input type="number" 
                    value={quantity}
                    onChange={(e) => {
                        const val = e.target.value;

                        if (val === '') {
                            setQuantity(''); 
                            return;
                        }

                        let currentQuantity = Math.abs(parseInt(val, 10));

                        if (!isNaN(currentQuantity) || currentQuantity === 0) {
                            if (validateInput(currentQuantity)) {
                                setQuantity(currentQuantity);
                            }
                        }
                    }}
                    step="1"
                    className="max-w-20 text-center px-3 rounded-md"
                    min="1" /> 
                    <button type="button"
                    aria-label="Más producto"
                    onClick={() => setQuantity(prev => {
                        if (!validateInput(prev + 1)) {
                            return;
                        }

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