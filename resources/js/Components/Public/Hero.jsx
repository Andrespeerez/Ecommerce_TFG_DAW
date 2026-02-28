import { ButtonLink } from "./Button";

export default function Hero () {
    return (
        <section
        className="w-full bg-neutral-300 flex flex-col items-center text-center pb-[30px] "
        aria-label="Banner Principal - Ir a catálogo"
        >
            <img src="/assets/images/hero.webp" alt="Banner principal de Carpitería Andrés" 
            className="w-full aspect-auto"
            fetchPriority="high"
            width="1200"
            height="600"
            />

            <h1 className="heading-4 lg:heading-1 md:heading-3 text-primary-900">Carpintería Andrés</h1>

            <ButtonLink href="/tienda">
                Ver Catálogo
            </ButtonLink>
        </section>
    );
}