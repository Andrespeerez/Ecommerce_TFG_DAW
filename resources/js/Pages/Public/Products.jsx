import ProductCard from "@/Components/Public/ProductCard";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head } from "@inertiajs/react";

const cartDefault = {
    total_items: 0
}

export default function Products ({ auth, cart = cartDefault, products, categories, materials, finishes, filters }) {
    return (
        <>
        <Head title="Tienda" />
        
        <PublicLayout auth={auth} cart={cart}>
            <h1>Productos</h1>

            <section
            className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5"
            >
            {products.data.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            </section>
        </PublicLayout>
        
        </>
    );
}