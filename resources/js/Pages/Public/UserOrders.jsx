import PublicLayout from "@/Layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
import OrderCard from "./OrderCard";

export default function UserOrders({ auth, cart, canResetPassword, categories, orders }) {
    return (
        <>
            <Head title="Pedidos" />
        
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