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
}

export default function ProductCard({ product = productFake }) {
    const [ isAdding, setIsAdding ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const { cart } = usePage().props;
    
    const handleClickCard = (e) => {
        router.visit(route('products.show', product.id));
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
        className="rounded-[20px] flex flex-col justify-between gap-3 pb-5 bg-neutral-300 max-w-[450px] w-full overflow-hidden border-t-1 lg:h-[600px] md:h-[500px] cursor-pointer"
        onClick={handleClickCard}
        >
            <figure className="group relative w-full h-[70%] overflow-hidden rounded-lg">
                {isLoading && 
                <Skeleton 
                
                className="w-full h-full"
                />
                }

                <img 
                    src={`/storage/${product.image_small_url}`} alt={`Foto de ${product.name}`} 
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isLoading ? "hidden" : "block"}`}
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

