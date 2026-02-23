/**
 * *PILLS*
 * 
 * Create pills from URL PARAMS and remove params FROM URL using pills
 * 
 * The idea is, each time We call /tienda, the server returns us an object with the filters applied
 * We need to create pills for each filter, and, If we remove some pill, we request again to the server
 * with the current filters applied
 * 
 */

import { router } from "@inertiajs/react";
import PillsContainer from "./PillsContainer";


export default function PillFilters({ filters, categories, materials, finishes }) {

    /**
     * This function calls /tienda without parameters
     */
    function removeAllFilters() {
        router.get(route('products.index'), {}, {preserveState: true, replace: true});
    }
    
    return (
        <div
        className="flex flex-wrap gap-5"
        >
            <PillsContainer filters={filters} categories={categories} materials={materials} finishes={finishes} />

            {Object.keys(filters).length > 0 &&
            <div
            className="bg-accent-300 hover:bg-accent-500 heading-6 text-neutral-800 flex gap-[10px] p-[10px] items-center rounded-[10px]"
            >
                <button
                onClick={removeAllFilters}
                >
                    <img src="/assets/images/close.svg" alt="Eliminar Icono" aria-label="Eliminar filtro" />
                </button>
                Quitar todos los filtros
            </div>
            }
        </div>
    );
}