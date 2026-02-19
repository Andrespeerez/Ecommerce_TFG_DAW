export default function NavLinks({ onClick, img, text }) {
    return (
        <button
        onClick={onClick}
        className="bg-neutral-50 hover:bg-neutral-300 active:bg-neutral-500 flex items-center px-[10px] py-[5px]"
        >       
            <img src={img} alt="Menu categorias" />

            <span className="sm:hidden text-primary-900 heading-6">{text}</span>
        </button>
    );
}