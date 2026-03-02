import Modal from "@/Components/Public/Modal";
import OrderCard from "@/Components/Public/OrderCard";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";


export default function UserOrders({ auth, cart, canResetPassword, categories, orders }) {
    const [ menuOpen, setMenuOpen ] = useState(false);

    const NavigationLinks = () => (
        <ul className="flex flex-col gap-2 text-left pl-4 pt-4 heading-6">
            <li><Link href="/area-cliente">Mi Perfil</Link></li>
            <li><Link href="/area-cliente/pedidos" className="text-neutral-600">Mis Pedidos</Link></li>
        </ul>
    )


    return (
        <>
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
                    <div className="grow flex flex-col gap-3 mx-4 ml-8 p-2 rounded-lg md:pl-0 bg-neutral-500 min-h-screen">
                        {orders.data.map((order) => (
                            <OrderCard key={order.order_number} order={order} />
                        ))}

                        <div className="flex justify-center gap-1 mt-6">
                            {orders.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 border rounded ${
                                        link.active 
                                            ? 'bg-neutral-800 text-white border-neutral-800' 
                                            : 'bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-100'
                                    } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                    preserveScroll
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>

                </div>

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