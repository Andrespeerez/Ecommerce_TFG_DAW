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
        aria-label={`Tarjeta de producto: "${product.name}"`}
        className="rounded-[20px] flex flex-col justify-between gap-3 pb-[10px] bg-neutral-300 max-w-[450px] w-full overflow-hidden border-t-1 lg:h-[600px] md:h-[500px]"
        >
            <img src={`/storage/${product.image_url}`} alt={`Foto de ${product.name}`} 
            className="object-cover w-full h-[70%]"
            itemProp="image"
            />

            <h3
            className="heading-6 lg:heading-5 text-primary-900 text-center"
            itemProp="name"
            >
                {product.name}
            </h3>

            <div
            className="flex md:flex-row flex-col gap-4 justify-evenly items-center px-2"
            itemProp="offers" 
            itemScope 
            itemType="https://schema.org/Offer"
            >
                <meta itemProp="priceCurrency" content="EUR" />
                <div
                className="text-primary-900 heading-6 lg:heading-5"
                >
                    <span itemProp="price">{product.price_with_iva}</span>€
                </div>

                <ButtonLink variant="secondary" href={`/productos/${product.id}`}>
                    Ver Producto <span className="hidden">{product.name}</span>
                </ButtonLink>
            </div>

            {product.description && (
                <meta itemProp="description" content={product.description} />
            )}


        </article>
    );
}

