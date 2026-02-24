import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UserProfileAccount({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful, reset } = useForm({
        email: user.email,
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitEmail = (e) => {
        e.preventDefault();

        patch(route('profile.update.email'), {
            onSuccess: () => reset('current_password', 'password', 'password_confirmation'),
        });
    }

    const submitPassword = (e) => {
        e.preventDefault();

        patch(route('profile.update.password'), {
            onSuccess: () => reset('current_password', 'password', 'password_confirmation'),
        });
    }

    return (
        <section className="bg-neutral-300 text-neutral-900 p-5 flex flex-col gap-2">
            <header>
                <h2 className="heading-5">
                    Información de Cuenta
                </h2>
                <p className='text-base'>
                    Actualiza la información de tu cuenta.
                </p>
            </header>

            <form onSubmit={submitEmail} className="mt-6 space-y-6">

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}
                    className='bg-primary-700 hover:bg-primary-500 active:bg-primary-900 text-primary-50 heading-6'
                    >Guardar</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Guardado.
                        </p>
                    </Transition>
                </div>
            </form>

            <form onSubmit={submitPassword}>
                
                <div className="border-t pt-4">
                    <h3 className="heading-6 mb-4">Cambiar Contraseña</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="current_password" value="Contraseña Actual" />
                            <TextInput
                                id="current_password"
                                type="password"
                                className="mt-1 block w-full"
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.current_password} />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Nueva Contraseña" />
                            <TextInput
                                id="password"
                                type="password"
                                className="mt-1 block w-full"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.password} />
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Confirmar Nueva Contraseña" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                className="mt-1 block w-full"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}
                    className='bg-primary-700 hover:bg-primary-500 active:bg-primary-900 text-primary-50 heading-6'
                    >Guardar</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Guardado.
                        </p>
                    </Transition>
                </div>

            </form>
        </section>
    );
}