import Modal from "@/Components/Public/Modal";
import Footer from "@/Components/Public/Footer";
import Header from "@/Components/Public/Header";
import { Link, usePage } from "@inertiajs/react";
import { createContext, useEffect, useState } from "react";
import Signin from "@/Components/Public/Signin";
import Login from "@/Components/Public/Login";
import { Button } from "@/Components/Admin/Button";
import Categories from "@/Components/Public/Categories";
import Cart from "@/Components/Public/Cart";
import Notification from "@/Components/Public/Notification";
import Confirm from "@/Components/Public/Confirm";

export const ConfirmContext = createContext();

export default function PublicLayout ({ children, canResetPassword }) {
    const { cart, auth, categories, flash } = usePage().props;
    

    // open/close modals
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [ loginOpen, setLoginOpen ] = useState(false);
    const [ cartOpen, setCartOpen ] = useState(false);
    const [ loginSignin, setLoginSignin ] = useState(false);
    const [ confirmModal, setConfirmModal ] = useState({
        isOpen: false,
        message: '',
        onConfirm: () => {},
    })

    useEffect(() => {
        if (flash?.openLoginModal) {
            setLoginOpen(true);
        }
    }, [flash])

    function handleConfirm (message, action) {
        handleCloseModal();
        setConfirmModal({
            isOpen: true,
            message: message,
            onConfirm: () => {
                action();
                setConfirmModal(prev => ({...prev, isOpen: false}));
            },
        })
    }

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
        <ConfirmContext.Provider value={handleConfirm}>
            <div className="min-h-screen flex flex-col bg-neutral-50">
                <a href="#main-content" className="absolute -top-10 left-0 text-white focus:top-0">Saltar al contenido principal</a>

                <Header setMenuOpen={handleOpenMenu} setCartOpen={handleOpenCart} setLoginOpen={handleOpenLogin} auth={auth} cart={cart} handleCloseModal={handleCloseModal} />

                <Notification />

                <main className="flex-1" id="main-content">
                    {children}
                </main>

                <Footer />



                {confirmModal.isOpen && 
                <Modal
                type="confirm"
                modalStyle="p-10 bg-white rounded-xl"
                closeModal={(prev) => setConfirmModal({...prev, isOpen: false})}
                >
                    <Confirm
                    closeModal={(prev) => setConfirmModal({...prev, isOpen: false})}
                    action={confirmModal.onConfirm}
                    >
                        {confirmModal.message}
                    </Confirm>
                </Modal>
                }


                {menuOpen && 
                <Modal closeModal={handleCloseModal}
                type="menu"
                modalStyle="h-[calc(100vh-80px)] md:w-1/2 xl:w-1/3 w-full bg-neutral-200 p-100 flex flex-col gap-20 items-center overflow-y-auto"
                >
                    <Categories categories={categories} />      
                </Modal>
                }

                {loginOpen && 
                <Modal closeModal={handleCloseModal} 
                type="login"
                modalStyle="h-[calc(100vh-80px)] md:w-1/2 xl:w-1/3 w-full bg-neutral-200 p-100 flex flex-col gap-10 items-center pt-20 overflow-y-auto pb-60"
                >
                    {loginSignin ? 
                    <Signin closeModal={handleCloseModal} /> : 
                    <Login canResetPassword={canResetPassword} closeModal={handleCloseModal} />
                    }
                    <div className="flex flex-col gap-1">
                        <p>{loginSignin ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}</p>
                        <Button onClick={toggleLoginSignin}>{loginSignin ? "Entra" : "Registrate"}</Button>
                    </div>
                        
                </Modal>
                }

                {cartOpen && 
                <Modal closeModal={handleCloseModal} 
                type="cart"
                modalStyle="h-[calc(100vh-80px)] md:w-1/2 xl:w-1/3 w-full bg-neutral-200 flex flex-col gap-20 items-center"
                >
                    <Cart cart={cart} openLoginModal={handleOpenLogin} closeModals={handleCloseModal} triggerConfirm={handleConfirm} />
                </Modal>
                }


            </div>  
        </ConfirmContext.Provider>
    );
}