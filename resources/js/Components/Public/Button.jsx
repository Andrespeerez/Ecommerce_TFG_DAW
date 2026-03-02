import { Link } from '@inertiajs/react';

const variants = {
    'primary': "bg-primary-700 hover:bg-primary-500 active:bg-primary-900 text-primary-50 transition duration-150 md:heading-5 text-base rounded-lg px-5 py-3 flex justify-center items-center",
    'secondary': "bg-secondary-700 hover:bg-secondary-500 active:bg-secondary-900 text-primary-50 transition duration-150 md:heading-6 text-base rounded-lg px-5 py-3 flex justify-center items-center",
    'accent': "bg-accent-700 hover:bg-accent-500 active:bg-accent-900 text-primary-50 transition duration-150 md:heading-6 text-base rounded-lg px-5 py-3 flex justify-center items-center",
    'neutral': 'md:heading-6 text-base rounded-lg px-5 py-3 flex justify-center items-center'
};

export default function Button ({ type = 'button', children, onClick, disabled = false, variant = 'primary', className = '' }) {
    return (
        <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`disabled:opacity-50 drop-shadow-[0_4px_1px_rgba(0,0,0,0.25)] active:drop-shadow-[0_1px_1px_rgba(0,0,0,0.75)] ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
}

export function ButtonLink ({ children, href, variant = 'primary', className = '' }) {

    return (
        <Link
            href={href}
            className={`drop-shadow-[0_4px_1px_rgba(0,0,0,0.25)] active:drop-shadow-[0_1px_1px_rgba(0,0,0,0.75)] ${variants[variant]} ${className}`}
        >
            {children}
        </Link>
    );
}