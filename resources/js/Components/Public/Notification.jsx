import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Notification () {
    const { flash } = usePage().props;
    const [ visible, setVisible ] = useState(false);

    useEffect(() => {
        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [flash])

    if (!visible) return null;

    return (
        <>
        {flash.error && (
            <div className="w-full bg-danger text-white px-6 py-3 rounded-lg heading-6 flex justify-between items-center z-50">
                {flash.error}
                <button 
                onClick={() => setVisible(false)}
                aria-label="Cerrar la notificación"
                >
                    <img src="/assets/images/close.svg" alt="Icono cerrar" className="size-8" />
                </button>
            </div>
        )}
        {flash.success && (
            <div className="w-full bg-success text-white px-6 py-3 rounded-lg heading-6 flex justify-between items-center z-50">
                {flash.success}
                <button 
                onClick={() => setVisible(false)}
                aria-label="Cerrar la notificación"
                >
                    <img src="/assets/images/close.svg" alt="Icono cerrar" className="size-8" />
                </button>
            </div>
        )}
        </>
    );
}