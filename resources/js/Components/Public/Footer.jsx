import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer
        className="py-[60px] bg-neutral-700 text-neutral-50 z-10"
        >
            <div className="flex justify-center items-center">
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
            </div>
            <section className="p-6 text-center flex flex-col gap-4">
                <h2 className="heading-6 text-center">Aviso:</h2>
                <p>Esta página no es un e-commerce real. Es un proyecto realizado como parte del proyecto de fin de grado de DAW. Se ruega que no se pongan datos reales en caso de querer publicarla.</p>
                <p><strong>Autor:</strong> Andrés Pérez Guardiola</p>
                <p><strong>GitHub:</strong> 
                    <a 
                    href="https://github.com/Andrespeerez" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ml-1 text-amber-400 hover:text-amber-300 underline">
                        Andrespeerez
                    </a>
                </p>
            </section>
            
        </footer>
    );
}