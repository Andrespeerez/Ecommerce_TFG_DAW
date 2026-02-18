export default function Textarea({ label, error, required = false, rows = 4, className = '', ...props }) {
    
    return (
        <div className={className}>
            {label && (
                <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span>*</span>}
                </label>
            )}
            <textarea
                id={props.id}
                rows={rows}
                className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
                {...props}
            />
            {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
        </div>
    );
}