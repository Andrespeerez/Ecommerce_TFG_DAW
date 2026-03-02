import { useForm } from "@inertiajs/react";
import { useEffect, useRef } from "react";

export default function ConfirmPasswordForm({ onSuccess }) {
    const passwordInput = useRef();

    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            preserveScroll: true,
            onSuccess: () => {

                reset('password');
                if (onSuccess) {
                    onSuccess(); 
                }
            },
            onError: () => {
                reset('password');
                passwordInput.current?.focus();
            },
        });
    };

    return (
        <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="heading-5 mb-4">Confirma tu contraseña</h2>
            <p className="text-base text-neutral-600 mb-6">
                Por favor, confirma tu contraseña para continuar.
            </p>

            <form onSubmit={submit}>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        ref={passwordInput}
                        value={data.password}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                            errors.password ? 'border-danger' : 'border-neutral-300'
                        }`}
                        onChange={(e) => setData('password', e.target.value)}
                        autoFocus
                    />
                    {errors.password && (
                        <p className="text-danger text-sm mt-1">{errors.password}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary-900 text-white py-2 px-4 rounded-lg hover:bg-primary-800 disabled:opacity-50 transition-colors"
                    disabled={processing}
                >
                    {processing ? 'Confirmando...' : 'Confirmar'}
                </button>
            </form>
        </div>
    );
}