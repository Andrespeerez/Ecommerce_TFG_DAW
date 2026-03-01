import { ButtonLink } from "./Button";

// FAKE PRODUCT
const productFake = {
    id: 0,
    image_url: "https://placehold.co/600x400",
    name: "Producto muy falso",
    price_with_iva: 40,
}

export default function ProductCard({ product = productFake }) {

    return (
        <article
        itemScope 
        itemType="https://schema.org/Product"
        className="rounded-[20px] flex flex-col justify-between gap-3 pb-5 bg-neutral-300 max-w-[450px] w-full overflow-hidden border-t-1 lg:h-[600px] md:h-[500px]"
        >
            <img src={`/storage/${product.image_small_url}`} alt={`Foto de ${product.name}`} 
            className="object-cover w-full h-[70%]"
            itemProp="image"
            loading="lazy"
            />

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

                <ButtonLink variant="secondary" href={`/productos/${product.id}`} aria-label={`Ver detalles de ${product.name}`}>
                    Ver Producto <span className="sr-only">{product.name}</span>
                </ButtonLink>
            </section>

            {product.description && (
                <meta itemProp="description" content={product.description} />
            )}


        </article>
    );
}

