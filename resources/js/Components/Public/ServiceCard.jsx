import { Link } from "@inertiajs/react";

export default function ServiceCard({ title, image, href}) {
    return (
        <Link href={href}
        className="max-w-[420px] overflow-hidden rounded-[10px] flex flex-col pt-[10px] gap-[10px] bg-accent-200"
        >
            <h3 className="heading-6 lg:heading-5 text-primary-900 text-center">{title}</h3>
            <img src={image} alt={`Foto servicio ${title}`} className="object-cover w-full"/>
        </Link>
    )
}