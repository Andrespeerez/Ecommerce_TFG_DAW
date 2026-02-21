import PublicLayout from "@/Layouts/PublicLayout";
import ReactMarkdown from 'react-markdown';
import { Head } from "@inertiajs/react";

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



export default function ProductDetails({ auth, cart = cartDefault, product = productDefault }) {
    return (
        <>
        <Head title={product.name} />

        <PublicLayout auth={auth} cart={cart} >
            <h1>{product.name}</h1>
            <img src={`/storage/${product.image_url}`} alt={`Foto de ${product.name}`} />
            <ReactMarkdown>
                {product.description}
            </ReactMarkdown>
        </PublicLayout>

        </>
    );
}