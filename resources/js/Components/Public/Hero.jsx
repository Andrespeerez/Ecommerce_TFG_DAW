import { useState } from "react";
import { ButtonLink } from "./Button";
import Skeleton from "react-loading-skeleton";

export default function Hero () {
    const [ isLoading, setIsLoading ] = useState(true);

    return (
        <section
        className="w-full bg-neutral-300 flex flex-col items-center text-center pb-[30px] gap-5"
        aria-label="Banner Principal - Ir a catálogo"
        >
            <figure className="w-full min-h-[80px] max-h-[1200px]">
                {isLoading &&
                <div style={{ aspectRatio: '2545 / 634' }} className="w-full">
                    <Skeleton 
                    className="w-full aspect-auto"
                    />
                </div>
                }

                <img src="/assets/images/hero.webp" alt="Banner principal de Carpitería Andrés" 
                className={`w-full aspect-auto ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                fetchpriority="high"
                onLoad={() => setIsLoading(false)}
                height="600"
                />
            </figure>
            

            <h1 className="heading-4 lg:heading-1 md:heading-3 text-primary-900">Carpintería Andrés</h1>

            <ButtonLink href="/tienda" className="lg:w-96 w-full bg-purple-700 hover:bg-purple-500 active:bg-purple-900 heading-6">
                Ver Catálogo
            </ButtonLink>
        </section>
    );
}