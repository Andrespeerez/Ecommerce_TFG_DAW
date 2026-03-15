import { Link } from "@inertiajs/react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function ServiceCard({ title, image, href}) {
    const [ isLoading, setIsLoading ] = useState(true);

    return (
        <Link href={href}
        className="max-w-[420px] overflow-hidden rounded-[10px] flex flex-col pt-[10px] gap-[10px] bg-accent-200"
        >
            <h3 className="heading-6 lg:heading-5 text-primary-900 text-center">{title}</h3>

            <figure className="max-w-[420px] w-full max-h-[315px]">
                {isLoading &&
                <Skeleton
                className="w-full aspect-auto"
                height="315"
                width="420"
                />
                }
                <img 
                src={image} 
                alt={`Foto servicio ${title}`} 
                className={`object-cover w-full ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                loading="lazy"
                onLoad={() => setIsLoading(false)}
                height="315"
                width="420"
                />   
            </figure>
            
        </Link>
    )
}