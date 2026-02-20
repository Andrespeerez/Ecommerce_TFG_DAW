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
        <form onSubmit={handleSearch}>
            <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <button type="submit">
                Buscar
            </button>
        </form>
    )
}