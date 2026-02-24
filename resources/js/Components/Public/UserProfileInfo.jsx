import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UserProfileInfo({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful, reset } = useForm({
        full_name: user.full_name || '',
        phone: user.phone || '',
    });

    /**
     * Send form to update user info
     * @param {Event} e 
     */
    function submit(e) {
        e.preventDefault();

        patch(route('profile.update.info'));
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
                        className="mt-1 block w-full"
                        value={data.full_name}
                        onChange={(e) => setData('full_name', e.target.value)}
                        required
                        autoComplete="full_name"
                    />

                    <InputError className="mt-2" message={errors.full_name} />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Teléfono" className='text-base font-semibold'/>

                    <TextInput
                        id="phone"
                        type="tel"
                        className="mt-1 block w-full"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        required
                        autoComplete="phone"
                    />

                    <InputError className="mt-2" message={errors.phone} />
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