import PublicLayout from "@/Layouts/PublicLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function Construction({cart, auth}) {
    const [ isLoading, setIsLoading ] = useState(true);

    const handleBack = () => {
        router.get(route('home.index'));
    }

    return (
        <>
            <Head>
                <title>En Construcción</title>
                <meta name="description" content="Carpintería Barberes es un negocio local de elaboración de muebles y objetos de madera de forma tradicional y artesanal. Nuestra tienda online muestra productos de madera de la más alta calidad fabricados a mano. Ofrecemos servicios para remodelar baño, cocinas, armarios empotrados y parqué. " />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Carpintería Barberes" />
                <meta property="og:description" content="Muebles y reformas de madera a medida con acabado artesanal." />
            </Head>

            <PublicLayout>
                <div className="w-full min-h-[80vh] flex flex-col items-center justify-center p-10 gap-8">
                    { isLoading &&
                    <Skeleton
                    width="672"
                    height="620"
                    className="max-w-2xl w-full h-auto"
                    />
                    }

        
                    <img 
                        src="/assets/images/under-construction.webp" 
                        alt="Sitio en construcción" 
                        className={`max-w-2xl w-full h-auto object-contain ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        loading="eager"
                        fetchpriority="high"
                    />
                    
                    <button
                        className="p-4 bg-neutral-700 text-neutral-50 heading-6 text-[16px] lg:heading-6 rounded-lg active:scale-95 transition-transform"
                        onClick={handleBack}
                    >
                        Volver a página principal
                    </button>
                    
                </div>
            </PublicLayout>
        </>
    );
}