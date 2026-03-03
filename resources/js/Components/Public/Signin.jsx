import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from "@inertiajs/react";
import Button from './Button';
import { useState } from 'react';

export default function Signin({ closeModal }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [ clientErrors, setClientErrors ] = useState({
        full_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const validateFullName = (value) => {
        if (!value.trim()) {
            return 'El nombre es obligatorio';
        }

        return '';
    };

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

    const validatePassword = (value) => {
        if (!value) {
            return 'La contraseña es obligatoria';
        }

        if (value.length < 8) {
            return 'La contraseña debe tener al menos 8 caracteres';
        }

        return '';
    };

    const validatePasswordConfirmation = (value, password) => {
        if (!value) {
            return 'Debes confirmar la contraseña';
        }

        if (value !== password) {
            return 'Las contraseñas no coinciden';
        }

        return '';
    }

    const validateForm = () => {
        const newErrors = {
            full_name: validateFullName(data.full_name),
            email: validateEmail(data.email),
            password: validatePassword(data.password),
            password_confirmation: validatePasswordConfirmation(
                data.password_confirmation, 
                data.password
            ),
        };

        setClientErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== '');
    };

    const submit = (e) => {
        e.preventDefault();

        if (!validateForm) {
            return;
        }

        post(route('register'), {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => reset('password', 'password_confirmation'),
            onSuccess: () => closeModal(),
        });
    };

    return (
        <form onSubmit={submit} className='px-20'>
            <p className='text-neutral-600 mb-4'>Esta página no es un e-commerce real. <br />Se ruega que no se usen datos reales.</p>

            <div>
                <InputLabel htmlFor="name" value="Name" />

                <TextInput
                    id="name"
                    name="name"
                    value={data.full_name}
                    className="mt-1 block w-full"
                    autoComplete="name"
                    isFocused={true}
                    onChange={(e) => {
                        const value = e.target.value;
                        setData('full_name', value);
                        setClientErrors(prev => ({
                            ...prev,
                            full_name: validateFullName(value),
                        }));
                    }}
                    required
                />

                <InputError message={clientErrors.full_name || errors.full_name} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    autoComplete="username"
                    onChange={(e) => {
                        const value = e.target.value;
                        setData('email', value);
                        setClientErrors(prev => ({
                            ...prev,
                            email: validateEmail(value),
                        }));
                    }}
                    required
                />

                <InputError message={clientErrors.email || errors.email} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="password" value="Password" />

                <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) => {
                        const value = e.target.value;
                        setData('password', value);
                        setClientErrors(prev => ({
                            ...prev,
                            password: validatePassword(value),
                        }));
                    }}
                    required
                />

                <InputError message={clientErrors.password || errors.password} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel
                    htmlFor="password_confirmation"
                    value="Confirm Password"
                />

                <TextInput
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) => {
                        const value = e.target.value;
                        setData('password_confirmation', value);
                        setClientErrors(prev => ({
                            ...prev,
                            password_confirmation: validatePasswordConfirmation(value, data.password),
                        }));
                    }}
                    required
                />

                <InputError
                    message={clientErrors.password_confirmation ||  errors.password_confirmation}
                    className="mt-2"
                />
            </div>

            <div className="mt-4 flex items-center justify-end">
                <Button type="submit" variant='primary' className="md:text-[16px] font-lora" disabled={processing}>
                    Registrate
                </Button>
            </div>
        </form>
    );
}