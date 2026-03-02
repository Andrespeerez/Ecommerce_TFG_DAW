import { Link } from '@inertiajs/react';

export default function NotFound({cart, auth, canResetPassword }) {
    return (
        <div 
        className='h-screen w-full flex justify-center items-center bg-neutral-50'
        >
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-9xl font-bold text-warning">404</h1>
                    <h2 className="text-2xl font-semibold text-neutral-800 mt-4">
                        Página no encontrada
                    </h2>
                    <p className="text-neutral-600 mt-2">
                        La página que buscas no existe.
                    </p>
                    <div className="mt-8 space-x-4">
                        <Link href="/" className="btn-primary rounded-lg">
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}