import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function UserProfileShipment() {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful, reset } = useForm({
        address: user.address || '',
        city: user.city || '',
        province: user.province || '',
        postal_code: user.postal_code || '',
    });

    const [ clientErrors, setClientErrors ] = useState({
        postal_code: '',
    })

    const validatePostalCode = (value) => {
        if (value && value.length !== 5) {
            return 'El código postal debe de tener 5 dígitos.';
        }

        return '';
    };

    /**
     * Send form to change shipment address
     * @param {Event} e 
     */
    function submit (e) {
        e.preventDefault();

        if (validatePostalCode(data.postal_code)) {
            return;
        }

        patch(route('profile.update.shipment'), {
            preserveState: true,
            preserveScroll: true,
        });
    }

    return (
        <section className="bg-neutral-300 text-neutral-900 p-5 flex flex-col gap-2">
            <header>
                <h2 className="heading-5">
                    Información de Envío
                </h2>
                <p className='text-base'>
                    Dirección de envío para recibir pedidos.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <h3 className="heading-6 mb-4">Dirección de envío</h3>

                <div>
                    <InputLabel htmlFor="address" value="Dirección" className='text-base font-semibold'/>

                    <TextInput
                        id="address"
                        type="text"
                        className="mt-1 block w-full px-4"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        autoComplete="address"
                    />

                    <InputError className="mt-2" message={errors.address} />
                </div>

                <div>
                    <InputLabel htmlFor="city" value="Ciudad" className='text-base font-semibold'/>

                    <TextInput
                        id="city"
                        type="text"
                        className="mt-1 block w-full px-4"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        autoComplete="city"
                    />

                    <InputError className="mt-2" message={errors.city} />
                </div>

                <div>
                    <InputLabel htmlFor="province" value="Provincia" className='text-base font-semibold'/>

                    <TextInput
                        id="province"
                        type="text"
                        className="mt-1 block w-full px-4"
                        value={data.province}
                        onChange={(e) => setData('province', e.target.value)}
                        autoComplete="province"
                    />

                    <InputError className="mt-2" message={errors.province} />
                </div>

                <div>
                    <InputLabel htmlFor="postal_code" value="Codigo postal" className='text-base font-semibold'/>

                    <TextInput
                        id="postal_code"
                        type="number"
                        className="mt-1 block w-full px-4"
                        value={data.postal_code}
                        onChange={(e) => {
                            const value = e.target.value;
                            setData('postal_code', value)
                            setClientErrors(prev => ({
                                ...prev,
                                postal_code: validatePostalCode(value)
                            }))
                        }}
                        autoComplete="postal_code"
                        min="0"
                    />

                    <InputError className="mt-2" message={clientErrors.postal_code || errors.postal_code} />
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