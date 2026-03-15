import { router, usePage } from "@inertiajs/react";
import Button, {  } from "./Button";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

// FAKE PRODUCT
const productFake = {
    id: 0,
    image_url: "https://placehold.co/600x400",
    name: "Producto muy falso",
    price_with_iva: 40,
    stocK: 10,
}

export default function ProductCard({ product = productFake }) {
    const [ isAdding, setIsAdding ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const { cart } = usePage().props;
    
    const handleClickCard = (e) => {
        router.visit(route('products.show', product.id));
    }

    const stockMessage = () => {
        if (product.stock <= 0) {
            return {
                message: "Sin Stock",
                color: "bg-zinc-900",
            };
        } else if(product.stock <= 10) {
            return {
                message: "Últimas Unidades",
                color: "bg-orange-800",
            };
        } else {
            return {
                message: "Suficiente Stock",
                color: "bg-accent-700",
            }
        }
    }

    const handleClickAdd = (e) => {
        e.stopPropagation();

        setIsAdding(true);

        router.post(route('cart.add', product.id), {
            quantity: 1,
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
        <article
        itemScope 
        itemType="https://schema.org/Product"
        className="rounded-[20px] flex flex-col justify-between items-center gap-3 pb-5 bg-neutral-300 max-w-[450px] w-full overflow-hidden border-t-1 lg:h-[600px] md:h-[500px] cursor-pointer"
        onClick={handleClickCard}
        >
            <figure className="group relative w-full h-[70%] max-h-[400px] min-h-[260px] overflow-hidden rounded-lg">
                {isLoading && 
                <Skeleton 
                width="450"
                height="400"
                className="w-full h-full"
                />
                }

                <img 
                    src={`/storage/${product.image_small_url}`} alt={`Foto de ${product.name}`} 
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isLoading ? "opacity-0" : "opacity-100"}`}
                    itemProp="image"
                    loading="lazy"
                    onLoad={() => setIsLoading(false)}
                />
            </figure>            

            <h3
            className="heading-6 lg:heading-5 text-primary-900 text-center"
            itemProp="name"
            >
                {product.name}
            </h3>

            <p
            className={`text-primary-50 font-bold p-1 px-2 text-base text-center w-52 rounded-md ${stockMessage().color}`}
            >
                {stockMessage().message}
            </p>

            <section
            className="flex md:flex-row flex-col gap-2 justify-evenly items-center px-2"
            itemProp="offers" 
            itemScope 
            itemType="https://schema.org/Offer"
            >
                <meta itemProp="priceCurrency" content="EUR" />
                <p
                className="text-primary-900 heading-6 lg:heading-5"
                >
                    <span itemProp="price">{product.price_with_iva}</span>€
                </p>

                <Button variant="secondary" aria-label={`Añadir ${product.name} al carrito`} 
                disabled={isAdding}
                onClick={handleClickAdd}
                >
                    Al carrito <span className="sr-only">{product.name}</span>
                </Button>
 
            </section>

            {product.description && (
                <meta itemProp="description" content={product.description} />
            )}


        </article>
    );
}

