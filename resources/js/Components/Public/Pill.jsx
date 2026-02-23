export default function Pill ({ children, onRemove }) {
    return (
        <div
        className="bg-secondary-300 hover:bg-secondary-500 heading-6 text-neutral-800 flex gap-[10px] p-[10px] items-center rounded-[10px]"
        >
            <button
            onClick={onRemove}
            >
                <img src="/assets/images/close.svg" alt="Eliminar Icono" aria-label="Eliminar filtro" />
            </button>
            {children}
        </div>
    );
}