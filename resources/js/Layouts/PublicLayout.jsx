import Footer from "@/Components/Public/Footer";
import Header from "@/Components/Public/Header";
import { Link } from "@inertiajs/react";
import { useState } from "react";

/**
 * 
 * @param {*} props.children Page content
 * @param {*} props.auth Data from the user
 * @param {*} props.cart Data from the cart 
 * @returns 
 */
export default function PublicLayout ({ children, auth, cart }) {
    // open/close modals
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [ loginOpen, setLoginOpen ] = useState(false);
    const [ cartOpen, setCartOpen ] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-neutral-50">
            <Header setMenuOpen={setMenuOpen} setCartOpen={setCartOpen} setLoginOpen={setLoginOpen} auth={auth} cart={cart} />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}