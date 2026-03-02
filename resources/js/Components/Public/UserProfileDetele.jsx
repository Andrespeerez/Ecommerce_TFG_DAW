import { ConfirmContext } from "@/Layouts/PublicLayout";
import { router } from "@inertiajs/react";
import { useContext } from "react";

export default function UserProfileDelete({ confirmAction }) {  
    const triggerConfirm = useContext(ConfirmContext);
    
    function submit() {
        triggerConfirm('¿Estás seguro de que quieres borrar tu cuenta?', () => {
            handleDelete();
        });        
    }

    const handleDelete = () => {
        const performDelete = (extraOptions = {}) => {
            router.delete(route('profile.destroy'), {
                preserveScroll: true,
                ...extraOptions
            });
        };

        confirmAction(performDelete);
    };
    
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
            onClick={(e) => submit()}
            >
                Borrar cuenta
            </button>
        </section>
    );
}