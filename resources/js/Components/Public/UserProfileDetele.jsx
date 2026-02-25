import { Link } from "@inertiajs/react";

export default function UserProfileDelete() {    
    return (
        <section className="bg-neutral-300 text-neutral-900 p-5 flex flex-col gap-2">
            <header>
                <h2 className="heading-5">
                    Borrar Cuenta
                </h2>
                <p className='text-base'>
                    Borra permanentemente tu cuenta.
                </p>
            </header>

            <Link method="DELETE" className="bg-danger p-2 rounded-lg text-primary-900 heading-6" 
            href={route('profile.destroy')}
            >Borrar cuenta</Link>
        </section>
    );
}