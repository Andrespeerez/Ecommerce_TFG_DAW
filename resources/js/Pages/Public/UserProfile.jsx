import UserProfileAccount from "@/Components/Public/UserProfileAccount";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head } from "@inertiajs/react";

// TODO: This is a fake cart. Need a real one from server
const cartDefault = {
    total_items: 0
}

export default function UserProfile({ cart = cartDefault, auth, canResetPassword, categories, mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Área Cliente " />
            
            <PublicLayout cart={cart} auth={auth} canResetPassword={canResetPassword} categories={categories}>
                <aside>

                </aside>
                <div>
                    <UserProfileAccount mustVerifyEmail={mustVerifyEmail} status={status} /> 
                </div>
            </PublicLayout>
        </>
    );
}