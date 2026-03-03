import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { ConfirmContext } from '@/Layouts/PublicLayout';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useContext, useState } from 'react';

export default function UserProfileAccount({ confirmAction }) {
    const triggerConfirm = useContext(ConfirmContext);

    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful, reset } = useForm({
        email: user.email,
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [ clientEmailErrors, setClientEmailErrors ] = useState({
        email: '',
    });

    const [ clientPasswordErrors, setClientPasswordErrors ] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const validateEmail = (value) => {
        if (!value) {
            return 'El email es obligatorio';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'El formato del email no es válido';
        }

        return '';
    }

    const handleEditEmail = (e) => {
        e.preventDefault();

        const emailError = validateEmail(data.email);
        if (emailError !== '') {
            setClientEmailErrors({ 
                email: emailError,
            });
            return;
        }

        triggerConfirm('¿Estás seguro de que quieres cambiar tu email?', () => {
            
            const performPatch = (extraOptions = {}) => {
                patch(route('profile.update.email'), {
                    preserveScroll: true,
                    onSuccess: () => reset('current_password', 'password', 'password_confirmation'),
                    ...extraOptions,
                });
            };

            confirmAction(performPatch);
        });
    };

        const validatePassword = (value) => {
        if (!value) {
            return 'La constraseña es obligatoria';
        }

        if (value.length < 8) {
            return 'La contraseña debe tener al menos 8 caracteres';
        }

        return '';
    }

    const validatePasswordConfirmation = (value, password) => {
        if (!value) {
            return 'Debes confirmar la contraseña';
        }

        if (value !== password) {
            return 'Las contraseñas no coinciden';
        }

        return '';
    }

    const validatePasswordForm = () => {
        const newErrors = {
            current_password: validatePassword(data.current_password),
            password: validatePassword(data.password),
            password_confirmation: validatePasswordConfirmation(data.password_confirmation, data.password),
        };

        setClientPasswordErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== '');
    };

    const submitPassword = (e) => {
        e.preventDefault();

        if (!validatePasswordForm()) {
            return;
        }

        patch(route('profile.update.password'), {
            preserveState: true,
            preserveScroll: true,
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

            <form onSubmit={handleEditEmail} className="mt-6 space-y-6">
                <h3 className="heading-6 mb-4">Cambiar Email</h3>
                <div>
                    <InputLabel htmlFor="email" value="Email" className='text-base font-semibold'/>

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full px-4"
                        value={data.email}
                        onChange={(e) => {
                            const value = e.target.value;
                            setData('email', value);
                            setClientEmailErrors(prev => ({
                                ...prev,
                                email: validateEmail(value),
                            }))
                        }}
                        autoComplete="username"
                        required
                    />

                    <InputError className="mt-2" message={clientEmailErrors.email || errors.email} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}
                    className='bg-primary-700 hover:bg-primary-500 active:bg-primary-900 text-primary-50 heading-6'
                    aria-label="Guardar cambios de email"
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

            <form onSubmit={submitPassword} className="mt-6 space-y-6">
                
                <div className="border-t pt-4">
                    <h3 className="heading-6 mb-4">Cambiar Contraseña</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="current_password" value="Contraseña Actual" className='text-base font-semibold'/>
                            <TextInput
                                id="current_password"
                                type="password"
                                className="mt-1 block w-full px-4"
                                value={data.current_password}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setData('current_password', value);
                                    setClientPasswordErrors(prev => ({
                                        ...prev,
                                        current_password: validatePassword(value),
                                    }))
                                }}
                            />
                            <InputError className="mt-2" message={clientPasswordErrors.current_password || errors.current_password} />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Nueva Contraseña" />
                            <TextInput
                                id="password"
                                type="password"
                                className="mt-1 block w-full px-4"
                                value={data.password}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setData('password', value);
                                    setClientPasswordErrors(prev => ({
                                        ...prev,
                                        password: validatePassword(value),
                                    }))
                                }}
                            />
                            <InputError className="mt-2" message={clientPasswordErrors.password || errors.password} />
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Confirmar Nueva Contraseña" className='text-base font-semibold'/>
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                className="mt-1 block w-full px-4"
                                value={data.password_confirmation}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setData('password_confirmation', value);
                                    setClientPasswordErrors(prev => ({
                                        ...prev,
                                        password_confirmation: validatePasswordConfirmation(value, data.password),
                                    }))
                                }}
                            />
                        </div>

                        <InputError className="mt-2" message={clientPasswordErrors.password_confirmation} />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}
                    className='bg-primary-700 hover:bg-primary-500 active:bg-primary-900 text-primary-50 heading-6'
                    aria-label="Guardar nueva contraseña"
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