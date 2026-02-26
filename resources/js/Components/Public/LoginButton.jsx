export default function LoginButton({ onClick }) {
    return (
        <button
        onClick={onClick}
        className="bg-neutral-50 hover:bg-neutral-300 active:bg-neutral-500 flex gap-[10px] items-center px-[10px] py-[5px] rounded-[10px] transition duration-150"
        aria-label="Menu de Login"
        >       
            <img src="/assets/images/login.svg" alt="Menu Login" aria-label="Menu de Login"/>

            <span className="hidden md:inline text-primary-900 heading-6">Login</span>
        </button>
    );
}