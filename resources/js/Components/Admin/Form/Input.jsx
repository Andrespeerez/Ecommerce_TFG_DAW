export default function Input({ label, required = false, error, className = '', ...props }) {
    return (
        <div className={className}>
            {label && (
                <label htmlFor={props.id}>
                    {label} {required && <span>*</span>}
                </label>
            )}
            <input id={props.id} name={props.name} {...props}
            className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
            {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
        </div>
    )
}