import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from "@inertiajs/react";
import Button from './Button';
import { useState } from 'react';

export default function Login({ canResetPassword, closeModal }) {   
    const { auth } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [ clientErrors, setClientErrors ] = useState({
        email: '',
        password: '',
    });

    const [ authErrors, setAuthErrors ] = useState({
        authError: '',
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
    };

    const validatePassword = (value) => {
        if (!value) {
            return 'La contraseña es obligatoria';
        }

        return '';
    };

    const validateForm = () => {
        const newErrors = {
            email: validateEmail(data.email),
            password: validatePassword(data.password),
        };

        setClientErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== '');
    };



    /**
     * Submit form for login
     * 
     * @param {Event} e 
     */
    function submitLogin(e) {
        e.preventDefault();

        setAuthErrors({
            authError: '',
        });

        if (!validateForm()) {
            return;
        }

        post(route('login'), {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => reset('password'),
            onSuccess: () => {
                console.log(errors);
                closeModal()
            },
            onError: () => {
                setAuthErrors({
                    authError: "Usuario o Contraseña Incorrectos",
                });
            },
        });
    }

    return (
        <form onSubmit={(e) => submitLogin(e)}>
            <div>
                <InputLabel htmlFor="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    autoComplete="username"
                    isFocused={true}
                    onChange={(e) => {
                        const value = e.target.value;
                        setData('email', value);
                        setClientErrors(prev => ({
                            ...prev,
                            email: validateEmail(value),
                        }));
                    }}
                />

                <InputError message={clientErrors.email} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="password" value="Password" />

                <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    autoComplete="current-password"
                    onChange={(e) => {
                        const value = e.target.value;
                        setData('password', value);
                        setClientErrors(prev => ({
                            ...prev,
                            password: validatePassword(value),
                        }));
                    }}
                />

                <InputError message={clientErrors.password} className="mt-2" />
            </div>

            <div className="mt-4 block">
                <label className="flex items-center">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) =>
                            setData('remember', e.target.checked)
                        }
                    />
                    <span className="ms-2 text-sm text-gray-600">
                        Recordarme
                    </span>
                </label>
            </div>

            <div className='mt-2 flex flex-col gap-1'>
                <InputError message={authErrors.authError} className="mt-2" />
                {canResetPassword && (
                    <Link
                        href={route('password.request')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                )}
            </div>

            <div className="mt-4 flex items-center justify-end">
                <Button type='submit' variant='primary' className="md:text-[16px] font-lora" disabled={processing}>
                    Entra
                </Button>
            </div>
        </form>
    );
}