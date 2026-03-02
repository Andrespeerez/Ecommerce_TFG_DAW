import Modal from "@/Components/Public/Modal";
import ConfirmPasswordForm from "@/Components/Public/ConfirmPasswordForm";
import UserProfileAccount from "@/Components/Public/UserProfileAccount";
import UserProfileDelete from "@/Components/Public/UserProfileDetele";
import UserProfileInfo from "@/Components/Public/UserProfileInfo";
import UserProfileShipment from "@/Components/Public/UserProfileShipment";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

// TODO: This is a fake cart. Need a real one from server
const cartDefault = {
    total_items: 0
}

export default function UserProfile({ cart = cartDefault, auth, canResetPassword, categories, mustVerifyEmail, status, errors }) {
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [ confirmPasswordModal, setConfirmPasswordModal ] = useState({
        isOpen: false,
        onSuccess: null,
    });

    useEffect(() => {
        if (errors?.password_confirmed === false) {
            setConfirmPasswordModal({
                isOpen: true,
                onSuccess: executeAction,
            });
        }
    }, [errors]);

    const executeAction = (action) => {
        action({
            onError: (errors) => {
                if (errors.password_confirmed === false) {
                    setConfirmPasswordModal({
                        isOpen: true,
                        onSuccess: () => {
                            setConfirmPasswordModal({ isOpen: false, onSuccess: null });
                            action();
                        },
                    });
                }
            }
        })
    }

    const NavigationLinks = () => (
        <ul className="flex flex-col gap-2 text-left pl-4 pt-4 heading-6">
            <li><Link href="/area-cliente" className="text-neutral-600">Mi Perfil</Link></li>
            <li><Link href="/area-cliente/pedidos">Mis Pedidos</Link></li>
        </ul>
    )


    return (
        <>
            <Head title="Área Cliente " />

            <Head>
                <title>Pedidos</title>
                <meta name="description" content="Carpintería Barberes es un negocio local de elaboración de muebles y objetos de madera de forma tradicional y artesanal. Nuestra tienda online muestra productos de madera de la más alta calidad fabricados a mano. Ofrecemos servicios para remodelar baño, cocinas, armarios empotrados y parqué. " />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Carpintería Barberes" />
                <meta property="og:description" content="Muebles y reformas de madera a medida con acabado artesanal." />
            </Head>
            
            <PublicLayout canResetPassword={canResetPassword}>
                <div className="md:hidden fixed l-0 h-screen">
                    <button 
                        onClick={() => setMenuOpen(true)}
                        className="h-screen flex items-center justify-between bg-neutral-50 p-2 rounded-lg shadow-sm"
                        aria-label="Abrir menú de Perfil de usuario"
                    >
                        <img src="/assets/images/right.svg" alt="flecha de abrir menu" className="size-4" />
                    </button>
                </div>

                <div
                className="flex gap-5"
                >
                    <aside
                    className="md:w-1/4 lg:w-1/5 hidden md:block"
                    >
                        <NavigationLinks />
                    </aside>
                    <div className="grow flex flex-col gap-3 mx-4 ml-8 p-2 rounded-lg md:pl-0 bg-neutral-500">
                        <UserProfileAccount mustVerifyEmail={mustVerifyEmail} status={status} confirmAction={executeAction} /> 
                        <UserProfileInfo />
                        <UserProfileShipment />
                        <UserProfileDelete confirmAction={executeAction} />
                    </div>
                </div>

                {confirmPasswordModal.isOpen && (
                    <Modal type="confirm" closeModal={() => setConfirmPasswordModal({ isOpen: false, onSuccess: null })}>
                        <ConfirmPasswordForm 
                            onSuccess={() => {
                                confirmPasswordModal.onSuccess();
                            }}
                        />
                    </Modal>
                )}

                {menuOpen && (
                    <Modal 
                        type="menu" 
                        closeModal={() => setMenuOpen(false)}
                        modalStyle="h-full w-3/4 bg-neutral-200 p-2 shadow-2xl"
                    >
                        <div className="mt-10">
                            <NavigationLinks />
                        </div>
                    </Modal>
                )}
                
            </PublicLayout>
        </>
    );
}