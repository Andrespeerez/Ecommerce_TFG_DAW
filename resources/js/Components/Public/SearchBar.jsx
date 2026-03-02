import { router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function SearchBar({ closeModals }) {
    const [ searchValue, setSearchValue ] = useState('');
    const [ mobileDropDown, setMobileDropDown ] = useState(false);
    const searchRef = useRef(null);

    // foco to element
    useEffect(() => {
        if (mobileDropDown) {
            searchRef.current?.focus();
        }
    }, [mobileDropDown]);

    /**
     * Submit search param to /tienda?search=...
     * @param {Event} e 
     */
    function handleSearch(e) {
        e.preventDefault();

        // If not empty, call ProductController::Index with search parameter
        if (searchValue.trim()) {
            router.get('/tienda', {search: searchValue});
        }
    }

    return (
        <>
            <form onSubmit={handleSearch} className="w-1/3 hidden md:flex relative">
                <label htmlFor="search-bar" className="sr-only">Buscador</label>
                <input id="search-bar" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} 
                className="w-full pl-5 pr-20 px-10 rounded-3xl texto-base py-3"
                placeholder="Buscar productos..."
                />
                <button type="submit" 
                className="absolute right-1"
                aria-label="Buscar producto"
                >
                    <img src="/assets/images/search.svg" alt="Buscar" />
                </button>
            </form>

            <button
                className="md:hidden"
                onClick={(e) => {
                    closeModals();
                    setMobileDropDown((previous) => !previous);
                }}
                aria-label="Abrir buscador"
            >
                <img src="/assets/images/search.svg" alt="Buscar" />
            </button>

            {mobileDropDown && 
                <form onSubmit={handleSearch} className="absolute top-20 w-full md:hidden left-0 flex">
                    <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} 
                    className="w-full pl-5 pr-20 px-10 texto-base"
                    ref={searchRef}
                    />
                    <button type="submit" 
                    className="-ml-12 inline"
                    aria-label="Buscar producto"
                    >
                        <img src="/assets/images/search.svg" alt="Buscar" />
                    </button>
                </form>
            }
            
        </>
    )
}