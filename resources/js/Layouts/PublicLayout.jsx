import Modal from "@/Components/Public/Modal";
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

    function handleOpenMenu() {
        // close other modals
        handleCloseModal();

        // open menu
        setMenuOpen(true);
    }

    function handleOpenLogin() {
        // close other modals
        handleCloseModal();

        // open menu
        setLoginOpen(true);
    }

    function handleOpenCart() {
        // close other modals
        handleCloseModal();

        // open menu
        setCartOpen(true);
    }

    function handleCloseModal() {
        // close all modals
        setMenuOpen(false);
        setLoginOpen(false);
        setCartOpen(false);
    }

    return (
        <div className="min-h-screen flex flex-col bg-neutral-50">
            <Header setMenuOpen={handleOpenMenu} setCartOpen={handleOpenCart} setLoginOpen={handleOpenLogin} auth={auth} cart={cart} />

            <main className="flex-1">
                {children}
            </main>

            <Footer />


            {menuOpen && 
            <Modal closeModal={handleCloseModal} 
            type="menu"
            modalStyle="h-full w-1/2 bg-neutral-200 p-100 flex flex-col gap-20 items-center"
            >
                              
            </Modal>
            }

            {loginOpen && 
            <Modal closeModal={handleCloseModal} 
            type="login"
            modalStyle="h-full w-1/2 bg-neutral-200 p-100 flex flex-col gap-20 items-center"
            >
                              
            </Modal>
            }

            {cartOpen && 
            <Modal closeModal={handleCloseModal} 
            type="cart"
            modalStyle="h-full w-1/3 bg-neutral-200 p-100 flex flex-col gap-20 items-center"
            >
                              
            </Modal>
            }


        </div>
    );
}