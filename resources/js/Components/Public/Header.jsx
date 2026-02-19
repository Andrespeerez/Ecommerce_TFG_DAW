import { Link } from "@inertiajs/react";

export default function Header({ auth, cart }) {



    return (
        <header
        className="bg-primary-50 stroke-primary-200 flex justify-between items-center "
        >
            <Link href="/" className="flex items-center">
                <img src="/assets/images/logo.svg" alt="Logo Carpintería Barberes" />
            </Link>

            

            <div>

            </div>
        </header>
    );
}