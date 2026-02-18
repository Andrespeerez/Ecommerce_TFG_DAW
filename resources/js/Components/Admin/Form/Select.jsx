export default function Select({ label, options, error, required = false, placeholder = 'Seleccionar...', className = '', ...props }) {
    
    return (
        <div className={className}>
            {label && (
                <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span>*</span>}
                </label>
            )}
            <select
                id={props.id}
                className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
                {...props}
            >
                <option value="">{placeholder}</option>
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
        </div>
    );
}