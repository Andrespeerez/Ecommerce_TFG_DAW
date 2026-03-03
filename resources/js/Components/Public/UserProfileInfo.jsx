import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function UserProfileInfo() {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful, reset } = useForm({
        full_name: user.full_name || '',
        phone: user.phone || '',
    });

    const [ clientErrors, setClientErrors ] = useState({
        full_name: '',
        phone: '',
    });

    const validateFullName = (value) => {
        if (!value.trim()) {
            return 'El nombre es obligatorio';
        }

        return '';
    };

    const validatePhone = (value) => {
        if (value.length > 15) {
            return 'El teléfono no puede tener más de 15 caracteres';
        }

        return '';
    }

    const validateForm = () => {
        const newErrors = {
            full_name: validateFullName(data.full_name),
            phone: validatePhone(data.phone),
        };

        setClientErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== '');
    }

    /**
     * Send form to update user info
     * @param {Event} e 
     */
    function submit(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        patch(route('profile.update.info'), {
            preserveState: true,
            preserveScroll: true,
        });
    }

    return (
        <section className="bg-neutral-300 text-neutral-900 p-5 flex flex-col gap-2">
            <header>
                <h2 className="heading-5">
                    Datos Personales
                </h2>
                <p className='text-base'>
                    Actualiza los datos personales
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="full_name" value="Nombre completo" className='text-base font-semibold'/>

                    <TextInput
                        id="full_name"
                        type="text"
                        className="mt-1 block w-full px-4"
                        value={data.full_name}
                        onChange={(e) => {
                            const value = e.target.value;
                            setData('full_name', value);
                            setClientErrors(prev => ({
                                ...prev,
                                full_name: validateFullName(value),
                            }));                            
                        }}
                        required
                        autoComplete="full_name"
                    />

                    <InputError className="mt-2" message={clientErrors.full_name || errors.full_name} />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Teléfono" className='text-base font-semibold'/>

                    <TextInput
                        id="phone"
                        type="tel"
                        className="mt-1 block w-full px-4"
                        value={data.phone}
                        onChange={(e) => {
                            const value = e.target.value;
                            setData('phone', value);
                            setClientErrors(prev => ({
                                ...prev,
                                phone: validatePhone(value),
                            }));                            
                        }}
                        autoComplete="phone"
                    />

                    <InputError className="mt-2" message={clientErrors.phone || errors.phone} />
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