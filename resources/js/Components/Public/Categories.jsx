import { Link } from "@inertiajs/react";

export default function Categories({ categories }) {

    return (
        <div 
        className="flex flex-col gap-4 mt-14"
        >
            {categories.map((cat) => (
                <Link key={cat.id} href={`/tienda?categories[]=${cat.id}`}
                className="w-full text-left heading-5 hover:text-neutral-600 text-neutral-900"
                >
                    {cat.name}
                </Link>
            ))}
        </div>
    );
}