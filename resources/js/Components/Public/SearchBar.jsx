import { router } from "@inertiajs/react";
import { useState } from "react";

export default function SearchBar() {
    const [ searchValue, setSearchValue ] = useState('');
    const [ mobileDropDown, setMobileDropDown ] = useState(false);

    function handleSearch(e) {
        e.preventDefault();

        // If not empty, call ProductController::Index with search parameter
        if (searchValue.trim()) {
            router.get('/tienda', {search: searchValue});
        }
    }

    return (
        <>
            <form onSubmit={handleSearch} className="w-1/3 -space-x-16 hidden md:flex">
                <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} 
                className="w-full pl-5 pr-20 px-10 rounded-3xl texto-base"
                />
                <button type="submit" 
                className="-top-[40%] right-0"
                >
                    <img src="/assets/images/search.svg" alt="Buscar" />
                </button>
            </form>

            <button
                className="md:hidden"
                onClick={(e) => setMobileDropDown((previous) => !previous)}
            >
                <img src="/assets/images/search.svg" alt="Buscar" />
            </button>

            {mobileDropDown && 
                <form onSubmit={handleSearch} className="absolute top-20 w-full md:hidden left-0 flex">
                    <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} 
                    className="w-full pl-5 pr-20 px-10 texto-base"
                    />
                    <button type="submit" 
                    className="-ml-12 inline"
                    >
                        <img src="/assets/images/search.svg" alt="Buscar" />
                    </button>
                </form>
            }
            
        </>
    )
}