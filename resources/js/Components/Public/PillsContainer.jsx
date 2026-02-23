import { router } from "@inertiajs/react";
import Pill from "./Pill";

export default function PillsContainer ({ categories, materials, finishes, filters}) {

    /*
    filters is an object that contains key: value, where values can be an array, example:
    {
        search: "mesa redonda",
        categories: [1, 3],
        materials: [2, 4],
        price_min: 40,
    }

    We need to create a pill for each value (if is array, we need to get a pill for each value on the array)
    [
        {filterKey: search, filterValue: "mesa redonda"},
        {filterKey: categories, filterValue: 1},
        {filterKey: categories, filterValue: 3},
        {filterKey: materiales, filterValue: 2},
        ...........
    ]
    */
    const pills = [];

    Object.entries(filters).forEach(([filterKey, filterValue]) => {
        if (Array.isArray(filterValue)) {
            filterValue.forEach(value => {
                pills.push({filterKey, filterValue: value});
            });
        } else {
            pills.push({ filterKey, filterValue });
        }
    });


    /**
     * Get Pill display name
     * 
     * There are cases taht the filter is an ID. 
     * 
     * In that case:
     * 
     * If the function gets a filterKey that is Category, Material, or Finish:
     * Search for an Category.id that matches the filterValue, then return the Category.name (same for the rest of cases)
     * 
     * else: returns filterValue directly
     * 
     * @param {*} filterKey 
     * @param {*} filterValue 
     * @returns {String}
     */
    function getDisplayText(filterKey, filterValue) {
        if (filterKey === 'categories')
            return categories.find(category => String(category.id) === String(filterValue))?.name ?? filterValue;

        if (filterKey === 'materials')
            return materials.find(material => String(material.id) === String(filterValue))?.name ?? filterValue;

        if (filterKey === 'finishes')
            return finishes.find(finish => String(finish.id) === String(filterValue))?.name ?? filterValue;

        return filterValue;
    }

    /**
     * Calls server with /tienda?..... but removing a specific filter
     */
    function removeFilter(filterKey, filterValue) {
        const newFilters = {...filters};

        // If the filter is an array: categories, materials, finishes
        if (Array.isArray(newFilters[filterKey])) {
            newFilters[filterKey] = newFilters[filterKey].filter( value => String(value) !== String(filterValue));

            // In case that filter is empty after removing it. Remove it from filters
            if (newFilters[filterKey].length === 0)
                delete newFilters[filterKey];
        } else {
            // Is the filter is not an array: search, price_min, price_max
            delete newFilters[filterKey];
        }


        // request again all product with new filters applied :)
        router.get(route('products.index'), newFilters, {preserveState: true, replace: true});
    }
    
    return (
        <div
        className="flex gap-2"
        >
            {pills.map((pill, index) => (
                <Pill key={index} onRemove={() => removeFilter(pill.filterKey, pill.filterValue)} >
                    {getDisplayText(pill.filterKey, pill.filterValue)}
                </Pill>
            ))}
        </div>
    );

}