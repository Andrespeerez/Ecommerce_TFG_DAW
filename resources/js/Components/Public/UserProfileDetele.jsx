import { router } from "@inertiajs/react";

export default function UserProfileDelete() {  
    
    function submit(e) {
        e.preventDefault();

        router.delete(route('profile.destroy'));
    }
    
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

            <button 
            className="bg-danger p-2 rounded-lg text-primary-900 heading-6"
            aria-label="Borrar cuenta"
            onClick={(e) => {
                if (confirm('¿Estás seguro de borrar tu cuenta?')) {
                    submit(e);
                }
            }}
            >Borrar cuenta</button>
        </section>
    );
}