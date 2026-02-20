import { Link } from "@inertiajs/react";
import CategoriesButton from "./CategoriesButton";
import LoginButton from "./LoginButton";
import CartButton from "./CartButton";
import SearchBar from "./SearchBar";

export default function Header({ auth, cart, setMenuOpen, setLoginOpen, setCartOpen }) {


    return (
        <header
        className="bg-primary-50 stroke-primary-200 flex justify-between items-center px-5 py-[10px] border-b-2"
        >
            <Link href="/" className="flex items-center">
                <img src="/assets/images/logo.svg" alt="Logo Carpintería Barberes" />
            </Link>

            <CategoriesButton onClick={() => setMenuOpen(true)} />

            <SearchBar />

            {auth.user ? 
            <Link href="/area-cliente" 
            className="bg-neutral-50 hover:bg-neutral-300 active:bg-neutral-500 flex items-center px-[10px] py-[5px]">
                {auth.user.full_name}
            </Link>
            : <LoginButton onClick={setLoginOpen} />
            }

            <CartButton onClick={setCartOpen} cart={cart} />
        </header>
    );
}