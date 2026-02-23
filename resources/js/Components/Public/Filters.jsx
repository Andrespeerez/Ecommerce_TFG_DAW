import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Filters ({ filters, categories, materials, finishes}) {
    const { data, setData, get } = useForm({
        categories: filters.categories ?? [],
        materials: filters.materials ?? [],
        finishes: filters.finishes ?? [],
        price_min: filters.price_min ?? '',
        price_max: filters.price_max ?? '',
        search: filters.search ?? '',
    });

    // if filters change, updates the form too
    useEffect(() => {
        setData({
            categories: filters.categories ?? [],
            materials:  filters.materials  ?? [],
            finishes:   filters.finishes   ?? [],
            price_min:  filters.price_min  ?? '',
            price_max:  filters.price_max  ?? '',
            search:     filters.search     ?? '',
        });
    }, [filters]);


    /**
     * Submit the form
     * @param {Event} e 
     */
    function applyFilters(e) {
        e.preventDefault();

        get(route('products.index'), {preservaState: true, replace: true});
    }
    
    return(
        <form onSubmit={applyFilters}
        className="p-10 flex flex-col gap-4 text-base"
        >
            <section
            className="flex flex-col"
            >
                <h3 className="heading-5">Categorías:</h3>
                {categories.map(category => (
                    <label key={category.id}>
                        <input type="checkbox"
                        checked={data.categories.includes(String(category.id))}
                        onChange={() => {
                            let update
                            // search if is already included
                            if (data.categories.includes(String(category.id))) {
                                update = data.categories.filter(id => id !== String(category.id)) // remove it
                            } else {
                                update = [...data.categories, String(category.id)] // if not included, add it
                            }

                            setData('categories', update);
                        }}
                        />
                        {category.name}
                    </label>
                ))}
            </section>
            
            <section
            className="flex flex-col"
            >
                <h3 className="heading-5">Materiales:</h3>
                {materials.map(material => (
                    <label key={material.id}>
                        <input type="checkbox"
                        checked={data.materials.includes(String(material.id))}
                        onChange={() => {
                            let update
                            // search if is already included
                            if (data.materials.includes(String(material.id))) {
                                update = data.materials.filter(id => id !== String(material.id)) // remove it
                            } else {
                                update = [...data.materials, String(material.id)] // if not included, add it
                            }

                            setData('materials', update);
                        }}
                        />
                        {material.name}
                    </label>
                ))}
            </section>
            
            <section
            className="flex flex-col"
            >
                <h3 className="heading-5">Acabados:</h3>
                {finishes.map(finish => (
                    <label key={finish.id}>
                        <input type="checkbox"
                        checked={data.finishes.includes(String(finish.id))}
                        onChange={() => {
                            let update
                            // search if is already included
                            if (data.finishes.includes(String(finish.id))) {
                                update = data.finishes.filter(id => id !== String(finish.id)) // remove it
                            } else {
                                update = [...data.finishes, String(finish.id)] // if not included, add it
                            }

                            setData('finishes', update);
                        }}
                        />
                        {finish.name}
                    </label>
                ))}
            </section>

            

            <button type="submit"
            className="text-white bg-neutral-900 heading-6 w-full py-3 hover:bg-neutral-700 rounded-[20px]"
            >Aplicar Filtros</button>
        </form>
    );
}