import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer
        className="flex justify-center items-center py-[60px] bg-neutral-700 text-neutral-50"
        >
            <section>
                <h2 className="heading-6 text-center">Navegación:</h2>
                <nav
                className="flex flex-col gap-4 items-center"
                >
                    <Link href="/sobre-nosotros">Sobre nosotros</Link>
                    <Link href="/contacto">Contacto</Link>
                    <Link href="/aviso-legal">Aviso Legal</Link>
                    <Link href="/cookies">Cookies</Link>
                    <Link href="/proteccion-datos">Protección de datos</Link>
                </nav>
            </section>
        </footer>
    );
}