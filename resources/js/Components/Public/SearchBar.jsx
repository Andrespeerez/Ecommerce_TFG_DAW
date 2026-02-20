import { router } from "@inertiajs/react";
import { useState } from "react";

export default function SearchBar() {
    const [ searchValue, setSearchValue ] = useState('');

    function handleSearch(e) {
        e.preventDefault();

        // If not empty, call ProductController::Index with search parameter
        if (searchValue.trim()) {
            router.get('/productos', {search: searchValue});
        }
    }

    return (
        <form onSubmit={handleSearch} className="w-1/3 flex -space-x-16">
            <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} 
            className="w-full py-5 px-10 rounded-3xl"
            />
            <button type="submit" 
            className="-top-[40%] right-0"
            >
                <img src="/assets/images/search.svg" alt="Buscar" />
            </button>
        </form>
    )
}