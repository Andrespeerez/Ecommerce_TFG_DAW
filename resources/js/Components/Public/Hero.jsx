import { ButtonLink } from "./Button";

export default function Hero () {
    return (
        <section
        className="w-full bg-neutral-300 flex flex-col items-center text-center pb-[30px] "
        aria-label="Banner Principal - Ir a catálogo"
        >
            <img src="/assets/images/hero.webp" alt="Banner principal de Carpitería Barberes" 
            className="w-full aspect-auto"
            />

            <h1 className="heading-4 lg:heading-1 md:heading-3 text-primary-900">Carpintería Barberes</h1>

            <ButtonLink href="/productos">
                Ver Catálogo
            </ButtonLink>
        </section>
    );
}