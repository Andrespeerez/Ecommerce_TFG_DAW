import Filters from "@/Components/Public/Filters";
import Modal from "@/Components/Public/Modal";
import PillFilters from "@/Components/Public/PillFilters";
import ProductCard from "@/Components/Public/ProductCard";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

const cartDefault = {
    total_items: 0
}

export default function Products ({ auth, cart = cartDefault, products, categories, materials, finishes, filters }) {
    const [ mobileFiltersOpen, setMobileFiltersOpen ] = useState(true);

    function handleOpenFilters() {
        // open menu
        if (mobileFiltersOpen == true) setMobileFiltersOpen(false);
        else setMobileFiltersOpen(true);
    }

    useEffect(() => {
        setMobileFiltersOpen(false); // force modal close if filters change
    }, [filters])

    return (
        <>
        <Head title="Tienda" />
        
        <PublicLayout auth={auth} cart={cart}>

            <div
            className="flex gap-5 min-h-screen"
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

            <button
            className="fixed bottom-0 w-full bg-neutral-800 text-neutral-50 heading-6 py-5 block lg:hidden"
            onClick={() => setMobileFiltersOpen(true)}
            >
                FILTROS
            </button>

            {mobileFiltersOpen && 
            <Modal 
            type="filters" 
            modalStyle="h-full w-full px-10 bg-neutral-200 overflow-y-auto"
            closeModal={handleOpenFilters}>
                <Filters categories={categories} materials={materials} finishes={finishes} filters={filters} />
            </Modal>
            }
            
        </PublicLayout>
        
        </>
    );
}