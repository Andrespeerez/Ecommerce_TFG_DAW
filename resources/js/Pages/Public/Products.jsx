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

            <div
            className="flex gap-5 p-10"
            >
                <aside className="hidden lg:block w-[260px] shrink-0">
                    <div className="sticky top-5">
                        Aquí van los filtros
                    </div>
                </aside>

                <div className="flex-1 min-w-0">
                    <div>
                        Aquí van pills de productos
                    </div>
                    <div
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 justify-items-center"
                    >
                        {products.data.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
            
        </PublicLayout>
        
        </>
    );
}