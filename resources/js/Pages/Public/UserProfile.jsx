import UserProfileAccount from "@/Components/Public/UserProfileAccount";
import UserProfileInfo from "@/Components/Public/UserProfileInfo";
import UserProfileShipment from "@/Components/Public/UserProfileShipment";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";

// TODO: This is a fake cart. Need a real one from server
const cartDefault = {
    total_items: 0
}

export default function UserProfile({ cart = cartDefault, auth, canResetPassword, categories, mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Área Cliente " />
            
            <PublicLayout cart={cart} auth={auth} canResetPassword={canResetPassword} categories={categories}>
                <div
                className="flex gap-5"
                >
                    <aside
                    className="md:w-1/4 lg:w-1/5 hidden md:block"
                    >
                        <ul className="flex flex-col gap-2 text-left pl-4 pt-4 heading-6">
                            <li><Link href="/area-cliente" className="text-neutral-600">Datos de Cliente</Link></li>
                            <li><Link href="/area-cliente/pedidos">Pedidos</Link></li>
                        </ul>
                    </aside>
                    <div className="grow flex flex-col gap-3 mx-4">
                        <UserProfileAccount mustVerifyEmail={mustVerifyEmail} status={status} /> 
                        <UserProfileInfo />
                        <UserProfileShipment />
                    </div>
                </div>
                
            </PublicLayout>
        </>
    );
}