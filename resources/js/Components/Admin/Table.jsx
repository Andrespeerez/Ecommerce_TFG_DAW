export function Table({ children }) {
    return (
        <div className="bg-white shadow overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                {children}
            </table>
        </div>
    );
}

export function TableHeader({ children }) {
    return (
        <thead className="bg-gray-50">
            <tr>{children}</tr>
        </thead>
    );
}

export function TableHead({ children }) {
    return (
        <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
            {children}
        </th>
    );
}

export function TableBody({ children }) {
    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {children}
        </tbody>
    );
}

export function TableRow({ children }) {
    return (
        <tr>{children}</tr>
    );
}

export function TableCell({ children, className = '' }) {
    return (
        <td className={`px-6 py-4 whitespace-nowrap ${className}`}>
            {children}
        </td>
    );
}