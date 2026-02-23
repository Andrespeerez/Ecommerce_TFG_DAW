import Filters from "@/Components/Public/Filters";
import PillFilters from "@/Components/Public/PillFilters";
import ProductCard from "@/Components/Public/ProductCard";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head, router } from "@inertiajs/react";

const cartDefault = {
    total_items: 0
}

export default function Products ({ auth, cart = cartDefault, products, categories, materials, finishes, filters }) {
    console.log(filters);

    return (
        <>
        <Head title="Tienda" />
        
        <PublicLayout auth={auth} cart={cart}>

            <div
            className="flex gap-5"
            >
                <aside className="hidden lg:block w-[260px] shrink-0">
                    <div className="sticky top-20">
                        <Filters categories={categories} materials={materials} finishes={finishes} filters={filters} />
                    </div>
                </aside>

                <div className="flex-1 min-w-0 flex flex-col gap-10">
                    <PillFilters categories={categories} materials={materials} finishes={finishes} filters={filters} />
                    
                    <div
                    className="mx-auto grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-5 justify-items-center p-10 "
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