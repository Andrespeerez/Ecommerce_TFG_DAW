import PublicLayout from "@/Layouts/PublicLayout";

export default function Test({ auth, cart }) {
    return (
        <PublicLayout auth={auth} cart={cart}>
            Mi Página web de prueba
        </PublicLayout>
    );
}