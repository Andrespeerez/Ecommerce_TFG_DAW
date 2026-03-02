import Button from "./Button";

export default function Confirm ({ closeModal, action, children }) {
    return (
        <div className='flex flex-col items-center gap-6'>
            <h2 className="text-base font-lora md:heading-5">{children}</h2>
            <div className="flex justify-center items-center gap-2">
                <button
                type="button"
                onClick={closeModal}
                className={`p-4 bg-danger text-white font-lora rounded-lg font-bold active:scale-95`}
                >
                    Cancelar
                </button>
                <button
                type="button"
                onClick={action}
                className={`p-4 bg-success text-white font-lora rounded-lg font-bold active:scale-95`}
                >
                    Confirmar
                </button>
            </div>
        </div>
    );
}