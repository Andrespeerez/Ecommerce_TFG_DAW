export default function CartItem({ product, quantity }) {
    return (
        <article className="flex gap-6 p-3 w-full border-b-[1px] border-primary-200">
            <img src={`/storage/${product.image_url}`} alt="Imagen" className="size-32 flex-shrink-0 object-cover"/>

            <div className="flex flex-col justify-evenly w-full min-w-0">
                <h3 className="heading-6 truncate">
                    {product.name}
                </h3>
                <p>
                    Precio: {product.price_with_iva} €
                </p>
                <p>
                    Cantidad: {quantity}
                </p>
            </div>
            
        </article>
    );
}