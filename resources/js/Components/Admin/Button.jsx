import { Link } from '@inertiajs/react';

const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
};

export function Button ({ children, onClick, disabled = false, variant = 'primary' }) {

    return (
        <button
        type='button'
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 rounded-md disabled:opacity-50 ${variants[variant]}`}
        >
            {children}
        </button>
    );
}

export function ButtonLink({ children, href, variant = 'primary' }) {

    return (
        <Link
            href={href}
            className={`inline-block px-4 py-2 rounded-md font-medium ${variants[variant]}`}
        >
            {children}
        </Link>
    );
}