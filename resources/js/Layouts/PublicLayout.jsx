import Modal from "@/Components/Public/Modal";
import Footer from "@/Components/Public/Footer";
import Header from "@/Components/Public/Header";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import Signin from "@/Components/Public/Signin";
import Login from "@/Components/Public/Login";
import { Button } from "@/Components/Admin/Button";
import Categories from "@/Components/Public/Categories";


export default function PublicLayout ({ children, auth, cart, categories, canResetPassword }) {
    console.log(categories);
    console.log(cart);
    console.log(auth);

    // open/close modals
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [ loginOpen, setLoginOpen ] = useState(false);
    const [ cartOpen, setCartOpen ] = useState(false);
    const [ loginSignin, setLoginSignin ] = useState(false);

    function handleOpenMenu() {
        // close other modals
        handleCloseModal();

        // open menu
        if (menuOpen == true) setMenuOpen(false);
        else setMenuOpen(true);
    }

    function handleOpenLogin() {
        // close other modals
        handleCloseModal();

        // open menu
        if (loginOpen == true) setLoginOpen(false);
        else setLoginOpen(true);
    }

    function handleOpenCart() {
        // close other modals
        handleCloseModal();

        // open menu
        if (cartOpen == true) setCartOpen(false);
        else setCartOpen(true);
    }

    function handleCloseModal() {
        // close all modals
        setMenuOpen(false);
        setLoginOpen(false);
        setCartOpen(false);
    }

    function toggleLoginSignin() {
        loginSignin ? setLoginSignin(false) : setLoginSignin(true);
    }

    return (
        <div className="min-h-screen flex flex-col bg-neutral-50">
            <Header setMenuOpen={handleOpenMenu} setCartOpen={handleOpenCart} setLoginOpen={handleOpenLogin} auth={auth} cart={cart} handleCloseModal={handleCloseModal} />

            <main className="flex-1">
                {children}
            </main>

            <Footer />


            {menuOpen && 
            <Modal closeModal={handleCloseModal} 
            type="menu"
            modalStyle="h-full md:w-1/2 xl:w-1/3 w-full bg-neutral-200 p-100 flex flex-col gap-20 items-center"
            >
                <Categories categories={categories} />      
            </Modal>
            }

            {loginOpen && 
            <Modal closeModal={handleCloseModal} 
            type="login"
            modalStyle="h-full md:w-1/2 xl:w-1/3 w-full bg-neutral-200 p-100 flex flex-col gap-20 items-center"
            >
                <Button onClick={toggleLoginSignin}>{loginSignin ? "Log In" : "Registrarse"}</Button>

                {loginSignin ? 
                <Signin /> : 
                <Login canResetPassword={canResetPassword} />
                }           
            </Modal>
            }

            {cartOpen && 
            <Modal closeModal={handleCloseModal} 
            type="cart"
            modalStyle="h-full md:w-1/2 xl:w-1/3 w-full bg-neutral-200 p-100 flex flex-col gap-20 items-center"
            >
                              
            </Modal>
            }


        </div>
    );
}