import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function PublicLayout ({ children, auth }) {
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [ cartOpen, setCartOpen ] = useState(false);
    const [ cart, setCart ] = useState(null); // cart global? 

    return (
        <div className="min-h-screen flex-col bg-neutral-50">
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}