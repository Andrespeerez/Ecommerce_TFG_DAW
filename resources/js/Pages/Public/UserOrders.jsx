import OrderCard from "@/Components/Public/OrderCard";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";


export default function UserOrders({ auth, cart, canResetPassword, categories, orders }) {
    return (
        <>
    
            <Head>
                <title>Pedidos</title>
                <meta name="description" content="Carpintería Barberes es un negocio local de elaboración de muebles y objetos de madera de forma tradicional y artesanal. Nuestra tienda online muestra productos de madera de la más alta calidad fabricados a mano. Ofrecemos servicios para remodelar baño, cocinas, armarios empotrados y parqué. " />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Carpintería Barberes" />
                <meta property="og:description" content="Muebles y reformas de madera a medida con acabado artesanal." />
            </Head>
        
            <PublicLayout auth={auth} cart={cart} categories={categories} canResetPassword={canResetPassword}>
                <div
                className="flex gap-5"
                >
                    <aside
                    className="md:w-1/4 lg:w-1/5 hidden md:block"
                    >
                        <ul className="flex flex-col gap-2 text-left pl-4 pt-4 heading-6">
                            <li><Link href="/area-cliente">Datos de Cliente</Link></li>
                            <li><Link href="/area-cliente/pedidos" className="text-neutral-600">Pedidos</Link></li>
                        </ul>
                    </aside>
                    <div className="grow flex flex-col gap-3 mx-4 p-5">
                        {orders.data.map((order) => (
                            <OrderCard key={order.order_number} order={order} />
                        ))}
                    </div>
                </div>
            </PublicLayout>
        </>
    );
}