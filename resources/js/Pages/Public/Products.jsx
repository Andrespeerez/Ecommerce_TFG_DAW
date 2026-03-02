import Filters from "@/Components/Public/Filters";
import Modal from "@/Components/Public/Modal";
import PillFilters from "@/Components/Public/PillFilters";
import ProductCard from "@/Components/Public/ProductCard";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

const cartDefault = {
    total_items: 0
}

export default function Products ({ auth, cart = cartDefault, products, canResetPassword, categories, materials, finishes, filters }) {
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
        <Head>
            <title>Tienda</title>
            <meta name="description" content="Carpintería Barberes es un negocio local de elaboración de muebles y objetos de madera de forma tradicional y artesanal. Nuestra tienda online muestra productos de madera de la más alta calidad fabricados a mano. Ofrecemos servicios para remodelar baño, cocinas, armarios empotrados y parqué. " />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Carpintería Barberes" />
            <meta property="og:description" content="Muebles y reformas de madera a medida con acabado artesanal." />
        </Head>
        
        <PublicLayout canResetPassword={canResetPassword} >

            <div
            className="flex gap-5 min-h-screen"
            >
                <aside className="hidden lg:block w-[260px] shrink-0">
                    <div className="sticky top-20">
                        <Filters categories={categories} materials={materials} finishes={finishes} filters={filters} />
                    </div>
                </aside>

                <div className="flex-1 min-w-0 flex flex-col gap-10 rounded-2xl bg-neutral-500 border-1 border-neutral-200">
                    <PillFilters categories={categories} materials={materials} finishes={finishes} filters={filters} />
                    
                    <div
                    className="mx-auto grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-5 justify-items-center p-10 "
                    >
                        {products.data.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="flex justify-center items-center gap-2 pb-10">
                        {products.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-4 py-2 border rounded ${
                                    link.active 
                                        ? 'bg-neutral-800 text-white border-neutral-800' 
                                        : 'bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-100'
                                } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                preserveScroll
                                dangerouslySetInnerHTML={{ 
                                    __html: link.label
                                            .replace('&laquo; Previous', '&laquo Anterior')
                                            .replace('Next &raquo;', 'Siguiente &raquo;'),
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <button
            className="fixed bottom-0 w-full bg-primary-800 text-neutral-50 heading-6 py-5 block lg:hidden"
            onClick={() => setMobileFiltersOpen(true)}
            >
                AÑADIR FILTROS
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