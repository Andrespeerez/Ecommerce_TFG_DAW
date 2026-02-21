import Hero from "@/Components/Public/Hero";
import ProductCard from "@/Components/Public/ProductCard";
import ServiceCard from "@/Components/Public/ServiceCard";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head } from "@inertiajs/react";

// TODO: This is a fake cart. Need a real one from server
const cartDefault = {
    total_items: 0
}

const servicies = [
    {
        title: "Cocinas a mano",
        image: "/assets/images/ServiceKitchen.webp",
        href: "/cocinas-a-medida",
    },
    {
        title: "Armarios Empotrados",
        image: "/assets/images/ServiceWardrobes.webp",
        href: "/armarios-empotrados",
    },
    {
        title: "Parqué",
        image: "/assets/images/ServiceParquet.webp",
        href: "/parque",
    },
]

export default function Home({ cart = cartDefault, auth, mostSelled }) {
    return (
        <>
            <Head title="Inicio" />
            
            <PublicLayout cart={cart} auth={auth} >
                <Hero />

                <section className="flex flex-col items-center mt-[30px]">
                    <h2 className="heading-5 lg:heading-2 md:heading-4 text-primary-900">Más vendidos</h2>

                    <div
                    className="w-full flex lg:justify-center lg:flex-row flex-col items-center gap-5 px-5 "
                    >
                        {mostSelled.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                <section className="flex flex-col items-center my-[30px]">
                    <h2 className="heading-5 lg:heading-2 md:heading-4 text-primary-900">Servicios</h2>

                    <div
                    className="w-full flex lg:justify-center lg:flex-row flex-col items-center gap-5 px-5 "
                    >
                        {servicies.map((service, id) => (
                            <ServiceCard key={id} {...service} />
                        ))}
                    </div>
                </section>
            </PublicLayout>
        </>
        
    );
}