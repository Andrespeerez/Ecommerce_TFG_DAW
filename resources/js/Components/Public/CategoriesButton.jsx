export default function CategoriesButton({ onClick }) {
    return (
        <button
        onClick={onClick}
        className="bg-neutral-50 hover:bg-neutral-300 active:bg-neutral-500 flex gap-[10px] items-center px-[10px] py-[5px] rounded-[10px] transition duration-150"
        >       
            <img src="/assets/images/categories.svg" alt="Menu categorías" />

            <span className="hidden sm:inline text-primary-900 heading-6">Categorías</span>
        </button>
    );
}