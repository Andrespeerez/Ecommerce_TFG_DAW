import { Link } from "@inertiajs/react";
import CategoriesButton from "./CategoriesButton";
import LoginButton from "./LoginButton";
import CartButton from "./CartButton";
import SearchBar from "./SearchBar";
import { useState } from "react";
import Dropdown from "../Dropdown";

export default function Header({ auth, cart, setMenuOpen, setLoginOpen, setCartOpen, handleCloseModal }) {
    const name = String(auth.user?.full_name).split(' ')[0];


    return (
        <header
        className="sticky top-0 z-50 bg-primary-50 stroke-primary-200 flex justify-between items-center px-5 py-[10px] border-b-2 h-20"
        >
            <Link href="/" className="flex items-center" aria-label="Volver a la vista Home">
                <img src="/assets/images/logo_small.svg" alt="Logo Carpintería Barberes" 
                className="md:hidden"
                aria-label="Logo Carpintería"
                />
                <img src="/assets/images/logo.svg" alt="Logo Carpintería Barberes" 
                className="hidden md:block"
                aria-label="Logo Carpintería"
                />
            </Link>

            <CategoriesButton onClick={() => setMenuOpen(true)} />

            <SearchBar />
            
            {auth.user ? 
            <Dropdown>
                <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                        <button
                            type="button"
                            className="bg-neutral-50 hover:bg-neutral-300 active:bg-neutral-500 flex items-center px-[10px] py-[5px] rounded-[10px]"
                            onClick={handleCloseModal}
                            role="menu"
                            aria-label="Abrir Menu de Usuario"
                        >
                            <span className="max-w-[130px] truncate heading-6 text-[16px] hidden md:inline text-right">{name}</span>
                            <img src="/assets/images/login.svg" alt="" className="md:hidden inline" aria-label={`${name}`}/>
                            <svg
                                className="-me-0.5 ms-2 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </span>
                </Dropdown.Trigger>

                <Dropdown.Content>
                    <Dropdown.Link
                        href={route('profile.edit')}
                    >
                        Mi Perfil
                    </Dropdown.Link>
                    <Dropdown.Link
                        href={route('profile.orders')}
                    >
                        Mis Pedidos
                    </Dropdown.Link>
                    <Dropdown.Link
                        href={route('logout')}
                        method="post"
                        as="button"
                    >
                        Cerrar Sesión
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
            : <LoginButton onClick={() => setLoginOpen(true)} />
            }

            <CartButton onClick={() => setCartOpen(true)} cart={cart} />

        </header>
    );
}